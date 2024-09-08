
/* selectores del DOM */
//las 3 pantallas principales: 
const startScreenNode = document.querySelector("#start-screen");
const gameScreenNode = document.querySelector("#game-screen");
const endScreenNode = document.querySelector("#end-screen");
const  gameBoxNode = document.querySelector("#game-box");
//botones
const startButtonNode = document.querySelector("#start-button");
const ReStartButtonNode = document.querySelector("#restart-button");
//personajes y elementos
let mainCharacter = null
//variable almacen de Bats
let batArr = []
let frecBat = 8000
//variable almacen de Garlics
let garlicArr = [] 
let frecGarlic = 4000

/* INTERVALOS DEL JUEGO*/ 
let intervalGameLoopId = null
let intervalBatsId = null
let intervalGarlic = null


function startGame(){

  startScreenNode.style.display = "none"
  gameScreenNode.style.display = "flex"

  //elementos iniciales del juego
  mainCharacter = new MainCharacter()

  //el juego 
  //gameLoop()
  intervalGameLoopId = setInterval(()=>{
    gameLoop()
  }, Math.round(1000/60));

  //add arrays elements
  intervalBatsId = setInterval(()=>{
    addBat();
    
  }, frecBat);

  intervalGarlic = setInterval (()=>{
    addGarlic();
  }, frecGarlic);

}

function gameLoop(){
  //movimiento personaje
  mainCharacter.gravity()
  //movimiento elementos
  //bats
  batArr.forEach((eachBat)=>{
    eachBat.automaticMovement()
  });
  garlicArr.forEach((eachGarlic)=>{
    eachGarlic.automaticMovement()
  });

}

function gameOver(){}

function restartGame(){
  endScreenNode.style.display = "none"
  gameScreenNode.style.display = "flex"
}


/* funciones en el juego de los elementos */ 
function addBat(){
  //creamos una nueva variable local para ir añadiendo los elementos bat al array
  let newBat = new Bat()
  batArr.push(newBat);
}

function addGarlic(){
  let newGarlic = new Garlic()
  garlicArr.push(newGarlic);
}



/* PASAR A SIGUIENTE PANTALLA */
/* Add Event Listeners */ 

startButtonNode.addEventListener("click", ()=>{
  startGame()
})

ReStartButtonNode.addEventListener("click", ()=>{
  restartGame()
}) 


/* salto del personaje */

gameBoxNode.addEventListener("click", ()=>{
  mainCharacter.jump();
});




