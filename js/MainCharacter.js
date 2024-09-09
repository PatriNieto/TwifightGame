class MainCharacter {

  constructor(){
    this.x = 50
    this.y = 500
    this.w = 100
    this.h = 100
    this.life = 100
    this.points = 0
    this.jumpSpeed = 150
    this.gravityForce = 5

    //creacion en el DOM del personaje - solo se hará unna vez, al crearlo, por eso en el constructor
    this.node = document.createElement("img");
    //cambiamos el src del nuevo elemento
    this.node.src = "../resources/mainChar.gif"

    //lo añadimos al DOM 
    gameBoxNode.append(this.node);

    //ajustamos su anchura y altura

    this.node.style.width = `${this.w}px`
    this.node.style.height = `${this.h}px`

    //incluirloo en la caja de juego
    this.node.style.position = "absolute"
    this.node.style.top = `${this.y}px`
    this.node.style.left = `${this.x}px`

  } 

  //aunque el personaje este fijo necesitamos que la gravity se produzca para que vuelva despues de saltar
  //en esta caso como solo queremos que baje cuando salte lo aplicamos solo si y <500, su estado incial
  gravity(){
    if(this.y < 500){
      this.y += this.gravityForce 
      this.node.style.top = `${this.y}px`
    }

  }
  //el metodo jump cambia la posicion y de nuestro objeto
  //se activara con spacebar 
  jump() {
    this.y -= this.jumpSpeed
    this.node.style.top = `${this.y}px`
    

  }


}