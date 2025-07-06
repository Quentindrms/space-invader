export class Player {
    witdh: string;
    height: string;
    color: string;
    display: string;
    align: string;
    position: string;
    speed: number;

    life: number;
    isAlive: boolean;

    playerPositionY: number;
    gameBoardSizeLeft: number;

    baselineHitBox: HTMLElement;

    arrayBeam: HTMLElement[];

    constructor(witdh: string, heigth: string, color: string) {
        this.witdh = (witdh + 'px');
        this.height = (heigth + 'px');
        this.color = color;
        this.display = "flex";
        this.align = '';
        this.position = 'absolute';
        this.speed = 5;

        this.life = 5;
        this.isAlive = true;

        this.playerPositionY = 0;
        this.gameBoardSizeLeft = 0;

        this.baselineHitBox = document.createElement('div');
        this.baselineHitBox.id = "hitbox";
        this.baselineHitBox.style.height = `${this.height}`;
        this.baselineHitBox.style.width = `750px`;
        this.baselineHitBox.style.position = 'absolute'
        this.baselineHitBox.style.display = "flex";
        this.baselineHitBox.style.borderTop = "2px";
        this.baselineHitBox.style.borderTopColor = "pink";

        this.arrayBeam = [];
    }

    /** Créer l'apparence du personnage en recevant la zone de jeu et en en y ajoutant un
     * élément visuel
     */

    createPlayer(element: HTMLElement | null, target: HTMLElement | null): void {
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

            console.log(`Game board size : ${this.gameBoardSizeLeft}`)
        }
        else {
            console.log(`Erreur l élément ${element} et ${target} n'existent pas`)
            return;
        }

    }

    createBaseLineHitBox(target: HTMLElement | null, element: HTMLElement) {
        if (element != null && target != null) {
            target.appendChild(element);
        }
    }

    //RFetourne les informations concernant la hitbox
    getBaseLineHitBox(): HTMLElement {
        return this.baselineHitBox;
    }

    /** Reçoit les touches utilisées par l'utilisateur et modifie sa position
     * si le personnage n'entre pas en collision avec une bordure 
     * si le personne entre en contacte avec une bordure il ne bouge pas
     */
    playerMove(mvt: KeyboardEvent, player: HTMLElement): void {
        console.log(`Y = ${this.playerPositionY}`)
        if (mvt.key == 'ArrowRight') {
            console.log('Droite');
            if (this.borderCollide(this.playerPositionY, this.speed, 'right') == false) {
                this.playerPositionY += this.speed;
                player.style.left = `${this.playerPositionY}px`
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
                    player.style.left = `${this.playerPositionY}px`
                    console.log(`Nouvelle position Y : ${this.playerPositionY}`);
                }
            }
        }

        else {
            console.log(mvt);
        }
    }

    playerShot(action: KeyboardEvent, player: HTMLElement) {
        if (action.key == " ") {
            console.log("Feu !");
            let lazer = new Lazer(player, this.playerPositionY);
            this.addToArrayBeam(lazer.beam);
            console.log(this.getArrayBeam());
        }
    }

    /** Vérifie si le personnage touche les bords, retourne true en cas de collision */

    borderCollide(yPos: number, speed: number, direction: string): boolean {
        if ((yPos - speed) <= 0 && direction == 'left') {
            console.log('Colision à gauche')
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

    //Gère les tableau de lasers tirés par le joueur 

    private addToArrayBeam(element: HTMLElement): void {
        this.arrayBeam.push(element);
    }

    private removeFirstElement(element: HTMLElement[]): void {
        this.arrayBeam.shift();
    }

    public getArrayBeam(): HTMLElement[] {
        return this.arrayBeam;
    }

//Supprime les laser qui ne sont plus à l'écran en récupérant 
    private clearArrayBeam(){

    }
}

export class Lazer {

    width: string;
    height: string;
    backgroundColor: string;
    position: string;
    playerPosition: number;
    gameBoard: HTMLElement | null;
    beam: HTMLElement;
    beamSpeed: number; //En miliseconde
    beamPositionY: number;


    intervalID: number | undefined;
    stillOnScreen: boolean;

    constructor(player: HTMLElement, playerPos: number) {
        this.width = '5px';
        this.height = '25px'
        this.backgroundColor = 'pink';
        this.position = 'absolute';
        this.playerPosition = playerPos;
        this.beamPositionY = player.getBoundingClientRect().y - 25;

        this.beam = document.createElement('div');
        this.beam.style.width = this.width;
        this.beam.style.height = this.height;
        this.beam.style.backgroundColor = this.backgroundColor;
        this.beam.style.position = this.position;
        this.beam.style.left = `${this.playerPosition}px`;
        this.beam.style.top = `${this.beamPositionY}px`;

        this.beamSpeed = 100;
        this.stillOnScreen = true;

        this.gameBoard = document.getElementById('gameTarget');
        if (this.gameBoard != null) {
            this.gameBoard.appendChild(this.beam);
            this.beam.id = "laser";
            this.beam.className = "laser";
            console.log(`Position sur x : ${this.beamPositionY}`)
            console.log(this.beam);
            this.intervalID = window.setInterval(() => { this.movingLazer(this.beamPositionY) }, this.beamSpeed)
        }
    }

    /** Déplace le laser vers le haut jusqu'à ce qu'il atteigne le bord supérieur 
     * Lorsque le laser atteitn x=0px le laser est automatiuqement supprimé
    */
    movingLazer(position: number) {
        this.beamPositionY -= 10;
        this.beam.style.top = `${this.beamPositionY}px`
        if (this.beamPositionY <= 0) {
            if (this.beam.parentNode) { //Vérifie si l'élément à un parent
                //this.beam.parentNode.removeChild(this.beam); //Si oui, récupère le parent et supprime l'enfant
                this.stillOnScreen = false; //Indique que la valeure n'est plus à l'écran
            }
            if (this.intervalID !== undefined) {
                clearInterval(this.intervalID) //Arrête l'interval
            }
        }
    }
}