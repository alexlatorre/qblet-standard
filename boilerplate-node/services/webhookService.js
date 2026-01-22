const crypto = require('crypto');
const axios = require('axios');

const subscribers = []; 

const signContent = (content, secret) => {
    return crypto.createHmac('sha256', secret).update(content).digest('hex');
};

module.exports = {
    addSubscriber: (subscriberId, targetUrl, topics, secret) => {
        const id = 'hk_' + crypto.randomBytes(4).toString('hex');
        subscribers.push({ id, subscriberId, targetUrl, topics, secret });
        console.log(`🔌 Subscriber added: ${subscriberId}`);
        return id;
    },

    verifySignature: (signature, content, secret) => {
        if (!signature || !content) return false;
        const hash = signContent(content, secret);
        try {
            // Prevenir Timing Attacks
            return crypto.timingSafeEqual(Buffer.from(signature, 'hex'), Buffer.from(hash, 'hex'));
        } catch { return false; }
    },

    emitEvent: async (topic, data, source) => {
        const targets = subscribers.filter(s => s.topics.includes(topic));
        if (targets.length === 0) return;

        const eventId = 'evt_' + crypto.randomBytes(4).toString('hex');
        const payloadString = JSON.stringify({
            specversion: "1.0", type: topic, source: source, id: eventId,
            time: new Date().toISOString(), datacontenttype: "application/json", data: data
        });

        // Promise.all para concurrencia real
        await Promise.all(targets.map(async (sub) => {
            try {
                const signature = signContent(payloadString, sub.secret);
                await axios.post(sub.targetUrl, payloadString, {
                    headers: {
                        'Content-Type': 'application/cloudevents+json',
                        'User-Agent': 'Qblet/1.0',
                        'X-Qblet-Signature': signature,
                        'X-Qblet-Event-ID': eventId
                    }, timeout: 5000
                });
            } catch (err) { console.error(`❌ Hook fail: ${sub.subscriberId}`); }
        }));
    }
};
