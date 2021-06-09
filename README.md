# phaserjs-boilerplate

This repository contains a basic structure and files for a server based phaser.js game.

## Structure

```bash 
# app/
This is going to be where all the server application code lies.

    # gameObjects/
    Game objects for the game from a server perspective.

    # utils/
    Any additional utility functions we need for our application.

    # gameManager.js
    Main game class file. 

# auth/
All the authentication is handled within here.

# models/
MongoDB Related database models.

# public/
This is the client folder / public server folder
You could potentially move this into its own project and point to the server for multiplayer games.

# routes/
All the routes will be handled within this folder.
```

## Installation

On both root and /public folder.

```bash
npm install
```

## .env

Copy the .env.example in both the root and /public and populate as needed.

```bash
cp .env.example .env
```

## Run Server

In the root directory.

```bash
npx nodemon app.js --exec babel-node
```

## Build Client

```bash
cd /public && npx webpack --mode production
```

## Extras

The /public folder can also be segmented away as a standalone client, if needed.