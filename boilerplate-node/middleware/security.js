const jwt = require('jsonwebtoken');
const PUBLIC_KEY = process.env.QBLET_PUBLIC_KEY || 'dev-key';

module.exports = (requiredScope) => {
    return (req, res, next) => {
        const auth = req.headers['authorization'];
        if (!auth) return res.status(401).json({ error: "Missing Q-Token" });

        try {
            // Algoritmo RS256 Estricto
            const decoded = jwt.verify(auth.split(' ')[1], PUBLIC_KEY, { algorithms: ['RS256'] });
            
            const myId = process.env.QBLET_ID || 'com.example.starter';
            if (decoded.aud !== myId) throw new Error("Audience mismatch");
            
            if (requiredScope && !(decoded.scope || "").includes(requiredScope)) {
                return res.status(403).json({ error: "Insufficient Scope" });
            }
            req.caller = decoded.sub;
            next();
        } catch (e) {
            return res.status(401).json({ error: "Invalid Token", detail: e.message });
        }
    };
};
