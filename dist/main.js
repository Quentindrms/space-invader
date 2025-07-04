import { Player } from './player.js';
import { EnnemyContainer } from './ennemy.js';
const body = document.querySelector('body');
const gameContainer = document.getElementById('gameTarget');
const plyrShip = document.createElement('div');
const ennemy = document.createElement('div');
plyrShip.id = "plyrShip";
let player = new Player('50', '50', 'yellow');
if (gameContainer != null) {
    let ennemyContainer = new EnnemyContainer(gameContainer);
}
player.createPlayer(plyrShip, gameContainer);
console.log(player);
console.log(gameContainer === null || gameContainer === void 0 ? void 0 : gameContainer.children);
body === null || body === void 0 ? void 0 : body.addEventListener('keydown', (e) => { player.playerMove(e, plyrShip); });
body === null || body === void 0 ? void 0 : body.addEventListener('keyup', (e) => { player.playerShot(e, plyrShip); });
