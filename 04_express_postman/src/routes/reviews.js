const express = require('express');
const router = express.Router();
const { readFileSync } = require('fs');
const config = require('../config.json');

router.get('/', (req, res) => {
    const data = readFileSync(config.reviewsURL);
    res.json(JSON.parse(data));
})

module.exports = router;