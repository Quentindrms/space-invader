import { Player } from './player.js'
import { EnnemyContainer } from './ennemy.js';
import { Collision } from './collision.js';

import { GameLoop } from './gameloop.js';

/**
const body = document.querySelector('body');
const gameContainer = document.getElementById('gameTarget');
const plyrShip = document.createElement('div');
const ennemy = document.createElement('div')
plyrShip.id = "plyrShip";

let player = new Player('50', '50', 'yellow');

player.createPlayer(plyrShip, gameContainer);
player.createBaseLineHitBox(gameContainer, player.baselineHitBox);
console.log(player);
console.log(gameContainer?.children);

body?.addEventListener('keydown', (e) => { player.playerMove(e, plyrShip) });
body?.addEventListener('keyup', (e) => { player.playerShot(e, plyrShip) })

if (gameContainer != null) {
let ennemyContainer = new EnnemyContainer(gameContainer);
let collision = new Collision(ennemyContainer.getContainerInformation(), player.getBaseLineHitBox(), ennemyContainer, player);
console.log(ennemyContainer.ennemy.getArrayEnnemy());} 
**/

let gameloop = new GameLoop();









