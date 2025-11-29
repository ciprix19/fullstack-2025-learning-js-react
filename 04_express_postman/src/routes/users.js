const express = require('express');
const userRouter = express.Router();
const config = require('../config.json');
const { readFileSync, writeFileSync, write, writeFile } = require('fs');

// {
//     "users": [
//         {
//             "id": "0",
//             "email": "a@email.com",
//             "password": "123"
//         }
//     ]
// }
let usersData = JSON.parse(readFileSync(config.usersURL));

userRouter.get('/', (req, res) => {
    res.json(JSON.parse(data));
});

userRouter.get('/:userId', (req, res) => {
    const id = Number(req.params.userId);
    const user = usersData.users.find(u => u.id === id);

    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
});

// todo: password hashing
userRouter.post('/signup', (req, res) => {
    const { email, password, confirmPassword } = req.body;

    if (!email || !password || !confirmPassword) {
        return res.status(400).json({ error: 'Missing fields' });
    }
    if (password !== confirmPassword) {
        return res.status(400).json({ error: 'Passwords do not match' });
    }
    if (usersData.users.find(u => u.email === email)) {
        return res.status(400).json({ error: 'Email already registered' });
    }

    const newUser = {
        id: usersData.users.length,
        email,
        password
    }
    usersData.users.push(newUser);
    writeFileSync(config.usersURL, JSON.stringify(usersData, null, 4));

    res.status(201).json({
        message: 'User created successfully',
        user: newUser
    })
});

userRouter.post('/login', (req, res) => {

});

userRouter.patch('/change-password', (req, res) => {
    const { email, newPassword, confirmNewPassword } = req.body;

    if (!email || !newPassword || !confirmNewPassword) {
        return res.status(400).json({ error: 'Missing fields' });
    }
    if (!usersData.users.find(u => u.email === email)) {
        return res.status(400).json({ error: 'Email not found' });
    }
    if (newPassword !== confirmNewPassword) {
        return res.status(400).json({ error: 'Passwords do not match' });
    }

    usersData.users.map(u => {
        if (u.email === email) {
            u.password = newPassword;
        }
    });

    writeFileSync(config.usersURL, JSON.stringify(usersData, null, 4));

    res.status(200).json({
        message: 'User updated successfully',
    })
});

userRouter.delete('/delete', (req, res) => {

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
