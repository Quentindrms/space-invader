import { EnnemyContainer } from './ennemy.js'
import { Ennemys } from './ennemy.js';
import { Lazer, Player } from './player.js';

// La classe PlayerCollision n'est pas modifiée ici, car la question porte sur la collision laser-ennemis
export class PlayerCollision {
    player_current_X_position: number;
    player_current_Y_position: number;

    ennemy_current_X_position: number;
    ennemy_current_Y_position: number;
    ennemy_bottom_position: number;

    player_element: HTMLElement | null;
    ennemy_element: HTMLElement | null;

    player_obj: EnnemyContainer;
    ennemy_obj: Object;

    isInMove: boolean;

    refresh_rate: number; //Temps en miliseconde

    intervalID: number;

    constructor(player: HTMLElement, ennemy: HTMLElement, targetAObj: EnnemyContainer, targetBobj: Object) {
        this.player_current_X_position = 0;
        this.player_current_Y_position = 0;

        this.ennemy_current_X_position = 0;
        this.ennemy_current_Y_position = 0;
        this.ennemy_bottom_position = 0;

        this.player_element = player;
        this.ennemy_element = ennemy;

        this.player_obj = targetAObj;
        this.ennemy_obj = targetBobj;

        this.refresh_rate = 1000;
        this.intervalID = 0;

        this.isInMove = true;

        this.collideWithBaseLineHitBox();
    }

    //Récupère la position des éléments à comparer 
    private setPosition(player: HTMLElement, ennemy: HTMLElement): void {
        this.player_current_X_position = player.getBoundingClientRect().left;
        this.player_current_Y_position = player.getBoundingClientRect().top;
        this.ennemy_current_X_position = ennemy.getBoundingClientRect().left;
        this.ennemy_current_Y_position = ennemy.getBoundingClientRect().top;
        this.ennemy_bottom_position = ennemy.getBoundingClientRect().bottom;
    }
    //En cas de collision des ennemis avec la hitbox arrête le mouvement 
    public collideWithBaseLineHitBox(): boolean {
        if (this.player_element != null && this.ennemy_element != null) {
            this.setPosition(this.player_element, this.ennemy_element);
            if (this.ennemy_bottom_position >= this.player_current_Y_position) {
                return true;
            }
        }
        return false;
    }
}

export class CollisionElements {
    arrayOfEnnemys: HTMLElement[];
    arrayOfLazers: HTMLElement[];
    lazerIndex: number;

    lazerCurrentPositionX: number;
    lazerCurrentPositionY: number;
    lazerWidth: number;
    lazerHeight: number;
    ennemysCurrentPositionX: number;
    ennemysCurrentPositionY: number;
    ennemyWidth: number;
    ennemyHeight: number;
    ennemyIndex: number;

    constructor(lazer: HTMLElement[], ennemys: HTMLElement[]) {
        this.arrayOfEnnemys = ennemys;
        this.arrayOfLazers = lazer;
        this.lazerIndex = 0;

        this.lazerCurrentPositionX = 0;
        this.lazerCurrentPositionY = 0;
        this.lazerWidth = 0;
        this.lazerHeight = 0;

        this.ennemysCurrentPositionX = 0;
        this.ennemysCurrentPositionY = 0;
        this.ennemyWidth = 0;
        this.ennemyHeight = 0;
        this.ennemyIndex = 0;
    }

    /** Vérifie si une collision entre le laser et les ennemis ont lieu
     * Créer une paire laser/ennemis et la compare avec testCollisionsForCurrentPair
     */

    checkPosition() {
        // Parcourir tous les ennemis
        for (let ennemyIndex = 0; ennemyIndex < this.arrayOfEnnemys.length; ennemyIndex++) {
            const currentEnnemy = this.arrayOfEnnemys[ennemyIndex];

            // Vérifier que l'ennemi existe et est visible
            if (currentEnnemy && currentEnnemy.offsetParent !== null) {
                // Récupérer les informations de l'ennemi une seule fois
                this.ennemysCurrentPositionX = currentEnnemy.getBoundingClientRect().left;
                this.ennemysCurrentPositionY = currentEnnemy.getBoundingClientRect().top;
                this.ennemyWidth = currentEnnemy.getBoundingClientRect().width;
                this.ennemyHeight = currentEnnemy.getBoundingClientRect().height;

                // Parcourir tous les lasers pour cet ennemi
                for (let lazerIndex = 0; lazerIndex < this.arrayOfLazers.length; lazerIndex++) {
                    const currentLazer = this.arrayOfLazers[lazerIndex];

                    // Vérifier que le laser existe et est visible
                    if (currentLazer && currentLazer.offsetParent !== null) {
                        // Récupérer les informations du laser
                        this.lazerCurrentPositionX = currentLazer.getBoundingClientRect().left;
                        this.lazerCurrentPositionY = currentLazer.getBoundingClientRect().top;
                        this.lazerWidth = currentLazer.getBoundingClientRect().width;
                        this.lazerHeight = currentLazer.getBoundingClientRect().height;

                        // Test de la la paire laser/ennemi
                        if (this.testCollisionForCurrentPair()) {

                            // Stocker l'index de l'ennemi touché
                            this.setIndexOnCollide(ennemyIndex);

                            //Stocker l'index du laser ayant touché 
                            this.setLazerIndexOnCollide(lazerIndex);

                            // Retourner true dès qu'une collision est trouvée
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }

//Enregistre la dimmension des éléments testés
    private setInformation(lazerElement: HTMLElement, ennemyElement: HTMLElement): void {
        this.lazerWidth = lazerElement.getBoundingClientRect().width;
        this.lazerHeight = lazerElement.getBoundingClientRect().height;

        this.ennemyWidth = ennemyElement.getBoundingClientRect().width;
        this.ennemyHeight = ennemyElement.getBoundingClientRect().height;
    }

//Test la collision avec la pair laser/ennemis
    private testCollisionForCurrentPair(): boolean {
        // Utiliser l'algorithme AABB (Axis-Aligned Bounding Box)
        if (this.lazerCurrentPositionX < this.ennemysCurrentPositionX + this.ennemyWidth &&
            this.lazerCurrentPositionX + this.lazerWidth > this.ennemysCurrentPositionX &&
            this.lazerCurrentPositionY < this.ennemysCurrentPositionY + this.ennemyHeight &&
            this.lazerCurrentPositionY + this.lazerHeight > this.ennemysCurrentPositionY) {
            return true;
        }
        return false;
    }

//Enregistre la position des éléments à comparer 
    private setPosition(lazerElement: HTMLElement, ennemyElement: HTMLElement): void {
        this.lazerCurrentPositionX = lazerElement.getBoundingClientRect().left;
        this.lazerCurrentPositionY = lazerElement.getBoundingClientRect().top;

        this.ennemysCurrentPositionX = ennemyElement.getBoundingClientRect().left;
        this.ennemysCurrentPositionY = ennemyElement.getBoundingClientRect().top;
    }

    //Enregistre l'index de l'élément touché par le laser 
    private setIndexOnCollide(numb: number): void {
        this.ennemyIndex = numb;
    }

    //Retourne l'index de l'élément touché par le laser 
    public getIndexOnCollide(): number {
        return this.ennemyIndex;
    }

    //Lorsqu'une collision est détectée, enregistre quel laser a touché 
    private setLazerIndexOnCollide(numb:number):void{
        this.lazerIndex = numb;
    }

    //Retourne l'index du laser ayant touché l'élément 
    public getLazerIndexOnCollide():number {
        return this.lazerIndex;
    }





}