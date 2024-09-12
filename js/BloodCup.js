class BloodCup {

  constructor(){
    this.x = gameBoxNode.offsetWidth;
    this.y = 520
    this.w = 60
    this.h = 100
    this.speed = 2
    this.lifeBack = 30

    this.node = document.createElement("img")
    this.node.src =  "./resources/bloodCup.png"
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