const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Generate token untuk testing Postman / Thunder Client
router.get('/generate', (req, res) => {
    const payload = {
        id: 123,
        email: "adid@exemple.com"
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "2h" });

    res.json({
        message: "Generated test token",
        token
    });
});

module.exports = router;
