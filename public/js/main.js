/*
 * File Name: main.js
 * Description: Entry client file.
 * Author: mathewjames.dev
 * Author URL: https://mathewjames.dev
 */
// import scenes from './states/scenes';
import io from 'socket.io-client';

// Scaling to create appropriate game configurations for any gamer's device.
var isItMobile = navigator.userAgent.indexOf("Mobile");

if (isItMobile == -1) {
    // -1 means it is not a mobile device.
    isItMobile = navigator.userAgent.indexOf("Tablet");
}

// Now select appropriate game configurations.
if (isItMobile == -1) {
    // Unspecified Mobile Device.
    console.log("Gamer's device is mobile.");

    // Create our Phaser 3 game config.
    var config = {
        type: Phaser.AUTO, // .WEBGL or .Canvas
        width: window.innerWidth,
        height: window.innerHeight,
        autoResize: true,
        parent: 'gameCanvas', // Dom Element
        scene: [],
        backgroundColor: 0, // Custom RGB colour.
        physics: {
            default: 'arcade'
        },
        title: '',	//Game Title
        url: '',	//Game URL location
        version: '1.0',
        input: {
            gamepad: false,	// not interested in game pad input
            keyboard: true,
            mouse: true,
            touch: true,
        },
        pixelArt: false,
        antialias: true,
        callbacks: {
            postBoot(game) {
                // In phaser 3 you have to override phasers default styles.
                game.canvas.style.width = "100%";
                game.canvas.style.height = "100%";
            }
        }
    };
} else {
    // Desktop of tablet device.
    console.log("Gamers device is Desktop or Tablet");

    // Create our Phaser 3 game config.
    var config = {
        type: Phaser.AUTO, // .WEBGL or .Canvas
        width: 512, // x width - best results use the golden ratio
        height: 320, // y height - best results use the golden ratio
        autoResize: true,
        parent: 'gameCanvas', // Dom Element
        scene: [scenes],
        backgroundColor: 0, // Custom RGB colour.
        physics: {
            default: 'arcade'
        },
        title: '',	//Game Title
        url: '',	//Game URL location
        version: '1.0',
        input: {
            gamepad: false,	// not interested in game pad input
            keyboard: true,
            mouse: true,
            touch: true,
        },
        pixelArt: false,
        antialias: true,
        callbacks: {
            postBoot(game) {
                // In phaser 3 you have to override phasers default styles.
                game.canvas.style.width = "100%";
                game.canvas.style.height = "100%";
            }
        }
    };
}

// Game launch method.
document.addEventListener('DOMContentLoaded', function () {
    window.GAMENAME.main();
}, false);