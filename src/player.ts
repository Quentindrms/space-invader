export class Player {
  witdh: string;
  height: string;
  color: string;
  display: string;
  align: string;
  position: string;
  speed: number;

  player: HTMLElement;

  life: number;
  isAlive: boolean;

  playerPositionY: number;
  playerPositionX: number;
  newPlayerPositionX: number;
  gameBoardSizeLeft: number;

  baselineHitBox: HTMLElement;

  arrayBeam: HTMLElement[];

  constructor(witdh: string, heigth: string, color: string) {
    this.witdh = witdh + "px";
    this.height = heigth + "px";
    this.color = color;
    this.display = "flex";
    this.align = "";
    this.position = "absolute";
    this.speed = 15;

    this.life = 5;
    this.isAlive = true;

    this.player = document.createElement('div');
    this.playerPositionX = parseInt(witdh) / 2;
    console.log(`player position y : ${this.playerPositionX}`)
    this.playerPositionY = 0;
    this.newPlayerPositionX = 0;
    this.gameBoardSizeLeft = 0;

    this.baselineHitBox = document.createElement("div");
    this.baselineHitBox.id = "hitbox";
    this.baselineHitBox.style.height = `${this.height}`;
    this.baselineHitBox.style.width = `${document.getElementById('gameTarget')?.getBoundingClientRect().width}px`;
    this.baselineHitBox.style.position = "absolute";
    this.baselineHitBox.style.display = "flex";
    this.baselineHitBox.style.borderTop = "2px";
    this.baselineHitBox.style.borderTopColor = "pink";

    this.arrayBeam = [];
  }

  createPlayer(target: HTMLElement | null): void {
    if (this.player != null && target != null) {
      this.player.style.width = this.witdh;
      this.player.style.height = this.height;
      this.player.style.backgroundImage = "url('../../img/player.png')";
      this.player.style.backgroundSize = 'contain';
      this.player.style.display = this.display;
      this.player.style.position = this.position;
      this.player.style.justifyContent = this.align;
      target.appendChild(this.player);

      this.playerPositionX = this.player.getBoundingClientRect().left;
      this.gameBoardSizeLeft = target.getBoundingClientRect().width;

      console.log(`Game board size : ${this.gameBoardSizeLeft}`);
    } else {
      console.log(`Erreur l’élément ${this.player} et ${target} n'existent pas`);
    }
  }

  createBaseLineHitBox(target: HTMLElement | null, element: HTMLElement) {
    if (element != null && target != null) {
      target.appendChild(element);
    }
  }

  getBaseLineHitBox(): HTMLElement {
    return this.baselineHitBox;
  }

  playerMove(mvt: KeyboardEvent): void {
    if (mvt.key == "ArrowRight") {
      if (!this.borderCollide(this.playerPositionY, this.speed, "right")) {
        this.playerPositionY += this.speed;
        this.player.style.left = `${this.playerPositionY}px`;
      }
    } else if (mvt.key == "ArrowLeft") {
      if (!this.borderCollide(this.playerPositionY, this.speed, "left")) {
        this.playerPositionY -= this.speed;
        this.player.style.left = `${this.playerPositionY}px`;
      }
    }
  }

  updatePlayerPosition(): string {
    this.playerPositionX = this.newPlayerPositionX;
    return `${this.playerPositionX}px`
  }

  playerShot(action: KeyboardEvent) {
    if (action.key === " ") {
      const lazer = new Lazer(this.player, this.playerPositionY);
      action.preventDefault();
      this.addToArrayBeam(lazer.beam);
    }
  }

  //Si le joueur touche un des bords l'empêche de sortir du cadre 
  borderCollide(yPos: number, speed: number, direction: string): boolean {
    if (yPos - speed <= 0 && direction === "left") {
      return true;
    } else if (
      yPos + speed >= this.gameBoardSizeLeft &&
      direction === "right"
    ) {
      return true;
    } else {
      return false;
    }
  }

  //Quand un laser est tiré l'enregistre dans le tableau
  private addToArrayBeam(element: HTMLElement): void {
    this.arrayBeam.push(element);
  }

  public getArrayBeam(): HTMLElement[] {
    return this.arrayBeam;
  }
  
  private removeToArrayBeam(index: number){
    this.arrayBeam.splice(index, 1);
  }

  private removeFromDOM(index:number){
    this.arrayBeam[index].remove;
  }

/** Met à jour le laser à la fréquence indiquée par le delta time et le déplace 
 * dans le DOM du nombre de pixel indiqué dans la variable 'speed'
 * Parcours 
 */
updateLasers(dt: number, collidedLaserIndex: number | null): void {
  const speed = 500; // px/s
  const delta = speed * (dt / 1000);

  // On boucle à l'envers car on modifie la longueur du tableau
  for (let i = this.arrayBeam.length - 1; i >= 0; i--) {
    const beam = this.arrayBeam[i];

    // Cas 1 : Le laser en cours de vérification est celui qui est entré en collision
    if (i === collidedLaserIndex) {
      beam.remove(); 
      this.arrayBeam.splice(i, 1);
      continue; // Passe au laser suivant
    }

    // Cas 2 : Le laser n'est pas en collision, met à jour sa position
    const y = parseFloat(beam.style.top);
    const newY = y - delta;
    beam.style.top = `${newY}px`;

    // Cas 3 : Le laser sort de l'écran
    if (newY <= 0) {
      beam.remove(); 
      this.arrayBeam.splice(i, 1);
    }
  }
}

  lazerAsCollide(bool: boolean): boolean {
    return bool;
  }
}

export class Lazer {
  width: string;
  height: string;
  backgroundColor: string;
  position: string;
  playerPosition: number;
  gameBoard: HTMLElement | null;
  beam: HTMLElement;
  beamPositionY: number;
  stillOnScreen: boolean;

  constructor(player: HTMLElement, playerPos: number) {
    this.width = "5px";
    this.height = "15px";
    this.backgroundColor = "pink";
    this.position = "absolute";
    this.playerPosition = playerPos;
    this.beamPositionY = player.getBoundingClientRect().y;
    this.stillOnScreen = true;

    this.beam = document.createElement("div");
    this.beam.style.width = this.width;
    this.beam.style.height = this.height;
    this.beam.style.backgroundColor = this.backgroundColor;
    this.beam.style.position = this.position;
    this.beam.style.left = `${this.playerPosition}px`;
    this.beam.style.top = `${this.beamPositionY}px`;

    this.gameBoard = document.getElementById("gameTarget");
    if (this.gameBoard != null) {
      this.beam.id = "laser";
      this.beam.className = "laser";
      this.gameBoard.appendChild(this.beam);
    }
  }
}
