/*
 * File Name: password.js
 * Description: Password related routing
 * Author: mathewjames.dev
 * Author URL: https://mathewjames.dev
 */
import express from 'express';
import hbs from 'nodemailer-express-handlebars';
import nodemailer from 'nodemailer';
import path from 'path';
import crypto from 'crypto';

import UserModel from '../models/UserModel';

const email = process.env.EMAIL;
const pass = process.env.PASSWORD;

// Setup SMPT Transport using .env variables. In my case I'll be using GMAIL.
const smtpTransport = nodemailer.createTransport({
    service: process.env.EMAIL_PROVIDER,
    auth: {
        user: email,
        pass: pass
    }
});

// Setup handlebars options.
const handlebarsOptions = {
    viewEngine: 'handlebars',
    viewPath: path.resolve('./templates/'),
    extName: '.html'
};

// Set SMPT Transport to compile the templates using the options.
smtpTransport.use('compile', hbs(handlebarsOptions));

const router = express.Router();

router.post('/forgot-password', async (req, res, next) => {
    const userEmail = req.body.email;
    const user = await UserModel.findOne({ userEmail });
    if (!user) {
        res.status(400).json({ 'message': 'Invalid Email Address' });
        return;
    }

    // Create random user token.
    const buffer = crypto.randomBytes(20);
    const token = buffer.toString('hex');

    // Update users reset token and expiry date.
    await UserModel.findByIdAndUpdate({ _id: user._id }, { resetToken: token, resetTokenExp: Date.now() + 600000 });

    // Send user the relevant email.
    const data = {
        to: user.email,
        from: email,
        template: 'forgot-password',
        subject: 'mathewjames.dev MMORPG Password Reset',
        context: {
            url: `http://localhost:${process.env.PORT || 3000}/reset-password.html?token=${token}&scene=resetPassword`,
            name: user.name
        }
    };
    await smtpTransport.sendMail(data);

    res.status(200).json({ message: 'An email has been sent to your email. Password reset link is only valid for 10 minutes.' });
});

router.post('/reset-password', async (req, res, next) => {
    // Try to retrieve the relevant user record.
    const user = await UserModel.findOne({
        resetToken: req.body.token,
        resetTokenExp: { $gt: Date.now() },
        email: req.body.email
    });

    // If no user was found, send error message.
    if (!user) {
        res.status(400).json({ 'message': 'Invalid token.' });
        return;
    }

    // Ensure provided password matches verified password. And also ensure password, and verified password are passed.
    if (!request.body.password || !request.body.verifiedPassword || req.body.password !== req.body.verifiedPassword) {
        res.status(400).json({ 'message': 'Passwords do not match.' });
        return;
    }

    // Update the user model.
    user.password = req.body.password;
    user.resetToken = undefined;
    user.resetTokenExp = undefined;
    await user.save();

    // Send user the relevant password confirmation email.
    const data = {
        to: user.email,
        from: email,
        template: 'reset-password',
        subject: 'mathewjames.dev MMORPG Password Reset Confirmation',
        context: {
            name: user.name
        }
    };
    await smtpTransport.sendMail(data);

    res.status(200).json({ message: 'Password Updated' });
});

export default router;
