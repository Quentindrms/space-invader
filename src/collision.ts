import { EnnemyContainer } from './ennemy.js'
import { Ennemys } from './ennemy.js';
import { Lazer, Player } from './player.js';

// La classe PlayerCollision n'est pas modifiée ici, car la question porte sur la collision laser-ennemis
export class PlayerCollision {
    target_A_current_X_position: number;
    target_A_current_Y_position: number;
    target_B_current_X_position: number;
    target_B_current_Y_position: number;

    target_A_element: HTMLElement | null;
    target_B_element: HTMLElement | null;

    target_A_obj: EnnemyContainer;
    target_B_obj: Object;

    isInMove: boolean;

    refresh_rate: number; //Temps en miliseconde

    intervalID: number;

    constructor(targetA: HTMLElement, targetB: HTMLElement, targetAObj: EnnemyContainer, targetBobj: Object) {
        this.target_A_current_X_position = 0;
        this.target_A_current_Y_position = 0;
        this.target_B_current_X_position = 0;
        this.target_B_current_Y_position = 0;

        this.target_A_element = targetA;
        this.target_B_element = targetB;

        this.target_A_obj = targetAObj;
        this.target_B_obj = targetBobj;

        this.refresh_rate = 1000;
        this.intervalID = 0;

        this.isInMove = true;

        this.collideWithBaseLineHitBox();
    }

    private setPosition(targetA: HTMLElement, targetB: HTMLElement): void {
        this.target_A_current_X_position = targetA.getBoundingClientRect().left;
        this.target_A_current_Y_position = targetA.getBoundingClientRect().top;
        this.target_B_current_X_position = targetB.getBoundingClientRect().left;
        this.target_B_current_Y_position = targetB.getBoundingClientRect().top;
    }

    public collideWithBaseLineHitBox(): boolean {
        if (this.target_A_element != null && this.target_B_element != null) {
            this.setPosition(this.target_A_element, this.target_B_element);
            if (this.target_A_current_Y_position >= this.target_B_current_Y_position) {
                return true;
            }
        }
        return false;
    }
}

export class CollisionElements {
    arrayOfEnnemys: HTMLElement[];
    arrayOfLazers: HTMLElement[];

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

    checkPosition() {
        for (let ennemyIndex = 0; ennemyIndex < this.arrayOfEnnemys.length; ennemyIndex++) {
            // console.log('Boucle ennemyIndex'); // Décommenter pour le débogage
            const currentEnnemy = this.arrayOfEnnemys[ennemyIndex];
            this.setIndexOnCollide(ennemyIndex);
            // Récupérer les informations de l'ennemi une seule fois par ennemi
            this.ennemysCurrentPositionX = currentEnnemy.getBoundingClientRect().left;
            this.ennemysCurrentPositionY = currentEnnemy.getBoundingClientRect().top;
            this.ennemyWidth = currentEnnemy.getBoundingClientRect().width;
            this.ennemyHeight = currentEnnemy.getBoundingClientRect().height;

            for (let lazerIndex = 0; lazerIndex < this.arrayOfLazers.length; lazerIndex++) {
                // console.log('Boucle arrayOfLazers') //
                const currentLazer = this.arrayOfLazers[lazerIndex];

                if (currentLazer != null) {
                    this.lazerCurrentPositionX = currentLazer.getBoundingClientRect().left;
                    this.lazerCurrentPositionY = currentLazer.getBoundingClientRect().top;
                    this.lazerWidth = currentLazer.getBoundingClientRect().width;
                    this.lazerHeight = currentLazer.getBoundingClientRect().height;
                }
            }
        }
    }

    // setInformation et setPosition sont désormais gérés directement dans checkPosition
    // pour une meilleure clarté et pour éviter les problèmes d'ordre d'appel ou de paramètres.
    // Tu peux les supprimer si tu ne les utilises plus ailleurs.
    private setInformation(lazerElement: HTMLElement, ennemyElement: HTMLElement): void {
        this.lazerWidth = lazerElement.getBoundingClientRect().width;
        this.lazerHeight = lazerElement.getBoundingClientRect().height;

        this.ennemyWidth = ennemyElement.getBoundingClientRect().width;
        this.ennemyHeight = ennemyElement.getBoundingClientRect().height;
    }

    public getCollision(): boolean {
        // Vérifier s'il y a une collision
        if (this.lazerCurrentPositionX < this.ennemysCurrentPositionX + this.ennemyWidth &&
            this.lazerCurrentPositionX + this.lazerWidth > this.ennemysCurrentPositionX &&
            this.lazerCurrentPositionY < this.ennemysCurrentPositionY + this.ennemyHeight &&
            this.lazerCurrentPositionY + this.lazerHeight > this.ennemysCurrentPositionY) {
            console.log('Collision :)');
            console.log(`Laser (X/Y/W/H) : ${this.lazerCurrentPositionX} / ${this.lazerCurrentPositionY} / ${this.lazerWidth} / ${this.lazerHeight}`);
            console.log(`Ennemi (X/Y/W/H) : ${this.ennemysCurrentPositionX} / ${this.ennemysCurrentPositionY} / ${this.ennemyWidth} / ${this.ennemyHeight}`);
            return true;
        }
        return false;
    }

    private setPosition(lazerElement: HTMLElement, ennemyElement: HTMLElement): void {
        this.lazerCurrentPositionX = lazerElement.getBoundingClientRect().left;
        this.lazerCurrentPositionY = lazerElement.getBoundingClientRect().top;

        this.ennemysCurrentPositionX = ennemyElement.getBoundingClientRect().left;
        this.ennemysCurrentPositionY = ennemyElement.getBoundingClientRect().top;
    }

    public setIndexOnCollide(numb: number):void{
        this.ennemyIndex = numb;
    }

    //Retourne l'index de l'élément touché par le laser 
    public getIndexOnCollide():number{
        return this.ennemyIndex;
    }





}