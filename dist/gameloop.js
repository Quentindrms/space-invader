import { Player } from "./player.js";
import { PlayerCollision } from "./collision.js";
import { CollisionElements } from "./collision.js";
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
            this.player.createPlayer(this.gameContainer);
            this.gameContainer.style.flexDirection = "row";
            this.player.createBaseLineHitBox(this.gameContainer, this.player.baselineHitBox);
            this.ennemyContainer = new EnnemyContainer(this.gameContainer);
            this.collisionWithBaseLine = new PlayerCollision(this.ennemyContainer.getContainerInformation(), //Target A
            this.player.getBaseLineHitBox(), //Target B
            this.ennemyContainer, this.player);
            this.collisionElements = new CollisionElements(this.player.arrayBeam, this.ennemyContainer.getArrayEnnemy());
        }
        else {
            console.log("Erreur");
        }
        if (this.body != null) {
            this.body.addEventListener("keydown", (e) => this.player.playerMove(e));
            this.body.addEventListener("keyup", (e) => this.player.playerShot(e));
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
    // Mise à jour de la logiqueÒ du jeu
    // Remplacez votre méthode update() par celle-ci :
    update(dt) {
        // Mettre à jour les positions des lasers et du joueur
        this.player.updateLasers(dt, null);
        this.player.updatePlayerPosition();
        // Vérifier la collision avec la ligne de base (ennemi atteint le joueur)
        if (this.collisionWithBaseLine.collideWithBaseLineHitBox() == true) {
            this.ennemyContainer.canMoove = false;
        }
        // Vérifier les collisions laser-ennemi
        if (this.collisionElements.checkPosition()) {
            // Récupérer l'index de l'ennemi touché
            const hitEnemyIndex = this.collisionElements.getIndexOnCollide();
            // Appeler la méthode pour gérer la collision
            this.player.updateLasers(dt, this.collisionElements.getLazerIndexOnCollide());
            this.ennemyContainer.asCollideWithLazer(hitEnemyIndex);
        }
    }
    // Mise à jour des éléments du DOM
    updateDOM() {
        this.ennemyContainer.containerMove(this.dt, 0.12);
        //console.log("Update DOM");
    }
}
