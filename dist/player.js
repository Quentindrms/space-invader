export class Player {
    constructor(witdh, heigth, color) {
        this.witdh = (witdh + 'px');
        this.height = (heigth + 'px');
        this.color = color;
        this.display = "flex";
        this.align = 'end';
        this.position = 'absolute';
        this.speed = 1;
        this.playerPositionX = 0;
        this.playerPositionY = 0;
    }
    createPlayer(element, target) {
        if (element != null && target != null) {
            element.style.width = this.witdh;
            element.style.height = this.height;
            element.style.backgroundColor = this.color;
            element.style.display = this.display;
            element.style.position = this.position;
            target.appendChild(element);
            return;
        }
        else {
            console.log(`Erreur l élément ${element} et ${target} n'existent pas`);
        }
    }
    playerMove(mvt) {
        if (mvt.key == 'ArrowUp') {
            console.log('Haut');
        }
        else if (mvt.key == 'ArrowRight') {
            console.log('Droite');
        }
        else if (mvt.key == 'ArrowDown') {
            console.log('Bas');
        }
        else if (mvt.key == 'ArrowLeft') {
            console.log('Gauche');
        }
    }
}
