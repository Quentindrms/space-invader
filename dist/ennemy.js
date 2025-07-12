export class Ennemys {
    constructor() {
        this.arrayEnnemy = [];
        this.hitBox = document.createElement('div');
        this.isAlive = true;
        this.witdh = 25;
        this.height = 25;
        this.canMoove = true;
        this.target = document.getElementById('ennemyContainer');
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
                    ennemyElement.style.backgroundImage = "url('./img/ennemy.png')";
                    ennemyElement.style.backgroundSize = 'contain';
                    ennemyElement.style.display = "flex";
                    ennemyElement.style.alignItems = "end";
                    target.appendChild(ennemyElement);
                    this.hitBox = document.createElement('div');
                    this.hitBox.id = 'hitbox';
                    this.hitBox.style.width = `${this.witdh}px`;
                    this.hitBox.style.height = '10px';
                    ennemyElement.appendChild(this.hitBox);
                    this.addToArrayEnnemy(ennemyElement);
                }
            }
        }
    }
    //Ajoute un élément dans le tableau
    addToArrayEnnemy(element) {
        this.arrayEnnemy.push(element);
    }
    removeEnnemyDOM(index) {
        this.arrayEnnemy[index].style.display = 'none';
    }
    removeToArrayEnnemy(index) {
        this.removeEnnemyDOM(index);
        this.arrayEnnemy.splice(index, 1);
    }
    getArrayEnnemy() {
        return this.arrayEnnemy;
    }
}
/** Créer un conteneur pour les ennemis dans lequel ils apparaissent
 * Gère aussi le déplacement du conteneur
*/
export class EnnemyContainer {
    /** Créer un objet conteneur qui contiendra les ennemis
     * Ajoute ensuite les ennemis à la gameBoard en créant
    */
    constructor(target) {
        var _a;
        this.target = target;
        this.ennemy = new Ennemys();
        this.ennemyContainerGap = '35px';
        this.ennemyGlobalWidth = this.ennemy.witdh + parseInt(this.ennemyContainerGap, 10);
        this.ennemyNumber = 1;
        this.ennemyContainerWidth = `${this.ennemyGlobalWidth * this.ennemyNumber}px`;
        this.ennemyContainerHeight = `${(_a = document.getElementById('gameTarget')) === null || _a === void 0 ? void 0 : _a.style.width}px`;
        this.ennemyContainerDisplay = 'flex';
        this.ennemyContainerPosition = 'absolute';
        this.ennemyContainerTop = `15px`;
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
    createContainer() {
        this.ennemyContainerElement.style.width = `${this.ennemyGlobalWidth}`;
        this.ennemyContainerElement.style.height = this.ennemyContainerHeight;
        this.ennemyContainerElement.style.display = this.ennemyContainerDisplay;
        this.ennemyContainerElement.style.position = this.ennemyContainerPosition;
        this.ennemyContainerElement.style.top = '0px';
        this.ennemyContainerElement.style.left = '0px';
        this.ennemyContainerElement.style.gap = this.ennemyContainerGap;
        this.ennemyContainerElement.style.flexWrap = 'none';
        this.ennemyContainerElement.id = 'ennemyContainer';
        this.target.appendChild(this.ennemyContainerElement);
        this.ennemy.createEnnemy(this.ennemyContainerElement, 1); //Insère le nombre d'ennemi désiré
    }
    /** Déplace le conteneur sur l'axe principale et l'axe secondaire suivant un patern prédéfinit
     *
     */
    containerMove(deltaTime, speed) {
        let positionX = parseInt(this.ennemyContainerElement.style.left || "0", 10);
        let positionY = parseInt(this.ennemyContainerElement.style.top || "0", 10);
        this.checkEnnemyNumber(this.ennemy.getArrayEnnemy());
        const gameTarget = document.getElementById('gameTarget');
        if (!gameTarget)
            return;
        const gameTargetRect = gameTarget.getBoundingClientRect();
        const containerRect = this.ennemyContainerElement.getBoundingClientRect();
        //Détermine les bords 
        const maxX = gameTargetRect.width - containerRect.width;
        const minX = 10;
        const speedDown = 1;
        // Déplacement selon la direction
        if (this.canMoove == true) {
            positionX += Math.round(((speed * deltaTime) * this.direction));
            positionX = Math.round(positionX);
        }
        // Inversion de direction aux bords
        if (positionX >= maxX && this.canMoove == true) {
            this.direction = -1;
            positionX = maxX;
            this.bounceOnBorder += 1;
            if (this.bounceOnBorder == 3) {
                positionY += (speedDown * deltaTime);
                this.bounceOnBorder = 0;
            }
        }
        if (positionX <= minX && this.canMoove == true) {
            this.direction = 1;
            positionX = minX;
            this.bounceOnBorder += 1;
            if (this.bounceOnBorder == 3) {
                positionY += (speedDown * deltaTime);
                this.bounceOnBorder = 0;
            }
        }
        this.ennemyContainerElement.style.left = `${positionX}px`;
        this.ennemyContainerElement.style.top = `${positionY}px`;
    }
    checkEnnemyNumber(array) {
        if (array.length == 0) {
            this.ennemyNumber++;
            this.ennemy.createEnnemy(this.ennemyContainerElement, this.ennemyNumber);
            this.ennemyContainerWidth = `${this.ennemyGlobalWidth * this.ennemyNumber}px`;
        }
    }
    getContainerInformation() {
        return this.ennemyContainerElement;
    }
    getArrayEnnemy() {
        return this.ennemy.getArrayEnnemy();
    }
    asCollideWithLazer(index) {
        console.log(`Suppression de l'ennemi ${index}`);
        this.ennemy.removeToArrayEnnemy(index);
    }
}
