/**
 * QBLET STANDARD - GOLD MASTER SERVER
 * Features: Graceful Shutdown, Raw Body HMAC, 10MB Limit, Registry Auto-Discovery.
 */
const express = require('express');
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const axios = require('axios');
const crypto = require('crypto');
const http = require('http');
const verifyQbletToken = require('./middleware/security');
const webhookService = require('./services/webhookService');

const app = express();
const PORT = process.env.PORT || 8080;
const REGISTRY_URL = process.env.QBLET_REGISTRY_URL;
const MY_WEBHOOK_SECRET = process.env.WEBHOOK_SECRET || 'dev-secret';

// Cargar Identidad
const manifestPath = path.join(__dirname, 'qblet.yaml');
let manifest;
try {
    manifest = yaml.load(fs.readFileSync(manifestPath, 'utf8'));
} catch (e) {
    console.error("❌ FATAL: qblet.yaml missing");
    process.exit(1);
}

const PUBLIC_URL = process.env.QBLET_BASE_URL || `http://localhost:${PORT}`;
const MY_ID = process.env.QBLET_ID || manifest.info.id;

// CONFIGURACIÓN CRÍTICA: Raw Body para firmas + Límite 10MB
app.use(express.json({
    limit: '10mb',
    verify: (req, res, buf) => { req.rawBody = buf; }
}));

// --- WEBHOOKS ---
app.post('/webhook-listener', (req, res) => {
    // Usar buffer crudo para verificar firma (evita errores de reordenamiento JSON)
    const content = req.rawBody || JSON.stringify(req.body);
    if (!webhookService.verifySignature(req.headers['x-qblet-signature'], content, MY_WEBHOOK_SECRET)) {
        return res.status(401).json({ error: "Invalid Signature" });
    }
    console.log(`📨 [Webhook] ${req.body.type} verified & received.`);
    res.status(200).send('Accepted');
});

app.post('/_qblet/hooks', verifyQbletToken('subscribe'), (req, res) => {
    const { subscriber_id, target_url, topics, secret } = req.body;
    if (!target_url || !topics || !secret) return res.status(400).json({ error: "Missing fields" });
    const hookId = webhookService.addSubscriber(subscriber_id, target_url, topics, secret);
    res.status(201).json({ hook_id: hookId, status: "active" });
});

// --- API ---
app.get(['/qblet.yaml', '/.well-known/qblet'], (req, res) => {
    res.set('Content-Type', 'text/yaml');
    res.send(fs.readFileSync(manifestPath, 'utf8'));
});

app.get('/healthz', (req, res) => res.json({ status: 'up', id: MY_ID }));

app.post('/api/v1/stock/update', verifyQbletToken('write_stock'), async (req, res) => {
    const { sku, qty } = req.body;
    if (qty === 0) {
        await webhookService.emitEvent('inventory.stock.depleted', { sku, qty: 0 }, MY_ID);
    }
    res.json({ success: true, sku, new_qty: qty });
});

// --- LIFECYCLE ---
app.use(express.static(path.join(__dirname, 'public')));

const notifyRegistry = async (status) => {
    if (!REGISTRY_URL) return;
    try {
        await axios.post(`${REGISTRY_URL}/v1/announce`, {
            qblet_id: MY_ID, base_url: PUBLIC_URL, status: status,
            capabilities: manifest.capabilities.data_exposed?.map(c => c.entity) || []
        }, { headers: { 'X-Qblet-Origin-ID': MY_ID }, timeout: 3000 });
    } catch (err) { console.warn(`⚠️ Registry warning: ${err.message}`); }
};

const server = app.listen(PORT, async () => {
    console.log(`🚀 ${MY_ID} ready on ${PORT}`);
    await notifyRegistry('up');
});

// Graceful Shutdown
const shutdown = async () => {
    console.log('\n🛑 Shutting down...');
    await notifyRegistry('down');
    server.close(() => process.exit(0));
    setTimeout(() => process.exit(1), 5000);
};
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
