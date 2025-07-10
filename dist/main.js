import { GameLoop } from './gameloop.js';
const mainTitle = document.createElement('h2');
const gameBoard = document.getElementById('gameTarget');
const playButton = document.createElement('div');
mainTitle.classList = "main-title-text";
mainTitle.innerText = "SPACE INVADER";
playButton.classList = "play-button";
playButton.innerText = "PLAY";
playButton.addEventListener('click', () => { play(); });
gameBoard === null || gameBoard === void 0 ? void 0 : gameBoard.appendChild(mainTitle);
gameBoard === null || gameBoard === void 0 ? void 0 : gameBoard.appendChild(playButton);
function play() {
    playButton.remove();
    mainTitle.remove();
    const gameloop = new GameLoop();
}
