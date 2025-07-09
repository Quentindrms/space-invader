export class Player {
    constructor(witdh, heigth, color) {
        this.witdh = witdh + "px";
        this.height = heigth + "px";
        this.color = color;
        this.display = "flex";
        this.align = "";
        this.position = "absolute";
        this.speed = 15;
        this.life = 5;
        this.isAlive = true;
        this.player = document.createElement('div');
        this.playerPositionX = parseInt(witdh) / 2;
        console.log(`player position y : ${this.playerPositionX}`);
        this.playerPositionY = 0;
        this.newPlayerPositionX = 0;
        this.gameBoardSizeLeft = 0;
        this.baselineHitBox = document.createElement("div");
        this.baselineHitBox.id = "hitbox";
        this.baselineHitBox.style.height = `${this.height}`;
        this.baselineHitBox.style.width = `750px`;
        this.baselineHitBox.style.position = "absolute";
        this.baselineHitBox.style.display = "flex";
        this.baselineHitBox.style.borderTop = "2px";
        this.baselineHitBox.style.borderTopColor = "pink";
        this.arrayBeam = [];
    }
    createPlayer(target) {
        if (this.player != null && target != null) {
            this.player.style.width = this.witdh;
            this.player.style.height = this.height;
            this.player.style.backgroundImage = "url('../../img/player.png')";
            this.player.style.backgroundSize = 'contain';
            this.player.style.display = this.display;
            this.player.style.position = this.position;
            this.player.style.justifyContent = this.align;
            target.appendChild(this.player);
            this.playerPositionX = this.player.getBoundingClientRect().left;
            this.gameBoardSizeLeft = target.getBoundingClientRect().width;
            console.log(`Game board size : ${this.gameBoardSizeLeft}`);
        }
        else {
            console.log(`Erreur l’élément ${this.player} et ${target} n'existent pas`);
        }
    }
    createBaseLineHitBox(target, element) {
        if (element != null && target != null) {
            target.appendChild(element);
        }
    }
    getBaseLineHitBox() {
        return this.baselineHitBox;
    }
    playerMove(mvt) {
        if (mvt.key == "ArrowRight") {
            if (!this.borderCollide(this.playerPositionY, this.speed, "right")) {
                this.playerPositionY += this.speed;
                this.player.style.left = `${this.playerPositionY}px`;
            }
        }
        else if (mvt.key == "ArrowLeft") {
            if (!this.borderCollide(this.playerPositionY, this.speed, "left")) {
                this.playerPositionY -= this.speed;
                this.player.style.left = `${this.playerPositionY}px`;
            }
        }
    }
    updatePlayerPosition() {
        this.playerPositionX = this.newPlayerPositionX;
        return `${this.playerPositionX}px`;
    }
    playerShot(action) {
        if (action.key === " ") {
            const lazer = new Lazer(this.player, this.playerPositionY);
            action.preventDefault();
            this.addToArrayBeam(lazer.beam);
        }
    }
    borderCollide(yPos, speed, direction) {
        if (yPos - speed <= 0 && direction === "left") {
            return true;
        }
        else if (yPos + speed >= this.gameBoardSizeLeft &&
            direction === "right") {
            return true;
        }
        else {
            return false;
        }
    }
    addToArrayBeam(element) {
        this.arrayBeam.push(element);
    }
    removeFromArrayBeam(element) {
        const index = this.arrayBeam.indexOf(element);
        if (index !== -1) {
            this.arrayBeam.splice(index, 1);
        }
    }
    getArrayBeam() {
        return this.arrayBeam;
    }
    updateLasers(dt) {
        const speed = 500; // px/s
        const delta = speed * (dt / 1000);
        for (let i = this.arrayBeam.length - 1; i >= 0; i--) {
            const beam = this.arrayBeam[i];
            const y = parseFloat(beam.style.top);
            const newY = y - delta;
            beam.style.top = `${newY}px`;
            if (newY <= 0) {
                console.log(this.arrayBeam);
                beam.remove();
                this.removeFromArrayBeam(beam);
                console.log('Suppression du lazer, affichage des lazer contenus dans le tableau');
            }
        }
    }
}
export class Lazer {
    constructor(player, playerPos) {
        this.width = "5px";
        this.height = "25px";
        this.backgroundColor = "pink";
        this.position = "absolute";
        this.playerPosition = playerPos;
        this.beamPositionY = player.getBoundingClientRect().y;
        this.stillOnScreen = true;
        this.beam = document.createElement("div");
        this.beam.style.width = this.width;
        this.beam.style.height = this.height;
        this.beam.style.backgroundColor = this.backgroundColor;
        this.beam.style.position = this.position;
        this.beam.style.left = `${this.playerPosition}px`;
        this.beam.style.top = `${this.beamPositionY}px`;
        this.gameBoard = document.getElementById("gameTarget");
        if (this.gameBoard != null) {
            this.beam.id = "laser";
            this.beam.className = "laser";
            this.gameBoard.appendChild(this.beam);
        }
    }
}
