/*
 * File Name: routes/main.js
 * Description: Main Route File
 * Author: mathewjames.dev
 * Author URL: https://mathewjames.dev
 */
import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';

const router = express.Router();
const tokenList = {};

router.get('/status', (req, res, next) => {
    res.status(200);
    res.json({ 'status': 'ok' });
});

router.post('/signup', passport.authenticate('signup', { session: false }), async (req, res, next) => {
    res.status(200).json({ message: 'Successfully signed up!' });
});

router.post('/login', async (req, res, next) => {
    passport.authenticate('login', async (err, user) => {
        try {
            // If error return or if no user details.
            if (err || !user) {
                const error = new Error('An Error occured');
                return next(error);
            }

            req.login(user, { session: false }, async (error) => {
                if (error) return next(error);

                // Creating the JWT
                const body = {
                    _id: user._id,
                    email: user.email,
                    name: user.name
                };

                const token = jwt.sign({ user: body }, process.env.JWT_SECRET, { expiresIn: 300 });
                const refreshToken = jwt.sign({ user: body }, process.env.JWT_REFRESH_SECRET, { expiresIn: 86400 });

                // Store tokens within the cookie.
                res.cookie('jwt', token);
                res.cookie('refreshJwt', refreshToken);

                // Store tokens in the memory.
                tokenList[refreshToken] = {
                    token,
                    refreshToken,
                    email: user.email,
                    _id: user._id,
                    name: user.name
                };

                res.status(200).json({
                    token: refreshToken,
                    message: "User successfully authenticated",
                });
            });
        } catch (error) {
            return next(error);
        }
    })(req, res, next);
});

router.post('/token', (req, res) => {
    const { refreshToken } = req.body;
    if ((refreshToken in tokenList)) {
        const body = {
            email: tokenList[refreshToken].email,
            _id: tokenList[refreshToken]._id,
            name: tokenList[refreshToken].name,
        };
        const token = jwt.sign({ user: body }, process.env.JWT_SECRET, { expiresIn: 300 });

        // Update JWT
        res.cookie('jwt', token);
        tokenList[refreshToken].token = token;

        res.status(200).json({ token });
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
});

router.post('/logout', (req, res) => {
    if (req.cookies) {
        const refreshToken = req.cookies['refreshJwt'];
        if (refreshToken in tokenList) delete tokenList[refreshToken]
        res.clearCookie('refreshJwt');
        res.clearCookie('jwt');
    }

    res.status(200).json({ message: 'logged out' });
});

export default router;
