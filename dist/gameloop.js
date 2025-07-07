import { Player } from "./player.js";
import { Collision } from "./collision.js";
import { EnnemyContainer } from "./ennemy.js";
export class GameLoop {
    constructor() {
        this.dt = 0;
        this.dtSeconds = 0;
        this.time = Date.now();
        this.body = document.querySelector("body");
        this.gameContainer = document.getElementById("gameTarget");
        this.plyrShip = document.createElement("div");
        this.ennemy = document.createElement("div");
        this.plyrShip.id = "plyrShip";
        /** Créer l'objet joueur et le fait apparaître à l'écran, lui ajoute une hitbox */
        this.player = new Player("50", "50", "white");
        if (this.gameContainer) {
            this.player.createPlayer(this.plyrShip, this.gameContainer);
            this.player.createBaseLineHitBox(this.gameContainer, this.player.baselineHitBox);
            this.ennemyContainer = new EnnemyContainer(this.gameContainer);
            this.collision = new Collision(this.ennemyContainer.getContainerInformation(), this.player.getBaseLineHitBox(), this.ennemyContainer, this.player);
        }
        else {
            console.log("Erreur");
        }
        if (this.body != null) {
            this.body.addEventListener("keydown", (e) => this.player.playerMove(e, this.plyrShip));
            this.body.addEventListener("keyup", (e) => this.player.playerShot(e, this.plyrShip));
        }
        requestAnimationFrame(() => this.loop());
    }
    loop() {
        const now = Date.now();
        this.dt = now - this.time;
        this.dtSeconds = this.dt / 1000;
        this.update(this.dt);
        this.updateDOM();
        this.time = now;
        requestAnimationFrame(() => this.loop());
    }
    // Mise à jour de la logique du jeu
    update(dt) {
        this.player.updateLasers(dt);
        this.player.updatePlayerPosition();
    }
    // Mise à jour des éléments du DOM
    updateDOM() {
        this.ennemyContainer.containerMove(this.dt, 1);
        console.log("Update DOM");
    }
}
