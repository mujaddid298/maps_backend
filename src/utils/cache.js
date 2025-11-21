    const NodeCache = require('node-cache');
    const cache = new NodeCache({ stdTTL: parseInt(process.env.CACHE_TTL_SECONDS || '300') });
    module.exports = cache;