/*
 * File Name: game.js
 * Description: File for housing the game.
 * Author: mathewjames.dev
 * Author URL: https://mathewjames.dev
 */

// Create a game namespace
window.GAMENAME = {
    socket: io(SERVER_URL), // If we want socket.io

    // If there's music in your game, and it needs to play through-out a few State swaps, then you could reference it below. 
    //music: null,

    // Toggle background music theme on or off; starts in "on/true" state 
    //musicToggle: true,

    // Your game can check GAMENAME.paused in the game loops to know if it should pause or not.
    //paused: false,

    
    // Here we have some global level vars that persist regardless of State. 
    // Button styling
    buttonStyle: { font: "26px Arial", fill: "#000000", align: "center" },


    // -------------------------------------------
    // Main game Handler methods
    // -------------------------------------------
    main: function (config) {
        //Phaser v3.15.x+
        game = new Phaser.Game(config);

        //move to next game phase
        console.log("Leaving GAMENAME.main -> boot");	//debug
        game.scene.start('Boot');
    },
}