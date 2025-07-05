export class Collision {
    target_A_current_X_position: number;
    target_A_current_Y_position: number;
    target_B_current_X_position: number;
    target_B_current_Y_position: number;

    target_A_element: HTMLElement | null;
    target_B_element: HTMLElement | null;

    refresh_rate: number; //Temps en miliseconde

    /** Récupère un élément HTML A et B et l'enregistre dans le target element correspondant, permet d'accèder aux propriétés d'un élément HTML au sein de la classe 
     */

    constructor(targetA: HTMLElement, targetB: HTMLElement) {
        this.target_A_current_X_position = 0;
        this.target_A_current_Y_position = 0;
        this.target_B_current_X_position = 0;
        this.target_B_current_Y_position = 0;

        this.target_A_element = targetA;
        this.target_B_element = targetB;

        this.refresh_rate = 1000;

        if (this.target_A_element != null && this.target_B_element != null) {
            this.setPosition(this.target_A_element, this.target_B_element);
            window.setInterval(() => {
                if (this.target_A_element != null && this.target_B_element != null) {
                    this.setPosition(this.target_A_element, this.target_B_element);
                }
            }, this.refresh_rate);
        }

    }

    /** Récupère les éléments A et B à un moment T puis enregistre leur position sur l'axe X et Y */

    private setPosition(targetA: HTMLElement, targetB: HTMLElement): void {
        this.target_A_current_X_position = targetA.getBoundingClientRect().left;
        this.target_A_current_Y_position = targetA.getBoundingClientRect().top;
        this.target_B_current_X_position = targetB.getBoundingClientRect().left;
        this.target_B_current_Y_position = targetB.getBoundingClientRect().top;

        console.log(`Position actuelle de l'élément A sur l'axe X : ${this.target_A_current_X_position}`);
        console.log(`Position actuelle de l'élément A sur l'axe Y : ${this.target_A_current_Y_position}`);
        console.log(`Position actuelle de l'élément B sur l'axe X : ${this.target_B_current_X_position}`);
        console.log(`Position actuelle de l'élément B sur l'axe Y : ${this.target_B_current_Y_position}`);

    }
}