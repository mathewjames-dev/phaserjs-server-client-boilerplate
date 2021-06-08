/*
 * File Name: app.js
 * Description: Main server entry file.
 * Author: mathewjames.dev
 * Author URL: https://mathewjames.dev
 */

// This will read the environment variables from the .env file.
import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';

import routes from './routes/main';
import passwordRoutes from './routes/password';
import GameManager from './app/gameManager';

// Create an instance of the app, server and socketio.
const app = express(),
  server = require('http').createServer(app),
  io = require('socket.io')(server),
  port = process.env.PORT || 8000;

// Setup our MongoDB database connection.
const uri = process.env.MONGO_CONNECTION_URL;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
mongoose.connection.on('error', (error) => {
  console.log(error);
  process.exit(1);
});
mongoose.set('useFindAndModify', false);
mongoose.connection.on('connected', () => {
  console.log('Connected to the database.');
  server.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  });
});

// Setup our main game manager.
const gameManager = new GameManager(io);
gameManager.setup();

// Update any express settings for the app.
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(cookieParser());
app.use(cors({ credentials: true, origin: process.env.CORS_ORIGIN }));
app.use(express.static(path.join(__dirname, '/public')));

// Require Passport Authentication.
require('./auth/auth');

// Routing.
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '/public/views/index.html'));
});

app.use('/', routes);
// app.use('/', passport.authenticate('jwt', { session: false }), apiRoutes);
app.use('/', passwordRoutes);

// Catch All Routing.
app.use((req, res, next) => {
  res.status(404);
  res.json({ message: '404 - Not Found' });
});

// Handle Erroring
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ error: err });
});