
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
let musicGameNode = gameScreenNode.querySelector("audio");
let musicGameButtonNode = gameScreenNode.querySelector("img");
let musicGameOverNode = endScreenNode.querySelector("#game-over-audio");
let musicGameWinNode = endScreenNode.querySelector("#game-win-audio");
let isSound = true


//botones
const startButtonNode = document.querySelector("#start-button");
const ReStartButtonNode = document.querySelector("#restart-button");
//personajes y elementos
let mainCharacter = null
//variable almacen de Bats
let batArr = []
let frecBat = 4000


//variable almacen de Garlics
let garlicArr = [] 
let frecGarlic = 4000


/* INTERVALOS DEL JUEGO*/ 
let intervalGameLoopId = null
let intervalBatsId = null
let intervalGarlic = null
let afterJumpTimeOutId = null


function startGame(){

  startScreenNode.style.display = "none"
  gameScreenNode.style.display = "flex"
  

  //elementos iniciales del juego
  mainCharacter = new MainCharacter()
  //incluimos mainCharacter.life y mainCharacter.points en el DOM
  lifeNode.innerHTML = `LIFE : ${mainCharacter.life}`
  pointsNode.innerHTML = `POINTS : 000${mainCharacter.points}`
 
  
  //creamos los elementos de audio para las interacciones
  let batAudioElement = document.createElement("audio")
  batAudioElement.src = "../resources/audio/bat.mp3"
  batAudioElement.id = "audio-bat"
  gameBoxNode.append(batAudioElement)
  let garlicAudioElement = document.createElement("audio")
  garlicAudioElement.src = "../resources/audio/badElement.mp3"
  garlicAudioElement.id = "audio-garlic"
  gameBoxNode.append(garlicAudioElement)
  //extraemos los nodos
  batAudioNode = gameBoxNode.querySelector("#audio-bat");
  garlicAudioNode = gameBoxNode.querySelector("#audio-garlic");

  //el juego 

  //gameLoop()
  intervalGameLoopId = setInterval(()=>{
    gameLoop()
  }, Math.round(1000/60));
  musicGameNode.play();

  /* We add the elements */ 
  //add bat elements 
  
  intervalBatsId = setInterval(()=>{
    /* let randomFrec = Math.floor(Math.random()*(22000 - 17000) + 17000)
    batTimeOut = setTimeout(addBat, randomFrec) */
    addBat();
  }, frecBat);
  //add garlic elements 
  intervalGarlic = setInterval (()=>{
    /* let randomFrec2 = Math.floor(Math.random()*(10000 - 5000) + 5000)
    garlicTimeOut = setTimeout(addGarlic, randomFrec2) */
    addGarlic();
    
  },frecGarlic );

  /* mainCharacter jump() */

gameBoxNode.addEventListener("click", handleClickJump); 
window.addEventListener("keydown", handleArrow)  
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
  musicGameNode.pause();
  clearInterval(intervalGameLoopId)
  clearInterval(intervalBatsId)
  clearInterval(intervalGarlic)
  
  
  
  //cleam game-box
  gameBoxNode.innerHTML = ""
  
  garlicArr = []
  batArr = []
  musicGameButtonNode.src = "./resources/sound.png";

  
  
  //mostrar texto you Win/ you lose
  if(mainCharacter.life <= 0 ){
    //you lose
    resultNode.innerHTML = `YOU lOSE`
    totalPointsNode.innerHTML = `total points : ${mainCharacter.points}`
    
  } else {
    resultNode.innerHTML = `YOU WIN`
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
  //calculamos un y random entre uhn salto y dos dedl personaje
  let posY = Math.floor(Math.random()*300)+ 100
  let newBat = new Bat(posY)
  batArr.push(newBat);
}

function addGarlic(){
  let delay = Math.floor(Math.random()*700) 
  let newGarlic = new Garlic(delay)
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
    mainCharacter.x < (eachBat.x + eachBat.w/2) &&
    mainCharacter.x + mainCharacter.w > eachBat.x + eachBat.w/2 &&
    mainCharacter.y < eachBat.y + eachBat.h/3 &&
    mainCharacter.y + mainCharacter.h/3 > eachBat.y



   /*  mainCharacter.x < eachBat.x + eachBat.w &&
    mainCharacter.x + mainCharacter.w > eachBat.x &&
    mainCharacter.y < eachBat.y + eachBat.h &&
    mainCharacter.y + mainCharacter.h > eachBat.y */
  ) {
    // adjusted points in js and in dom
    mainCharacter.points += eachBat.pointsGiven
    pointsNode.innerHTML = `POINTS : 0${mainCharacter.points}`
    //borrar el elemento de js y del dom
    batArr[index].node.remove()
    batArr.splice(index,1)
    
    if(mainCharacter.points === 500){
      clearTimeout(afterJumpTimeOutId)
      setTimeout(gameOver, 2500);
      musicGameWinNode.play()
      
      gameBoxNode.removeEventListener("click", handleClickJump)
      window.removeEventListener("keydown", handleArrow)
      
      mainCharacter.node.src = "../resources/mainCharVict.gif"
      
    } else if(mainCharacter.points < 500 && mainCharacter.life > 0){
      mainCharacter.node.src = "../resources/mainCharJumpingBatted.gif"
      setTimeout(()=>{
      mainCharacter.node.src = "../resources/mainChar2.gif"
      }, 200);
    batAudioNode.play()
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
      mainCharacter.x < eachGarlic.x + eachGarlic.w/1.5 &&
      mainCharacter.x + mainCharacter.w/1.5 > eachGarlic.x &&
      mainCharacter.y < eachGarlic.y + eachGarlic.h/1.5 &&
      mainCharacter.y + mainCharacter.h > eachGarlic.y && mainCharacter.points < 500
    ) {
      // Collision detected!
      
        mainCharacter.life -= 20
      
      
      lifeNode.innerHTML = `LIFE : 0${mainCharacter.life}`
      //borrar el elemento del dom
      garlicArr[index].node.remove()
      garlicArr.splice(index,1);
      
      if(mainCharacter.life === 0){
        clearTimeout(afterJumpTimeOutId)
        setTimeout(gameOver,2500);
        musicGameOverNode.play()
        mainCharacter.node.src = "../resources/mainCharDying3.gif"
        gameBoxNode.removeEventListener("click",handleClickJump)
        window.removeEventListener("keydown", handleArrow)
        
        
      } else {
        garlicAudioNode.play()
        mainCharacter.node.src = "../resources/mainCharDamaged.gif"
        setTimeout(()=>{
        mainCharacter.node.src = "../resources/mainChar2.gif"
        }, 200);
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



function handleClickJump(){
  if(mainCharacter.y >= 100){mainCharacter.jump();}
  
  mainCharacter.node.src = "../resources/mainCharJumpingRe.gif"
  afterJumpTimeOutId = setTimeout(()=>{
    mainCharacter.node.src = "../resources/mainChar2.gif"
  }, 650);
}




function handleArrow(event){
  switch(event.key){
    case "ArrowRight":
      if(mainCharacter.x <= gameBoxNode.offsetWidth-150){
        mainCharacter.x +=10
      //lo ajustamos en el DOM
      mainCharacter.node.style.left = `${mainCharacter.x}px`
      }
      break;
    case "ArrowLeft":
      if(mainCharacter.x >= 100){
        mainCharacter.x -=10
      //lo ajustamos en el DOM
      mainCharacter.node.style.left = `${mainCharacter.x}px`
      }
      break;
    case "ArrowUp":
      mainCharacter.jump();
  mainCharacter.node.src = "../resources/mainCharJumpingRe.gif"
 
  afterJumpTimeOutId = setTimeout(()=>{
    mainCharacter.node.src = "../resources/mainChar2.gif"
  }, 650);
  break;
  };
}


//sound button musicGameNode

musicGameButtonNode.addEventListener("click", ()=>{
  
 if(isSound === true){
  musicGameNode.pause()
  isSound = false
  musicGameButtonNode.src = "./resources/no-sound.png"
 } else {
  musicGameNode.play()
  isSound = true
  musicGameButtonNode.src = "./resources/sound.png"
 }
})

