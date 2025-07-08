export class Collision {
    /** Récupère un élément HTML A et B et l'enregistre dans le target element correspondant, permet d'accèder aux propriétés d'un élément HTML au sein de la classe
     */
    constructor(targetA, targetB, targetAObj, targetBobj) {
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
    setPosition(targetA, targetB) {
        this.target_A_current_X_position = targetA.getBoundingClientRect().left;
        this.target_A_current_Y_position = targetA.getBoundingClientRect().top;
        this.target_B_current_X_position = targetB.getBoundingClientRect().left;
        this.target_B_current_Y_position = targetB.getBoundingClientRect().top;
        //        console.log(`Position actuelle de l'élément A sur l'axe Y : ${this.target_A_current_Y_position}`);
        //        console.log(`Position actuelle de l'élément B sur l'axe Y : ${this.target_B_current_Y_position}`);
    }
    //Permet de calculer si deux éléments 
    /** Refaire la fonction pour qu'elle renvoie une valeure capable d'arrêter le mouvement  */
    collideWithBaseLineHitBox() {
        if (this.target_A_element != null && this.target_B_element != null) {
            this.intervalID = window.setTimeout(() => {
                if (this.target_A_element != null && this.target_B_element != null) {
                    this.setPosition(this.target_A_element, this.target_B_element);
                    if (this.collideWithBaseLineHitBox() == true) {
                        clearInterval(this.intervalID);
                        return true;
                    }
                }
            }, this.refresh_rate);
        }
        if (this.target_A_current_Y_position >= this.target_B_current_Y_position) {
            console.log(`Collision entre les éléments testés`);
            return true;
        }
        else {
            return false;
        }
    }
    collideWithPlayer(playerHitbox, ennemyContainer) {
        if (playerHitbox && ennemyContainer) {
            this.setPosition(playerHitbox, ennemyContainer);
            if (this.target_B_current_Y_position <= this.target_A_current_Y_position) {
                console.log('Collision entre les deux éléments');
            }
            else {
                console.log('Pas de collision');
            }
        }
    }
}
class ArrayOfElelements {
    constructor() {
        this.arrayOfEnnemys = [];
        this.arrayOfLazers = [];
    }
}
