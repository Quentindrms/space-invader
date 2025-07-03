export class Player {
    constructor(witdh, heigth, color) {
        this.witdh = (witdh + 'px');
        this.height = (heigth + 'px');
        this.color = color;
        this.display = "flex";
        this.align = 'flex-end';
        this.position = 'absolute';
        this.speed = 5;
        this.life = 5;
        this.playerPositionY = 0;
        this.gameBoardSizeLeft = 0;
    }
    /** Créer l'apparence du personnage en recevant la zone de jeu et en en y ajoutant un
     * élément visuel
     */
    createPlayer(element, target) {
        if (element != null && target != null) {
            element.style.width = this.witdh;
            element.style.height = this.height;
            element.style.backgroundColor = this.color;
            element.style.display = this.display;
            element.style.position = this.position;
            element.style.justifyContent = this.align;
            target.appendChild(element);
            this.playerPositionY = element.getBoundingClientRect().left;
            this.gameBoardSizeLeft = target.getBoundingClientRect().width;
            console.log(`Game board size : ${this.gameBoardSizeLeft}`);
            return;
        }
        else {
            console.log(`Erreur l élément ${element} et ${target} n'existent pas`);
            return;
        }
    }
    /** Reçoit les touches utilisées par l'utilisateur et modifie sa position
     * si le personnage n'entre pas en collision avec une bordure
     * si le personne entre en contacte avec une bordure il ne bouge pas
     */
    playerMove(mvt, player) {
        console.log(`Y = ${this.playerPositionY}`);
        if (mvt.key == 'ArrowRight') {
            console.log('Droite');
            if (this.borderCollide(this.playerPositionY, this.speed, 'right') == false) {
                this.playerPositionY += this.speed;
                player.style.left = `${this.playerPositionY}px`;
                console.log(`Nouvelle position Y : ${this.playerPositionY}`);
            }
            else {
            }
        }
        else if (mvt.key == 'ArrowLeft') {
            if (mvt.key == 'ArrowLeft') {
                console.log('Droite');
                if (this.borderCollide(this.playerPositionY, this.speed, 'left') == false) {
                    this.playerPositionY -= this.speed;
                    player.style.left = `${this.playerPositionY}px`;
                    console.log(`Nouvelle position Y : ${this.playerPositionY}`);
                }
                else {
                }
            }
        }
        else if (mvt.key == " ") {
            console.log("Feu !");
            let lazer = new Lazer(player, this.playerPositionY);
        }
        else {
            console.log(mvt);
        }
    }
    /** Vérifie si le personnage touche les bords, retourne true en cas de collision */
    borderCollide(yPos, speed, direction) {
        if ((yPos - speed) <= 0 && direction == 'left') {
            console.log('Colision à gauche');
            return true;
        }
        else if ((yPos + speed) >= this.gameBoardSizeLeft && direction == 'right') {
            console.log('Colision à droite');
            return true;
        }
        else {
            return false;
        }
    }
}
class Lazer {
    constructor(player, playerPos) {
        this.width = '10px';
        this.height = '25px';
        this.backgroundColor = 'pink';
        this.position = 'absolute';
        this.playerPosition = playerPos;
        this.beamPositionX = player.getBoundingClientRect().x;
        this.beam = document.createElement('div');
        this.beam.style.width = this.width;
        this.beam.style.height = this.height;
        this.beam.style.backgroundColor = this.backgroundColor;
        this.beam.style.position = this.position;
        this.beam.style.left = `${this.playerPosition}px`;
        this.beam.style.top = `${this.beamPositionX}px`;
        this.beamSpeed = 200;
        this.gameBoard = document.getElementById('gameTarget');
        if (this.gameBoard != null) {
            this.gameBoard.appendChild(this.beam);
            this.beam.id = "laser";
            let positionX = this.beam.getBoundingClientRect().x;
            window.setInterval(() => { this.movingLazer(positionX); }, this.beamSpeed);
        }
    }
    movingLazer(position) {
        console.log('Déplacementdu laser');
        this.beamPositionX -= 10;
        this.beam.style.top = `${this.beamPositionX}px`;
    }
}
