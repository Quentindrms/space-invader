import { GameLoop } from './gameloop.js';

const mainTitle = document.createElement('h2');
const gameBoard = document.getElementById('gameTarget');
const playButton = document.createElement('div');

mainTitle.classList = "main-title-text";
mainTitle.innerText = "SPACE INVADER"

playButton.classList = "play-button"
playButton.innerText = "PLAY";
playButton.addEventListener('click', () => { play() })

gameBoard?.appendChild(mainTitle);
gameBoard?.appendChild(playButton);

function play() {
    playButton.remove();
    mainTitle.remove();
    const gameloop = new GameLoop();
}






