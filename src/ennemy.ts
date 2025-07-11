export class Ennemys {
    isAlive: boolean;
    canMoove: boolean;
    witdh: number;
    height: number;
    //numberOf: number;
    typeOf: HTMLElement;
    target: HTMLElement | null;
    hitBox: HTMLElement | null;

    arrayEnnemy: HTMLElement[];

    constructor() {

        this.arrayEnnemy = [];

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
                    ennemyElement.style.backgroundImage = "url('./img/ennemy.png')";
                    ennemyElement.style.backgroundSize = 'contain';
                    ennemyElement.style.display = "flex";
                    ennemyElement.style.alignItems = "end";

                    target.appendChild(ennemyElement);
                    this.hitBox = document.createElement('div');
                    this.hitBox.id = 'hitbox';
                    this.hitBox.style.width = `${this.witdh}px`
                    this.hitBox.style.height = '10px';
                    ennemyElement.appendChild(this.hitBox);

                    this.addToArrayEnnemy(ennemyElement);
                }
            }
        }
    }
    //Ajoute un élément dans le tableau
    private addToArrayEnnemy(element: HTMLElement) {
        this.arrayEnnemy.push(element);
    }

    public removeEnnemyDOM(index: number) {
        this.arrayEnnemy[index].style.display = 'none';
    }

    public removeToArrayEnnemy(index: number) {
        this.removeEnnemyDOM(index);
        this.arrayEnnemy.splice(index, 1);
    }

    public getArrayEnnemy(): HTMLElement[] {
        return this.arrayEnnemy;
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
    speed: number; //En pixel par seconde
    direction: number;
    bounceOnBorder: number;
    canMoove: boolean;


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
        this.ennemyContainerTop = `15px`;
        this.ennemyContainerGap = '35px';
        this.ennemyContainerPositionY = 0;
        this.bounceOnBorder = 0;

        this.ennemyContainerSizeLeft = 0;
        this.direction = 1;
        this.speed = 10;
        this.canMoove = true;

        this.ennemyContainerElement = document.createElement('div');
        this.createContainer();
    }

    /** Créer le conteneur */
    private createContainer() {
        this.ennemyContainerElement.style.width = `${this.ennemyContainerWidth}`;
        this.ennemyContainerElement.style.height = this.ennemyContainerHeight;
        this.ennemyContainerElement.style.display = this.ennemyContainerDisplay;
        this.ennemyContainerElement.style.position = this.ennemyContainerPosition;
        this.ennemyContainerElement.style.top = '0px';
        this.ennemyContainerElement.style.left = '0px'
        this.ennemyContainerElement.style.gap = this.ennemyContainerGap;
        this.ennemyContainerElement.style.flexWrap = 'wrap';
        this.ennemyContainerElement.id = 'ennemyContainer';


        this.target.appendChild(this.ennemyContainerElement);
        this.ennemy.createEnnemy(this.ennemyContainerElement, 70); //Insère le nombre d'ennemi désiré
    }
    /** Déplace le conteneur sur l'axe principale et l'axe secondaire suivant un patern prédéfinit
     * 
     */

    public containerMove(deltaTime: number, speed: number) {
        let positionX: number = parseInt(this.ennemyContainerElement.style.left || "0", 10);
        let positionY: number = parseInt(this.ennemyContainerElement.style.top || "0", 10);

        const gameTarget = document.getElementById('gameTarget');
        if (!gameTarget) return;

        const gameTargetRect = gameTarget.getBoundingClientRect();
        const containerRect = this.ennemyContainerElement.getBoundingClientRect();

        //Détermine les bords 
        const maxX = gameTargetRect.width - containerRect.width;
        const minX = 10;

        // Déplacement selon la direction
        if (this.canMoove == true) {
            positionX += Math.round(((speed * deltaTime) * this.direction));
            positionX = Math.round(positionX)
        }

        // Inversion de direction aux bords
        if (positionX >= maxX && this.canMoove == true) {
            this.direction = -1;
            positionX = maxX;
            this.bounceOnBorder += 1
            if (this.bounceOnBorder == 3) {
                positionY += (speed * deltaTime);
                this.bounceOnBorder = 0;
            }
        }
        if (positionX <= minX && this.canMoove == true) {
            this.direction = 1;
            positionX = minX;
            this.bounceOnBorder += 1;
            if (this.bounceOnBorder == 3) {
                positionY += (speed * deltaTime);
                this.bounceOnBorder = 0;
            }
        }

        this.ennemyContainerElement.style.left = `${positionX}px`;
        this.ennemyContainerElement.style.top = `${positionY}px`;
    }

    public getContainerInformation(): HTMLElement {
        return this.ennemyContainerElement
    }

    public getArrayEnnemy(): HTMLElement[] {
        return this.ennemy.getArrayEnnemy();
    }

    public asCollideWithLazer(index: number) {
        console.log(`Suppression de l'ennemi ${index}`);
        this.ennemy.removeToArrayEnnemy(index);
    }
}
