/*
 * File Name: SceneTemplate.js
 * Description: Template file for game scenes;
 * Author: mathewjames.dev
 * Author URL: https://mathewjames.dev
 * 
 * -------------------------------------------
 * Anti-Pattern: global name-space pollution by
 *   Standard Phaser v3.x.x Scene preparations
 * init:     function init() {},    //initial game phase data  
 * preload:  function preload() {}, //queue & download game assets 
 * create:   function create() {},  //make cached assets available 
 * update:   function update() {},  //begin the game loop  
 * render:   function render() {},  //render current display 
 * shutdown: function shutdown() {} //close and garbage collection? 
 * -------------------------------------------
 */

var TitleScene = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize(config)
    {
        Phaser.Scene.call(this, { key: 'Title',config });
    },

	init(data) {},
	
    preload ()
    {
        this.load.image('key', 'assets/images/.png');
    },

    create: function create (data)
    {
        this.add.image(0, 0, 'key').setOrigin(0);

        this.input.once('pointerdown', function () {

            console.log('From Title to Game');

            this.scene.start('Game');

        }, this);
    },
	
	update: function (time, delta) {}
});
