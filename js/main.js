
/* selectores del DOM */
//las 3 pantallas principales: 
const startScreenNode = document.querySelector("#start-screen");
const gameScreenNode = document.querySelector("#game-screen");
const endScreenNode = document.querySelector("#end-screen");
const  gameBoxNode = document.querySelector("#game-box");

// DOM elements
let lifeNode = gameScreenNode.querySelector("#life");
let pointsNode = gameScreenNode.querySelector("#points");
let resultNode = endScreenNode.querySelector("#game-result");
let totalPointsNode = endScreenNode.querySelector("#total-points");
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
  //incluimos mainCharacter.life y mainCharacter.points en el DOM
  lifeNode.innerHTML = `LIFE : ${mainCharacter.life}`
  pointsNode.innerHTML = `POINTS : 000${mainCharacter.points}`

  //el juego 
  //gameLoop()
  intervalGameLoopId = setInterval(()=>{
    gameLoop()
  }, Math.round(1000/60));

  /* We add the elements */ 
  //add bat elements 
  intervalBatsId = setInterval(()=>{
    addBat();
  }, frecBat);
  //add garlic elements 
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

  /* detectar salida de elementos para no sobrecargar el sistema  
  estas funciones serán implementados en este main */ 
  detectIfBatOut()
  detectIfGarlicOut()

  /* detectar colisiones para quitar vida o dar puntos 
  estas funciones serán implementados en este main */ 
  detectIfCollWithBat()
  detectIfCollWithGarlic()

}

function gameOver(){
  //clean the intervals
  clearInterval(intervalGameLoopId)
  clearInterval(intervalBatsId)
  clearInterval(intervalGarlic)

  //cleam game-box
  gameBoxNode.innerHTML = ""

  //mostrar texto you Win/ you lose
  if(mainCharacter.life <= 0 ){
    //you lose
    resultNode.innerHTML = `YOU lOSE`
    totalPointsNode.innerHTML = `total points : ${mainCharacter.points}`
  } else {
    resultNode.innerHTML = `YOU lOSE`
    totalPointsNode.innerHTML = `total points : ${mainCharacter.points}`
  }
  //cambiar a la pantalla final
  gameScreenNode.style.display = "none"
  endScreenNode.style.display = "flex"
}

function restartGame(){
  endScreenNode.style.display = "none"
  gameScreenNode.style.display = "flex"
  
  startGame()
}

                          /*   -------  function definitions  ---------  */ 

/* functions to add the elements */ 
function addBat(){
  //creamos una nueva variable local para ir añadiendo los elementos bat al array
  let newBat = new Bat()
  batArr.push(newBat);
}

function addGarlic(){
  let newGarlic = new Garlic()
  garlicArr.push(newGarlic);
}

/* functions to remove the elements when out*/ 
function detectIfBatOut(){
  if(batArr.length === 0){
    return
  }
  if(batArr[0].x + batArr[0].w <= 0){
    //we reove it from the dom
    batArr[0].node.remove()
    //we remove it from js
    batArr.shift();
    
  }
}
function detectIfGarlicOut(){
  if(garlicArr.length === 0){
    return
  }
  if(garlicArr[0].x + garlicArr[0].w <= 0){
    //we reove it from the dom
    garlicArr[0].node.remove()
    //we remove it from js
    garlicArr.shift();
    
  }
}
/* functions to detect the collision with the elements */ 
function detectIfCollWithBat(){
  //we do a forEach to get to eachBat
  batArr.forEach((eachBat, index)=>{
  //we compare the mainChar with eachBat on screen to get collisions
  //collision logic from https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
  if (
    mainCharacter.x < eachBat.x + eachBat.w &&
    mainCharacter.x + mainCharacter.w > eachBat.x &&
    mainCharacter.y < eachBat.y + eachBat.h &&
    mainCharacter.y + mainCharacter.h > eachBat.y
  ) {
    // adjusted points in js and in dom
    mainCharacter.points += eachBat.pointsGiven
    pointsNode.innerHTML = `POINTS : 0${mainCharacter.points}`
    //borrar el elemento de js y del dom
    batArr[index].node.remove()
    batArr.splice(index,1);
    
    if(mainCharacter.points >= 1000){
      gameOver();
    }
  } 

})
}
function detectIfCollWithGarlic(){
  //we do a forEach to get to eachGarlic
  garlicArr.forEach((eachGarlic, index)=>{
    //we compare the mainChar with eachBat on screen to get collisions
    //collision logic from https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
    if (
      mainCharacter.x < eachGarlic.x + eachGarlic.w &&
      mainCharacter.x + mainCharacter.w > eachGarlic.x &&
      mainCharacter.y < eachGarlic.y + eachGarlic.h &&
      mainCharacter.y + mainCharacter.h > eachGarlic.y
    ) {
      // Collision detected!
      
      mainCharacter.life -= 20
      lifeNode.innerHTML = `LIFE : 0${mainCharacter.life}`
      //borrar el elemento del dom
      garlicArr[index].node.remove()
      garlicArr.splice(index,1);
      if(mainCharacter.life === 0){
        gameOver();
      }
    } 
})
}


                           /*     SCREEN CHANGES  */

/* Add Event Listeners */ 
startButtonNode.addEventListener("click", ()=>{
  startGame()
})

ReStartButtonNode.addEventListener("click", ()=>{
  restartGame()
}) 

/* mainCharacter jump() */

gameBoxNode.addEventListener("click", ()=>{
  mainCharacter.jump();
});




