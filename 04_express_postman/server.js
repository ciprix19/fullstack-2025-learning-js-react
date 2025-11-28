const express = require('express');
const app = express();
const config = require('./src/config.json')
const { readFileSync } = require('fs');
const reviewsRouter = require('./src/routes/reviews');
const usersRouter = require('./src/routes/users');

const port = config.port;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.use('/testimonials', reviewsRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})