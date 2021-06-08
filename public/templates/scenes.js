/*
 * File Name: scenes.js
 * Description: File for exporting all the scenes into 1 array;
 * Author: mathewjames.dev
 * Author URL: https://mathewjames.dev
 */
import BootScene from './boot/BootScene';
import TitleScene from './boot/TitleScene';
import UiScene from './game/UiScene';
import WorldScene from './game/WorldScene';

export default [
    BootScene,
    TitleScene,
    UiScene,
    WorldScene,
];
