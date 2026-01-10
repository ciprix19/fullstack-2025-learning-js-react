const express = require('express');
const app = express();
const config = require('./src/config.json')
const reviewsRouter = require('./src/routes/reviews');
const usersRouter = require('./src/routes/users');
const cookieParser = require('cookie-parser');

const port = config.port;

app.use(express.json());
app.use(cookieParser());
// everything is top to bottom
// always define middleware at the top if i want them to be used everywhere
// app.use(logger);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/health', (req, res) => {
    if (!req.cookies) return res.status(404).json({ error: 'No cookies found' });
    // console.log(req.cookies);
    for (const [key, value] of Object.entries(req.cookies)) {
        if (key === 'myCookie' && value === 'amCookie') res.status(200).json({ message: 'Cookie ok!' });
    }
    res.status(404).json({ message: 'Cookie not found!!!' });
});

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