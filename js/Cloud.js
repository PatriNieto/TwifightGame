class Cloud {
  constructor(posY){
    this.x = gameBoxNode.offsetWidth
    this.y= posY
    this.w = 200 //175
    this.h = 76 //75
    this.speed = 2
  

    //construccion e el dom 
    this.node = document.createElement("img")
    this.node.src = "./resources/cloud.png"

    //una vez creado el elemento lo incluimos en el div que debe contener el juego
    gameBoxNode.append(this.node);
    //le damos sus dimensiones
    this.node.style.width = `${this.w}px`
    this.node.style.height = `${this.h}px`

    //lo posicionamos
    this.node.style.position = "absolute"
    this.node.style.top = `${this.y}px`
    this.node.style.left = `${this.x}px`

    //le damos una opacacidad menor por ser nubes
    this.node.style.opacity = `0.5`
  }
  automaticMovement(){
    this.x -= this.speed
    this.node.style.left = `${this.x}px`
  }
}