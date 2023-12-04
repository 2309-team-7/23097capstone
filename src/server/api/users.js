const express = require('express');
const usersRouter = express.Router();
const { JWT_SECRET } = process.env;

const {
    createUser,
    getUser,
    getUserByEmail,
    getAllUsers,
    getAllCommentsByUser,
    getAllReviewsByUser,
} = require('../db');

const jwt = require('jsonwebtoken')

usersRouter.get('/', async( req, res, next) => {
    try {
        const users = await getAllUsers();

        res.send({
            users
        });
    } catch ({name, message}) {
        next({name, message})
    }
});

// GET - api/users/:id - get all comments by a user
usersRouter.get('/comments/:id', async(req, res, next) => {
    try {
        const data = await getAllCommentsByUser(req.params.id)
        res.send(data)
    } catch(err) {
        next(err)
    }
})

//GET - api/users/reviews/:id - get all reviews by user
usersRouter.get('/reviews/:id', async(req, res, next) => {
    try {
        const reviews = await getAllReviewsByUser(req.params.id)
        res.send(reviews)
    } catch(err) {
        next(err)
    }
})

usersRouter.post('/login', async(req, res, next) => {
    const { email, password } = req.body;
    if(!email || !password) {
        next({
            name: 'MissingCredentialsError',
            message: 'Please supply both an email and password'
        });
    }
    try {
        const user = await getUser({email, password});
        if(user) {
            const token = jwt.sign({
                id: user.id,
                email
            }, process.env.JWT_SECRET, {
                expiresIn: '1w'
            });

            res.send({
                message: 'Login successful!',
                token
            });
        }
        else {
            next({
                name: 'IncorrectCredentialsError',
                message: 'Username or password is incorrect'
            });
        }
    } catch(err) {
        next(err);
    }
});

usersRouter.post('/register', async(req, res, next) => {
    const { name, email, password } = req.body;

    try {
        const _user = await getUserByEmail(email);

        if(_user) {
            next({
                name: 'UserExistsError',
                message: 'A user with that email already exists'
            });
        }

        const user = await createUser({
            name,
            email,
            password
        });

        const token = jwt.sign({
            id: user.id,
            email
        }, process.env.JWT_SECRET, {
            expiresIn: '1w'
        });

        res.send({
            message: 'Sign up successful!',
            token
        });
    } catch({name, message}) {
        next({name, message})
    }
})

module.exports = usersRouter;