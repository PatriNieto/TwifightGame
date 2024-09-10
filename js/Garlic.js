class Garlic {
  constructor(delay){
    this.delay= delay
    this.x = gameBoxNode.offsetWidth + delay;
    this.y = 550
    this.w = 50
    this.h = 50
    this.speed = 2
    this.damage = 10
    

    //inclusion en el DOM
    this.node = document.createElement("img");
    this.node.src = "../resources/ajo.png"
    // lo incluimos en el nodo gameBox donde se desarrolla el juego
    gameBoxNode.append(this.node);
    this.node.style.width = `${this.w}px`
    this.node.style.height = `${this.h}px`
    this.node.style.position = "absolute"
    this.node.style.top = `${this.y}px`
    this.node.style.left = `${this.x}px`


  }

  automaticMovement(){
    this.x -= this.speed
    this.node.style.left = `${this.x}px`
  }
} 