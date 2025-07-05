class Ennemys {
    isAlive: boolean;
    canMoove: boolean;
    witdh: number;
    height: number;
    //numberOf: number;
    typeOf: HTMLElement;
    target: HTMLElement | null;
    hitBox: HTMLElement | null;

    constructor() {
        this.hitBox = document.createElement('div');
        this.isAlive = true;
        this.witdh = 25;
        this.height = 25;
        this.canMoove = true;
        //this.numberOf = numberOf
        this.target = document.getElementById('ennemyContainer');
        this.typeOf = document.createElement('div');
        if (this.target != null) {
            this.createEnnemy(this.target, 1);
        }
    }

    /** Créer un ennemi en ajoutant un élément div 'ennemyContainer' dans lequel les
     * ennemis sont ensuites ajoutés, le nombre d'ennemi dépend de la valeur passée en 
     * paramètre (NumberOf)
     */
    public createEnnemy(target: HTMLElement | null, numberOf: number) {
        if (target != null) {
            /** Ajoute le nombre d'ennemis reçu en paramètre de la fonction et les ajoutes dans ennemyContainer */
            for (let i = 0; i < numberOf; i++) {

                if (target != null) {

                    let ennemyElement = document.createElement('div');

                    ennemyElement.id = "Ennemi";
                    ennemyElement.style.width = `${this.witdh}px`;
                    ennemyElement.style.height = `${this.height}px`;
                    ennemyElement.style.backgroundColor = 'red';
                    ennemyElement.style.display = "flex";
                    ennemyElement.style.alignItems = "end";

                    target.appendChild(ennemyElement);
                    this.hitBox = document.createElement('div');
                    this.hitBox.id = 'hitbox';
                    this.hitBox.style.width = `${this.witdh}px`
                    this.hitBox.style.height = '10px';
                    this.hitBox.style.backgroundColor = 'green';
                    ennemyElement.appendChild(this.hitBox);

                    console.log(`${i} éléménts crées sur ${numberOf}`)
                }
            }
        }
    }
}

/** Créer un conteneur pour les ennemis dans lequel ils apparaissent
 * Gère aussi le déplacement du conteneur 
*/

export class EnnemyContainer {
    ennemyContainerWidth: string | null;
    ennemyContainerHeight: string;
    ennemyContainerDisplay: string;
    ennemyContainerPosition: string;
    ennemyContainerTop: string;
    ennemyContainerGap: string;

    ennemyContainerSizeLeft: number;
    ennemyContainerPositionY: number;

    ennemyContainerElement: HTMLElement;
    target: HTMLElement;

    ennemy: Ennemys;
    direction: number;
    bounceOnBorder: number;

    intervalID: number;



    /** Créer un objet conteneur qui contiendra les ennemis 
     * Ajoute ensuite les ennemis à la gameBoard en créant 
    */
    constructor(target: HTMLElement) {
        this.target = target;
        this.ennemy = new Ennemys();

        this.ennemyContainerWidth = `${target.getBoundingClientRect().width - 250}px`;
        this.ennemyContainerHeight = `${document.getElementById('gameTarget')?.style.width}px`;
        this.ennemyContainerDisplay = 'flex';
        this.ennemyContainerPosition = 'absolute';
        this.ennemyContainerTop = `25px`;
        this.ennemyContainerGap = '25px';
        this.ennemyContainerPositionY = 0;
        this.bounceOnBorder = 0;

        this.ennemyContainerSizeLeft = 0;
        this.direction = 1;

        this.ennemyContainerElement = document.createElement('div');
        this.createContainer();

        this.intervalID = window.setInterval(() => this.containerMove(this.ennemyContainerElement), 100);
    }

    /** Créer le conteneur */
    private createContainer() {
        this.ennemyContainerElement.style.width = `${this.ennemyContainerWidth}`;
        this.ennemyContainerElement.style.height = this.ennemyContainerHeight;
        this.ennemyContainerElement.style.display = this.ennemyContainerDisplay;
        this.ennemyContainerElement.style.position = this.ennemyContainerPosition;
        this.ennemyContainerElement.style.top = this.ennemyContainerTop;
        this.ennemyContainerElement.style.gap = this.ennemyContainerGap;
        this.ennemyContainerElement.style.flexWrap = 'wrap';
        this.ennemyContainerElement.id = 'ennemyContainer';


        this.target.appendChild(this.ennemyContainerElement);
        this.ennemy.createEnnemy(this.ennemyContainerElement, 50); //Insère le nombre d'ennemi désiré
    }
    /** Déplace le conteneur sur l'axe principale et l'axe secondaire suivant un patern prédéfinit
     * Reçoit l'emplacement du conteneur en paramètre 
     */
    private containerMove(containerElement: HTMLElement) {
        let positionX: number = parseInt(containerElement.style.left || "0", 10);
        let positionY: number = parseInt(containerElement.style.top || "0", 10);

        const gameTarget = document.getElementById('gameTarget');
        if (!gameTarget) return;

        const gameTargetRect = gameTarget.getBoundingClientRect();
        const containerRect = containerElement.getBoundingClientRect();

        //Détermine les bords 
        const maxX = gameTargetRect.width - containerRect.width;
        const minX = 10;

        // Déplacement selon la direction
        positionX += 5 * this.direction;

        // Inversion de direction aux bords
        if (positionX >= maxX) {
            this.direction = -1;
            positionX = maxX;
            this.bounceOnBorder += 1
            console.log(`bounce : ${this.bounceOnBorder}`)
            if (this.bounceOnBorder == 1) {
                positionY += 100;
                this.bounceOnBorder = 0;
            }
        }
        if (positionX <= minX) {
            this.direction = 1;
            positionX = minX;
            this.bounceOnBorder += 1;
            console.log(`bounce : ${this.bounceOnBorder}`)
            if (this.bounceOnBorder == 1) {
                positionY += 20;
                this.bounceOnBorder = 0;
            }
        }

        containerElement.style.left = `${positionX}px`;
        containerElement.style.top = `${positionY}px`;

        // setTimeout(() => this.containerMove(containerElement), 100);
    }

    public getContainerInformation(): HTMLElement {
        return this.ennemyContainerElement
    }

    public stopMovement(bool: boolean) {
        if (bool == true) {
            clearInterval(this.intervalID);
            console.log('Fin de la boucle mouvement sur les ennemis');
        }
    }
}
