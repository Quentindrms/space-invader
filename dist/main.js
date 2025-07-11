import { GameLoop } from './gameloop.js';
const mainTitle = document.createElement('h2');
const gameBoard = document.getElementById('gameTarget');
const playButton = document.createElement('div');
const keyBiding = document.createElement('div');
const leftKey = document.createElement('img');
const rightKey = document.createElement('img');
const backspaceKey = document.createElement('img');
const escapeKey = document.createElement('img');
/** Création des éléments du menu principal  */
mainTitle.classList = "main-title-text";
mainTitle.innerText = "SPACE INVADER";
playButton.classList = "play-button";
playButton.innerText = "PLAY";
playButton.addEventListener('click', () => { play(); });
leftKey.src = './img/icons/key-left.png';
rightKey.src = './img/icons/key-right.png';
backspaceKey.src = './img/icons/backspace.png';
escapeKey.src = "./img/icons/escape.png";
keyBiding.classList = 'keyBiding';
keyBiding.appendChild(leftKey);
keyBiding.appendChild(rightKey);
keyBiding.appendChild(backspaceKey);
keyBiding.appendChild(escapeKey);
keyBiding.style.marginTop = '10px';
keyBiding.style.display = "flex";
keyBiding.style.alignSelf = 'center';
keyBiding.style.gap = '25px';
gameBoard === null || gameBoard === void 0 ? void 0 : gameBoard.appendChild(mainTitle);
gameBoard === null || gameBoard === void 0 ? void 0 : gameBoard.appendChild(playButton);
gameBoard === null || gameBoard === void 0 ? void 0 : gameBoard.appendChild(keyBiding);
function play() {
    playButton.remove();
    mainTitle.remove();
    keyBiding.remove();
    const gameloop = new GameLoop();
}
