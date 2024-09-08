class Bat {

  constructor() {
    this.x = gameBoxNode.offsetWidth;
    this.y = 250
    this.w = 300
    this.h = 200
    this.speed = 2


    //cuando se construye hay que incluirlo en el dom, this.node es este nuevo elemento Bat
    this.node = document.createElement("img");
    //incluimos la imagen en el elemento creado
    this.node.src = "../resources/morcego.gif"

    //lo incluimos en el nodo gameBox donde se desarrolla el juego
    gameBoxNode.append(this.node);
    //le damos dimensiones al nodo igualndolas a las de nuestro objeto
    this.node.style.width = `${this.w}px`
    this.node.style.height = `${this.h}px`

    //lo posicionamos en la game-box
    this.node.style.position = "absolute"
    this.node.style.top = `${this.y}px`
    this.node.style.left = `${this.x}px`
  }
  //tendrán un movimiento predef y constante (gameLoop())
  automaticMovement(){
    this.x -= this.speed
    this.node.style.left = `${this.x}px`
  }
}