import { Player } from './player.js'
import { EnnemyContainer } from './ennemy.js';
import { Collision } from './collision.js';

const body = document.querySelector('body');
const gameContainer = document.getElementById('gameTarget');
const plyrShip = document.createElement('div');
const ennemy = document.createElement('div')
plyrShip.id = "plyrShip";

let player = new Player('50', '50', 'yellow');

if (gameContainer != null) {
let ennemyContainer = new EnnemyContainer(gameContainer);
console.log(`Container information : ${ennemyContainer.getContainerInformation()}`)
let collision = new Collision();
collision.setElement(ennemyContainer.getContainerInformation(), player.getBaseLineHitBox())
collision.setPosition(ennemyContainer.getContainerInformation(), player.getBaseLineHitBox())
}

player.createPlayer(plyrShip, gameContainer);
player.createBaseLineHitBox(gameContainer, player.baselineHitBox);
console.log(player);
console.log(gameContainer?.children);

body?.addEventListener('keydown', (e) => { player.playerMove(e, plyrShip) });
body?.addEventListener('keyup', (e) => { player.playerShot(e, plyrShip) })





