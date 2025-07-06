import { Player } from "./player.js";
import { Lazer } from "./player.js";
import { Collision } from "./collision.js";
import { EnnemyContainer, Ennemys } from "./ennemy.js";

export class GameLoop {

    dt: number;
    time: number;
    dtSeconds: number;


    player: Player;
    collision!: Collision;
    ennemyContainer!: EnnemyContainer; //Non-null assertion garantit l'initialisation de la propriété avant son utilisation
    body!:HTMLElement|null;
    gameContainer:HTMLElement|null;
    plyrShip!: HTMLElement;
    ennemy!: HTMLElement;

    constructor() {
        this.dt = 0;
        this.dtSeconds = 0;
        this.time = Date.now();

        this.body = document.querySelector('body');
        this.gameContainer = document.getElementById('gameTarget');
        this.plyrShip = document.createElement('div');
        this.ennemy = document.createElement('div')
        this.plyrShip.id = "plyrShip";

        /** Créer l'objet joueur et le fait apparaitre à l'écran, lui ajoute une hitbox */
        this.player = new Player('50', '50', 'white')
        if(this.gameContainer){
        this.player.createPlayer(this.plyrShip, this.gameContainer);
        this.player.createBaseLineHitBox(this.gameContainer, this.player.baselineHitBox);
        this.ennemyContainer = new EnnemyContainer(this.gameContainer);
        this.collision = new Collision(this.ennemyContainer.getContainerInformation(), this.player.getBaseLineHitBox(), this.ennemyContainer, this.player)
        } else{
            console.log('Erreur');
        }

        if (this.body != null) {
            this.body.addEventListener('keydown', (e) => this.player.playerMove(e, this.plyrShip));
            this.body.addEventListener('keyup', (e) => this.player.playerShot(e, this.plyrShip));
        }

        if (this.gameContainer != null) {

        }

        requestAnimationFrame(() => this.loop());
    }

    loop() {
        const now = Date.now();
        this.dt = now - this.time;
        this.dtSeconds = this.dt/1000;
        console.log(`Delta en miliseconde: ${this.dt}`)
        console.log(`Delta en seconde : ${this.dtSeconds}`)

        this.update(this.dt);
        this.updateDOM();

        this.time = now;
        requestAnimationFrame(() => this.loop());
    }
    //Mise à jour de la logique du jeu 
    update(dt: number) {

    }
    //Mise à jour des éléments du DOM
    updateDOM() {
        this.ennemyContainer.containerMove(this.dt, 0.10);
        console.log('Update DOM');
    }
}