const express = require('express');
const userRouter = express.Router();
const config = require('../config.json');
const { readFileSync, writeFileSync, write, writeFile } = require('fs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = config.secretKey;

let usersData = JSON.parse(readFileSync(config.usersURL));
let tokensData = JSON.parse(readFileSync(config.refreshTokensURL));

let usersIdCount = 0;
if (usersData.users.length !== undefined) {
    usersIdCount = usersData.users.reduce((max, user) => Math.max(max, user.id), 0) + 1;
}

if (tokensData.refreshTokens.length === undefined) {
    tokensData.refreshTokens = [];
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    // if i have authHeader...
    const token = authHeader && authHeader.split(' ')[1]; //token looks like: Bearer[0] TOKEN[1]

    if (token == null) return res.status(401).json({ message: 'Missing access token' });

    jwt.verify(token, secretKey, (err, user) => {
        if (err) return res.status(403).json({ message: 'Token is not valid' })
        req.user = user;
        next();
    });
}

// works only if you are logged in
userRouter.get('/', authenticateToken, (req, res) => {
    // res.json(usersData.users.filter(u => u.id === req.user.id));
    res.json(usersData);
});

userRouter.post('/signup', async (req, res) => {
    const { email, password, confirmPassword } = req.body;

    if (!email || !password || !confirmPassword) {
        return res.status(400).json({ message: 'Missing fields' });
    }
    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }
    if (usersData.users.find(u => u.email === email)) {
        return res.status(400).json({ message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
        id: usersIdCount++,
        email,
        hashedPassword
    }
    usersData.users.push(newUser);
    writeFileSync(config.usersURL, JSON.stringify(usersData, null, 4));

    res.status(201).json({
        message: 'Sign up successful',
        user: newUser
    })
});


function generateAccessToken(user) {
    return jwt.sign(user, secretKey, { expiresIn: config.expiresIn });
}


// generate access token based on refresh token from json db
// userRouter.post('/token', (req, res) => {
//     console.log(tokensData.refreshTokens);
//     const refreshToken = req.body.token;
//     if (refreshToken == null) return res.status(401).json({ message: 'Missing refreshToken' });
//     if (!tokensData.refreshTokens.includes(refreshToken)) return res.status(403).json({ message: 'Wrong refresh token' });
//     jwt.verify(refreshToken, secretKey, (err, user) => {
//         if (err) return res.status(403).json({ message: err });
//         const accessToken = generateAccessToken({ id: user.id, email: user.email });
//         res.json({ accessToken: accessToken });
//     });
// })

userRouter.get('/token', (req, res) => {
    if (req.cookies.token === undefined) return;
    const token = req.cookies.token.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Missing refreshToken' });
    if (!tokensData.refreshTokens.includes(token)) return res.status(403).json({ message: 'Invalid refresh token' });
    jwt.verify(token, secretKey, (err, user) => {
        if (err) return res.status(403).json({ messag: 'Refresh token expired' });
        const accessToken = generateAccessToken({ id: user.id, email: user.email });
        res.json({ user: user, accessToken: accessToken });
    })
})

// todo use jwt
userRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = usersData.users.find(u => u.email === email);
    if (user === undefined) {
        return res.status(400).json({ message: 'Email not found' });
    }

    const match = await bcrypt.compare(password, user.hashedPassword);
    if (!match) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }
    const accessToken = generateAccessToken({ id: user.id, email: user.email });
    const refreshToken = jwt.sign({ id: user.id, email: user.email }, secretKey);
    tokensData.refreshTokens.push(refreshToken);
    // console.log(tokensData);
    writeFileSync(config.refreshTokensURL, JSON.stringify(tokensData, null, 4));

    res
    .status(200)
    .cookie('token', `Bearer ${refreshToken}`, {
        expires: new Date(Date.now() + 1000 * 60),
        httpOnly: true,
    })
    .json({
        // message: 'User successfully logged in',
        user: { id: user.id, email: user.email },
        accessToken: accessToken
    });
});

userRouter.patch('/change-password', async (req, res) => {
    const { email, password, confirmPassword } = req.body;

    if (!email || !password || !confirmPassword) {
        return res.status(400).json({ message: 'Missing fields' });
    }
    if (!usersData.users.find(u => u.email === email)) {
        return res.status(400).json({ message: 'Email not found' });
    }
    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    usersData.users.map(u => {
        if (u.email === email) {
            u.hashedPassword = hashedPassword;
        }
    });

    writeFileSync(config.usersURL, JSON.stringify(usersData, null, 4));

    res.status(200).json({
        message: 'User updated successfully',
    })
});

userRouter.delete('/logout', (req, res) => {
    tokensData.refreshTokens = tokensData.refreshTokens.filter(token => token !== req.body.token);
    writeFileSync(config.refreshTokensURL, JSON.stringify(tokensData, null, 4));
    res.status(204).json({ message: 'Logout successful' });
});

userRouter.delete('/delete', authenticateToken, (req, res) => {
    usersData.users = usersData.users.filter(u => u.id !== req.user.id);
    writeFileSync(config.usersURL, JSON.stringify(usersData, null, 4));
    res.status(204).json({ message: 'Delete successful' });
});

userRouter.get('/:userId', (req, res) => {
    const id = Number(req.params.userId);
    const user = usersData.users.find(u => u.id === id);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
});

module.exports = userRouter;

// const usersTest = [{ name: 'Kyle' }, { name: 'Sally' }];
// userRouter.param('userId', (req, res, next, userId) => {
//     req.user = usersTest[userId]; // user is chosen at random, can assign any name
//     next();
// })

// userRouter.route('/:userId')
//     .get((req, res) => {
//         console.log(req.user); // and i can use it here from userRouter.param
//         req.params.userId;
//         res.send(`Get User with ID: ${req.params.userId}`);
//     })
//     .put((req, res) => {
//         req.params.userId;
//         res.send(`Get User with ID: ${req.params.userId}`);
//     })
//     .delete((req, res) => {
//         req.params.userId;
//         res.send(`Get User with ID: ${req.params.userId}`);
//     })
//     .patch((req, res) => {
//         req.params.userId;
//         res.send(`Get User with ID: ${req.params.userId}`);
//     });

// similar
// userRouter.get('/:userId', (req, res) => {
//     req.params.userId;
//     res.send(`Get User with ID: ${req.params.userId}`);
// });

// userRouter.put('/:userId', (req, res) => {
//     req.params.userId;
//     res.send(`Put User with ID: ${req.params.userId}`);
// });

// userRouter.delete('/:userId', (req, res) => {
//     req.params.userId;
//     res.send(`Delete User with ID: ${req.params.userId}`);
// });

// userRouter.patch('/:userId', (req, res) => {
//     req.params.userId;
//     res.send(`Patch User with ID: ${req.params.userId}`);
// });

// this will not be called bcs of /:userId
// userRouter.get('/new', (req, res) => {
//     res.send('add new user...');
// });
