/*
 * File Name: Player.js
 * Description: Player Entity file
 * Author: mathewjames.dev
 * Author URL: https://mathewjames.dev
 */
export default class Player {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.health = 100;
        this.maxHealth = 100;
        this.x = 320;
        this.y = 320;
    }
}