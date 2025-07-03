import { Player } from './player.js';
const body = document.querySelector('body');
const gameContainer = document.getElementById('gameTarget');
const plyrShip = document.createElement('div');
let test = new Player('50', '50', 'yellow');
test.createPlayer(plyrShip, gameContainer);
console.log(test);
console.log(gameContainer === null || gameContainer === void 0 ? void 0 : gameContainer.children);
body === null || body === void 0 ? void 0 : body.addEventListener('keydown', (e) => { test.playerMove(e); });
