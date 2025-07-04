export class Ennemys {
    constructor() {
        this.isAlive = true;
        this.witdh = 25;
        this.height = 25;
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
    createEnnemy(target, numberOf) {
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
                    target.appendChild(ennemyElement);
                    console.log(`${i} éléménts crées sur ${numberOf}`);
                }
            }
        }
    }
}
/**  */
export class EnnemyContainer {
    /** Créer un objet conteneur qui contiendra les ennemis
     * Ajoute ensuite les ennemis à la gameBoard en créant
    */
    constructor(target) {
        var _a;
        this.target = target;
        this.ennemy = new Ennemys();
        this.ennemyContainerWidth = `${target.getBoundingClientRect().width - 250}px`;
        this.ennemyContainerHeight = `${(_a = document.getElementById('gameTarget')) === null || _a === void 0 ? void 0 : _a.style.width}px`;
        this.ennemyContainerDisplay = 'flex';
        this.ennemyContainerPosition = 'absolute';
        this.ennemyContainerTop = `25px`;
        this.ennemyContainerGap = '25px';
        this.ennemyContainerPositionY = 0;
        this.ennemyContainerSizeLeft = 0;
        this.direction = 1;
        this.ennemyContainerElement = document.createElement('div');
        this.createContainer();
        this.intervalID = window.setTimeout(() => this.containerMove(this.ennemyContainerElement), 1000);
    }
    /** Créer le conteneur */
    createContainer() {
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
    containerMove(containerElement) {
        let positionX = parseInt(containerElement.style.left || "0", 10);
        const gameTarget = document.getElementById('gameTarget');
        if (!gameTarget)
            return;
        const gameTargetRect = gameTarget.getBoundingClientRect();
        const containerRect = containerElement.getBoundingClientRect();
        //Détermine la les bords 
        const maxX = gameTargetRect.width - containerRect.width;
        const minX = 10;
        // Déplacement selon la direction
        positionX += 5 * this.direction;
        // Inversion de direction aux bords
        if (positionX >= maxX) {
            this.direction = -1;
            positionX = maxX;
        }
        if (positionX <= minX) {
            this.direction = 1;
            positionX = minX;
        }
        containerElement.style.left = `${positionX}px`;
        setTimeout(() => this.containerMove(containerElement), 100);
    }
}
