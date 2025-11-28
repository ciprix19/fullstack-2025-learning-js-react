const express = require('express');
const router = express.Router();
const { readFileSync } = require('fs');

router.get('/', (req, res) => {
    const data = readFileSync('./src/database/reviews.json');
    res.json(JSON.parse(data));
})

module.exports = router;