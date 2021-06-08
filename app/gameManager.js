/*
 * Game Server File
 * This will be utilized to house the main server function/s.
 */

import Player from "./gameObjects/Player";

export default class GameManager {
    constructor(io) {
        this.io = io;
        this.players = {};
    }

    setup() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.io.on('connection', (socket) => {
            /*
             * GAME EVENT LISTENERS
             */
            // Upon disconnection from the socket server, remove the player from the game list and socket list.
            socket.on('disconnect', async () => {
                console.log('*** SERVER: DISCONNECTED USER! ***');
                delete this.players[socket.id];
            });


            // socket.on('newPlayer', (token) => {
            //     try {
            //         // Validate the clients token and if it doesn't validate return error.
            //         const decoded = jwt.verify(token, process.env.JWT_SECRET);

            //         // Get the decoded players name.
            //         const { name } = decoded.user;

            //         // Create a new player.
            //         this.spawnPlayer(socket.id, name);

            //         // Send our player object to the new player.
            //         socket.emit('currentPlayers', this.players);

            //         // inform the other players of the new player that joined
            //         socket.broadcast.emit('spawnPlayer', this.players[socket.id]);
            //     } catch (error) {
            //         console.log(error.message);
            //         socket.emit('invalidToken');
            //     }
            // });

            // // Update the player data when we know a player has moved.
            // socket.on('playerMovement', (data) => {
            //     if (this.players[socket.id]) {
            //         this.players[socket.id].x = data.x;
            //         this.players[socket.id].y = data.y;

            //         // Let all players know that a player has just moved.
            //         this.io.emit('playerMoved', this.players[socket.id]);
            //     }
            // });

            // New player connected to the game.
            console.log(`*** SERVER: NEW CONNECTION! ${socket.id}***`);
        });
    }
}