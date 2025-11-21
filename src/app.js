require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const mapsRoutes = require('./routes/maps');
const authRoutes = require('./routes/auth');


const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors(
//   {
//   origin: [
//     "http://localhost:3001",
//     "http://127.0.0.1:3001"
//   ],
//   credentials: false
// }
));

app.use(express.json());
app.use(morgan('combined'));

// Global rate limit (light)
const globalLimiter = rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000'),
    max: parseInt(process.env.RATE_LIMIT_MAX || '100'),
    standardHeaders: true,
    legacyHeaders: false
});
app.use(globalLimiter);

app.get('/api', (req, res) => {
  res.json({ message: "API OK" });
});

app.use('/auth', authRoutes);
app.use('/api', mapsRoutes);

// OpenAPI serve
app.get('/openapi.json', (req, res) => res.sendFile(require('path').join(__dirname, '..', 'openapi.json')));

app.listen(PORT, () => console.log(`Maps service listening on ${PORT}`));