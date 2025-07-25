export class Player {
    constructor(witdh, heigth, color) {
        var _a;
        this.witdh = witdh + "px";
        this.height = heigth + "px";
        this.color = color;
        this.display = "flex";
        this.align = "";
        this.position = "absolute";
        this.speed = 50;
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
        this.baselineHitBox.style.width = `${(_a = document.getElementById('gameTarget')) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect().width}px`;
        this.baselineHitBox.style.position = "absolute";
        this.baselineHitBox.style.display = "flex";
        this.baselineHitBox.style.borderTop = "2px";
        this.baselineHitBox.style.borderTopColor = "pink";
        this.arrayBeam = [];
        this.coolDown = 500; //Temps en miliseconde
        this.timeStamp = 0;
    }
    createPlayer(target) {
        if (this.player != null && target != null) {
            this.player.style.width = this.witdh;
            this.playerPositionY = target.getBoundingClientRect().width / 2;
            this.player.style.height = this.height;
            this.player.style.backgroundImage = "url('./img/player.png')";
            this.player.style.backgroundSize = 'contain';
            this.player.style.display = this.display;
            this.player.style.position = this.position;
            this.player.style.justifyContent = this.align;
            target.appendChild(this.player);
            this.playerPositionX = target.getBoundingClientRect().width / 2;
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
            action.preventDefault();
            if (Date.now() - this.timeStamp > this.coolDown) {
                const lazer = new Lazer(this.player);
                this.addToArrayBeam(lazer.beam);
                // La ligne manquante est ici :
                this.timeStamp = Date.now();
            }
        }
    }
    //Si le joueur touche un des bords l'empêche de sortir du cadre
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
    //Quand un laser est tiré l'enregistre dans le tableau
    addToArrayBeam(element) {
        this.arrayBeam.push(element);
    }
    getArrayBeam() {
        return this.arrayBeam;
    }
    removeToArrayBeam(index) {
        this.arrayBeam.splice(index, 1);
    }
    removeFromDOM(index) {
        this.arrayBeam[index].remove;
    }
    /** Met à jour le laser à la fréquence indiquée par le delta time et le déplace
     * dans le DOM du nombre de pixel indiqué dans la variable 'speed'
     * Parcours
     */
    updateLasers(dt, collidedLaserIndex) {
        const speed = 500; // px/s
        const delta = speed * (dt / 1000);
        // On boucle à l'envers car on modifie la longueur du tableau
        for (let i = this.arrayBeam.length - 1; i >= 0; i--) {
            const beam = this.arrayBeam[i];
            // Cas 1 : Le laser en cours de vérification est celui qui est entré en collision
            if (i === collidedLaserIndex) {
                beam.remove();
                this.arrayBeam.splice(i, 1);
                continue; // Passe au laser suivant
            }
            // Cas 2 : Le laser n'est pas en collision, met à jour sa position
            const y = parseFloat(beam.style.top);
            const newY = y - delta;
            beam.style.top = `${newY}px`;
            // Cas 3 : Le laser sort de l'écran
            if (newY <= 0) {
                beam.remove();
                this.arrayBeam.splice(i, 1);
            }
        }
    }
    lazerAsCollide(bool) {
        return bool;
    }
}
export class Lazer {
    constructor(player) {
        this.width = "3px";
        this.height = "2px";
        this.backgroundColor = "yellow";
        this.position = "absolute";
        this.gameBoard = document.getElementById("gameTarget");
        if (!this.gameBoard) {
            this.beam = document.createElement('div');
            this.stillOnScreen = false;
            this.playerPosition = 0;
            this.beamPositionY = 0;
            return;
        }
        const playerRect = player.getBoundingClientRect();
        const gameBoardRect = this.gameBoard.getBoundingClientRect();
        const laserWidth = parseInt(this.width, 10);
        const laserHeight = parseInt(this.height, 10);
        const top = playerRect.top - gameBoardRect.top - laserHeight;
        const left = playerRect.left - gameBoardRect.left + (playerRect.width / 2) - (laserWidth / 2);
        this.beam = document.createElement("div");
        this.beam.style.width = this.width;
        this.beam.style.height = this.height;
        this.beam.style.backgroundColor = this.backgroundColor;
        this.beam.style.position = this.position;
        this.beam.style.top = `${top}px`;
        this.beam.style.left = `${left}px`;
        this.beam.id = "laser";
        this.beam.className = "laser";
        this.gameBoard.appendChild(this.beam);
        this.playerPosition = player.getBoundingClientRect().left;
        this.beamPositionY = player.getBoundingClientRect().top;
        this.stillOnScreen = true;
    }
}
