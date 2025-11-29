const express = require('express');
const app = express();
const config = require('./src/config.json')
const reviewsRouter = require('./src/routes/reviews');
const usersRouter = require('./src/routes/users');

const port = config.port;

app.use(express.json());
// everything is top to bottom
// always define middleware at the top if i want them to be used everywhere
// app.use(logger);

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.use('/testimonials', reviewsRouter);
// here i have the logger only for the users route (i can have multiple middlewares after or before logger...)
// app.use('/users', logger, usersRouter);
app.use('/users', logger, usersRouter);

function logger(req, res, next) {
    console.log(req.originalUrl);
    next();
}

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})