import { Player } from "./player.js";
import { Lazer } from "./player.js";
import { PlayerCollision } from "./collision.js";
import { CollisionElements } from "./collision.js";
import { EnnemyContainer, Ennemys } from "./ennemy.js";

export class GameLoop {
    dt: number;
    time: number;
    dtSeconds: number;

    player: Player;
    collisionWithBaseLine!: PlayerCollision;
    collisionElements!: CollisionElements;
    ennemyContainer!: EnnemyContainer; // Non-null assertion garantit l'initialisation de la propriété avant son utilisation
    body!: HTMLElement | null;
    gameContainer: HTMLElement | null;
    plyrShip!: HTMLElement;
    ennemy!: HTMLElement;

    runTheLoop: boolean;

    score: number;
    scoreArea!: HTMLElement | null;

    constructor() {
        this.dt = 0;
        this.dtSeconds = 0;
        this.time = Date.now();

        this.runTheLoop = true;
        this.score = 0;

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
            this.player.createBaseLineHitBox(
                this.gameContainer,
                this.player.baselineHitBox
            );
            this.ennemyContainer = new EnnemyContainer(this.gameContainer);
            this.collisionWithBaseLine = new PlayerCollision(
                this.ennemyContainer.getContainerInformation(), //Target A
                this.player.getBaseLineHitBox(), //Target B
                this.ennemyContainer,
                this.player
            );

            this.collisionElements = new CollisionElements(this.player.arrayBeam, this.ennemyContainer.getArrayEnnemy());

        } else {
            console.log("Erreur");
        }

        if (this.body != null) {
            this.body.addEventListener("keydown", (e) =>
                this.player.playerMove(e)
            );
            this.body.addEventListener("keyup", (e) =>
                this.player.playerShot(e)
            );
        }

        this.scoreArea = document.getElementById('scoreContainer');
        if (this.scoreArea != null) {
            this.scoreArea.innerText = `Score = ${this.score}`;
            this.scoreArea.style.display = 'block';
        }

        requestAnimationFrame(() => this.loop());
    }

    loop() {
        if (!this.runTheLoop) {
            console.log("Game over - fin de la boucle");
            this.gameOver();
            return;
        }
        const now = Date.now();
        this.dt = now - this.time;
        this.dtSeconds = this.dt / 1000;

        this.update(this.dt);
        this.updateDOM();

        this.time = now;
        requestAnimationFrame(() => this.loop());
    }
    update(dt: number) {
        // Mettre à jour les positions des lasers et du joueur
        this.player.updateLasers(dt, null);
        this.player.updatePlayerPosition();
        this.collisionWithBaseLine.setPosition(this.plyrShip, this.ennemy)

        // Vérifie la collision avec la ligne de base (ennemi atteint le joueur)
        if (this.collisionWithBaseLine.collideWithBaseLineHitBox() == true) {
            this.ennemyContainer.canMoove = false;
            this.runTheLoop = false;
        }

        // Vérifie les collisions laser-ennemi
        if (this.collisionElements.checkPosition()) {

            // Récupére l'index de l'ennemi touché
            const hitEnemyIndex = this.collisionElements.getIndexOnCollide();

            // Appele la méthode pour gérer la collision
            this.player.updateLasers(dt, this.collisionElements.getLazerIndexOnCollide());
            this.ennemyContainer.asCollideWithLazer(hitEnemyIndex);

            this.score += 50;
            if (this.scoreArea != null) {
                this.scoreArea.innerText = `Score = ${this.score}`;
            }
        }
    }

    // Mise à jour des éléments du DOM
    updateDOM() {
        this.ennemyContainer.containerMove(this.dt, 0.25);
    }

    gameOver(){
        this.plyrShip.remove();
        this.ennemy.remove();
        const gameOver = document.createElement('h2');
        const score = document.createElement('h2');
        gameOver.innerText = "Game Over";
        gameOver.className = "main-title-text";
        score.className = "main-title-text";
        this.gameContainer?.appendChild(gameOver);
    }
}


