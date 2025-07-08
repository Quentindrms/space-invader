import { EnnemyContainer } from './ennemy.js'
import { Ennemys } from './ennemy.js';
import { Lazer, Player } from './player.js';

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

    /** Récupère un élément HTML A et B et l'enregistre dans le target element correspondant, permet d'accèder aux propriétés d'un élément HTML au sein de la classe 
     */

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

    /** Récupère les éléments A et B à un moment T puis enregistre leur position sur l'axe X et Y */

    private setPosition(targetA: HTMLElement, targetB: HTMLElement): void {
        this.target_A_current_X_position = targetA.getBoundingClientRect().left;
        this.target_A_current_Y_position = targetA.getBoundingClientRect().top;
        this.target_B_current_X_position = targetB.getBoundingClientRect().left;
        this.target_B_current_Y_position = targetB.getBoundingClientRect().top;

        //        console.log(`Position actuelle de l'élément A sur l'axe Y : ${this.target_A_current_Y_position}`);
        //        console.log(`Position actuelle de l'élément B sur l'axe Y : ${this.target_B_current_Y_position}`);

    }

    //Permet de calculer si les ennemis rencontrent le joueur 
    public collideWithBaseLineHitBox(): boolean {
        if (this.target_A_element != null && this.target_B_element != null) {
            this.setPosition(this.target_A_element, this.target_B_element);
            if (this.target_A_current_Y_position >= this.target_B_current_Y_position) {
                ;
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
    }

    checkPosition() {
        if (this.arrayOfLazers != undefined) {
            for (let ennemyIndex = 0; ennemyIndex < this.arrayOfEnnemys.length; ennemyIndex++) {
                for (let lazerIndex = 0; lazerIndex < this.arrayOfLazers.length; lazerIndex++) {
                    this.setPosition(this.arrayOfLazers[lazerIndex], this.arrayOfEnnemys[ennemyIndex])
                    this.setInformation(ennemyIndex, lazerIndex);

/** Problème de boucle infinie ici : vérifier si l'erreur ne vient pas du fait que des éléments supprimés du tableau sont effectivement supprimés
 * Logiquement les éléments ne sont pas supprimés du tableau après leur disparition car pas de fonctions en ce sens
 * Implémenter une fonction qui met à jour le tableau des lazer quand un lazer est supprimé du DOM
*/

                    if (this.lazerCurrentPositionX >= this.ennemysCurrentPositionX) {

                    }

                }
            }
        }
    }

    private setInformation(lazerIndex: number, ennemyIndex: number) {
        this.lazerWidth = this.arrayOfLazers[lazerIndex].getBoundingClientRect().width;
        this.lazerHeight = this.arrayOfLazers[lazerIndex].getBoundingClientRect().height;

        this.ennemyWidth = this.arrayOfEnnemys[ennemyIndex].getBoundingClientRect().width;
        this.ennemyHeight = this.arrayOfEnnemys[ennemyIndex].getBoundingClientRect().height;
    }


    private setPosition(targetA: HTMLElement, targetB: HTMLElement): void {
        this.lazerCurrentPositionX = targetA.getBoundingClientRect().left;
        this.lazerCurrentPositionY = targetA.getBoundingClientRect().top;
        this.ennemysCurrentPositionX = targetB.getBoundingClientRect().left;
        this.ennemysCurrentPositionY = targetB.getBoundingClientRect().top;
    }

}