class Cross extends Garlic {
  constructor(delay){

    //hereda las propiedaxdes que no reasignemos
    super(delay)
    
    this.y = 500


    this.w = 100
    this.h = 120 
    this.damage = 20


    //inclusion en el DOM
   
    this.node.src = "./resources/grave.png"
    // lo incluimos en el nodo gameBox donde se desarrolla el juego
    //gameBoxNode.append(this.node);
    this.node.style.width = `${this.w}px`
    this.node.style.height = `${this.h}px`
    //this.node.style.position = "absolute"
    this.node.style.top = `${this.y}px`
    //this.node.style.left = `${this.x}px`

   
      
  }
}