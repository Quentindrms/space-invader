export class Collision {
    constructor() {
        this.target_A_current_X_position = 0;
        this.target_A_curent_Y_position = 0;
        this.target_B_current_X_position = 0;
        this.target_B_current_Y_position = 0;
        this.target_A_element = null;
        this.target_B_element = null;
    }
    setElement(targetA, targetB) {
        this.target_A_element = targetA;
        this.target_B_element = targetB;
    }
    setPosition(targetA, targetB) {
    }
}
