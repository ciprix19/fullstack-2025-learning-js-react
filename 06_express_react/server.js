const express = require('express');
const app = express();
var cors = require('cors');
const path = require('path');
const config = require('./src/config.json')
const reviewsRouter = require('./src/routes/reviews');
const usersRouter = require('./src/routes/users');
const cookieParser = require('cookie-parser');

const port = config.port;

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// i dont think i want this? for now
// app.use(express.static(path.join(__dirname, '../05_react/dist')));

// // express 5 uses *splat instead of only *
// app.get('/*splat', (req, res) => {
//   res.sendFile(path.join(__dirname, '../05_react/dist/index.html'));
// })

app.get('/health', (req, res) => {
    if (!req.cookies) return res.status(404).json({ error: 'No cookies found' });
    for (const [key, value] of Object.entries(req.cookies)) {
        if (key === 'myCookie' && value === 'amCookie') res.status(200).json({ message: 'Cookie ok!' });
    }
    res.status(404).json({ message: 'Cookie not found!!!' });
});

app.use('/testimonials', logger, reviewsRouter);
app.use('/users', logger, usersRouter);

function logger(req, res, next) {
    console.log(req.originalUrl);
    next();
}

// app.set('trust-proxy', 1);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})