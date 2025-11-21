const axios = require('axios');
const rateLimit = require("express-rate-limit");
const NodeCache = require("node-cache");
require('dotenv').config();

const cache = new NodeCache({ stdTTL: 60 * 5 }); // cache 5 menit
const GMAPS_SERVER_KEY = process.env.GMAPS_SERVER_KEY;

// ---------------------- RATE LIMITER ----------------------
exports.limiter = rateLimit({
    windowMs: 60 * 1000, // 1 menit
    max: 30,             // max 30 requests / menit / IP
    message: { error: "Rate limit exceeded. Try again later." }
});

// ---------------------- PLACE SEARCH ----------------------
exports.searchPlaces = async (req, res) => {
    try {
        const { query, lat, lng, radius = 5000 } = req.body;

        const cacheKey = `search:${query}:${lat}:${lng}:${radius}`;
        const cached = cache.get(cacheKey);
        if (cached) return res.json({ cached: true, results: cached });

        const params = new URLSearchParams({
            key: GMAPS_SERVER_KEY,
            query
        });

        if (lat && lng) {
            params.append("location", `${lat},${lng}`);
            params.append("radius", radius);
        }

        const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?${params.toString()}`;
        const resp = await axios.get(url);

        if (resp.data.status === "OVER_QUERY_LIMIT") {
            return res.status(429).json({ error: "Google Maps quota exceeded" });
        }

        const results = resp.data.results || [];
        cache.set(cacheKey, results);

        res.json({ cached: false, count: results.length, results });
    } catch (err) {
        console.error(err.response?.data || err.message);
        res.status(500).json({ error: "Failed to fetch places" });
    }
};

// ---------------------- DIRECTIONS ----------------------
exports.directions = async (req, res) => {
    try {
        const { origin, destination, mode = "driving" } = req.body;

        const params = new URLSearchParams({
            key: GMAPS_SERVER_KEY,
            origin,
            destination,
            mode
        });

        const url = `https://maps.googleapis.com/maps/api/directions/json?${params.toString()}`;
        const resp = await axios.get(url);

        if (resp.data.status === "OVER_QUERY_LIMIT") {
            return res.status(429).json({  error: "Google Maps quota exceeded" });
        }

        res.json(resp.data);
    } catch (err) {
        console.error(err.response?.data || err.message);
        res.status(500).json({ error: "Failed to fetch directions" });
    }
};

// ---------------------- EMBED URL (safe) ----------------------
exports.embedUrl = (req, res) => {
    const { origin, destination } = req.query;

    // IMPORTANT: gunakan restricted key hanya untuk embed
    const EMBED_KEY = process.env.GMAPS_EMBED_KEY;

    const embed = `https://www.google.com/maps/embed/v1/directions?key=${EMBED_KEY}&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}`;

    res.json({ embedUrl: embed });
};
