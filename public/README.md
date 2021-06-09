# phaserjs-client-boilerplate

This repository contains a basic structure and files for a client based phaser.js game.

## Structure

```bash 
# /
Favicon => Game Logo.
package.json
index.html => Game Client Door.
webpack.config.js => Webpack Config File.

# assets/
Game Unique Resources.
    # audio/
    Home for any audio files.
        # music/
        Music files for the game.
        # sfx/
        Sound effects for the game.
    # images/
    For images and spritesheets.
    # maps/
    Game information about tile-maps
    # misc/
    Additional files such as dialogs, json etc.

# data/
Configurations, static data templates, tile maps, game board dimensions etc.

# css/
Game Content Styling.
    # fonts/
    Game Font Styling.

# js/
Javascript source files for the game.
    # lib/
    External libraries or dependencies. Includes JS Framework and Add-ons.
    # plugins/
    Game Enhancements / Plugins used for the game.
    # gameObjects/
    Core game objects (Player, Treasure etc)
    # states/
    All game phases/states/scenes/menus and hub used by the game.
    # utilities/
    Utility methods for the game.
    # game.js
    The main game mechanics file.

# templates/
Will contain skeleton classes and files to reuse within our game.
```bash

## Installation

```bash
npm install
```

## .env

Copy the .env.example and populate as needed.

```bash
cp .env.example .env
```

## Build Client

```bash
npx webpack --mode production
```
