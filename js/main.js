/* VARIABLES DE LÓGICA DEL JUEGO */
let pointsToWin = 700
let pixelsCharMove = 10
/* selectores del DOM */
//las 3 pantallas principales: 
const startScreenNode = document.querySelector("#start-screen");
const gameScreenNode = document.querySelector("#game-screen");
const endScreenNode = document.querySelector("#end-screen");
const  gameBoxNode = document.querySelector("#game-box");
const introScreenNode = document.querySelector("#intro-box");

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
let musicIntroGameNode = introScreenNode.querySelector("audio");

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
let frecGarlic = 6000
//variable almacen de Crosses
let crossArr = []
let frecCross = 7000

/* INTERVALOS DEL JUEGO*/ 
let intervalGameLoopId = null
let intervalBatsId = null
let intervalGarlic = null
let intervalCross = null
let afterJumpTimeOutId = null

function startIntro(){
  startScreenNode.style.display = "none"
  introScreenNode.style.display = "flex"
  introScreenNode.querySelector("img").src ="../resources/intro.gif"
  musicIntroGameNode.src = "../resources/audio/evil-cue-111895.mp3"
  musicIntroGameNode.play()
  setTimeout(startGame, 11300);
  
}

function startGame(){

  startScreenNode.style.display = "none"
  introScreenNode.style.display = "none"
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
//aqui tengo que añadir el audio de cross
  batAudioNode = gameBoxNode.querySelector("#audio-bat");
  garlicAudioNode = gameBoxNode.querySelector("#audio-garlic");

  //gameLoop()
  intervalGameLoopId = setInterval(()=>{
    gameLoop()
  }, Math.round(1000/60));
  musicGameNode.load();
  musicGameNode.play();

  /* We add the elements */ 
  //add bat elements 
  
  intervalBatsId = setInterval(()=>{
    addBat();
  }, frecBat);

  //add garlic elements 
  intervalGarlic = setInterval (()=>{
    addGarlic();
  },frecGarlic );

  //add cross elements
  intervalCross =  setInterval (()=>{
    addCross();
  },frecCross );

  /* mainCharacter jump() */

gameBoxNode.addEventListener("click", handleClickJump); 
window.addEventListener("keydown", handleArrow)  
}

function gameLoop(){
  //mainChar movement
  mainCharacter.gravity()
  //elements movement
  //bats
  batArr.forEach((eachBat)=>{
    eachBat.automaticMovement()
  });
  garlicArr.forEach((eachGarlic)=>{
    eachGarlic.automaticMovement()
  });
  crossArr.forEach((eachCross)=>{
    eachCross.automaticMovement()
  });

  /* detectar salida de elementos para no sobrecargar el sistema  
  estas funciones serán implementados en este main */ 
  detectIfBatOut()
  detectIfGarlicOut()
  detectIfCrossOut()

  /* detectar colisiones para quitar vida o dar puntos 
  estas funciones serán implementados en este main */ 
  detectIfCollWithBat()
  detectIfCollWithGarlic()
  detectIfCollWithCross()

}

function gameOver(){
  //clean the intervals
  musicGameNode.pause();
  clearInterval(intervalGameLoopId)
  clearInterval(intervalBatsId)
  clearInterval(intervalGarlic)
  clearInterval(intervalCross)
  
  
  
  //cleam game-box
  gameBoxNode.innerHTML = ""
  
  garlicArr = []
  batArr = []
  crossArr = []
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
  //calculamos un y random entre un salto y dos del personaje
  let posY = Math.floor(Math.random()*300)+ 100
  let newBat = new Bat(posY)
  batArr.push(newBat);
}

function addGarlic(){
  let delay = Math.floor(Math.random()*700) 
  let newGarlic = new Garlic(delay)
  garlicArr.push(newGarlic);
}

function addCross(){
  let delay = Math.floor(Math.random()*500) 
  let newCross = new Cross(delay)
  crossArr.push(newCross);
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
function detectIfCrossOut(){
  if(crossArr.length === 0){
    return
  }
  if(crossArr[0].x + crossArr[0].w <= 0){
    //we reove it from the dom
    crossArr[0].node.remove()
    //we remove it from js
    crossArr.shift();
    
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
    mainCharacter.y + mainCharacter.h/3 > eachBat.y &&
    mainCharacter.life > 0



   /*  mainCharacter.x < eachBat.x + eachBat.w &&
    mainCharacter.x + mainCharacter.w > eachBat.x &&
    mainCharacter.y < eachBat.y + eachBat.h &&
    mainCharacter.y + mainCharacter.h > eachBat.y */
  ) {
    // adjusted points in js and in dom
    
    //borrar el elemento de js y del dom
    batArr[index].node.remove()
    batArr.splice(index,1)
    
    if(mainCharacter.points === (pointsToWin-eachBat.pointsGiven)){
      mainCharacter.points += eachBat.pointsGiven
      pointsNode.innerHTML = `POINTS : 0${mainCharacter.points}`
      setTimeout(gameOver, 2500);
      
      musicGameWinNode.load()
      musicGameWinNode.play()
      mainCharacter.node.src = "../resources/mainCharVict.gif"
      gameBoxNode.removeEventListener("click", handleClickJump)
      window.removeEventListener("keydown", handleArrow)
      clearTimeout(afterJumpTimeOutId)
      
    } else if(mainCharacter.points < pointsToWin && mainCharacter.life > 0){
      mainCharacter.points += eachBat.pointsGiven
      pointsNode.innerHTML = `POINTS : 0${mainCharacter.points}`
      mainCharacter.node.src = "../resources/mainCharJumpingBatted.gif"
      setTimeout(()=>{
      mainCharacter.node.src = "../resources/mainChar2.gif"
      }, 200);
      batAudioNode.load()
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
      mainCharacter.y + mainCharacter.h > eachGarlic.y &&
      mainCharacter.points < pointsToWin
    ) {
      // Collision detected!
      
      let damage = garlicArr[index].damage
      //borrar el elemento del dom
      garlicArr[index].node.remove()
      garlicArr.splice(index,1);
      
      if (mainCharacter.isDead === false){
        if(mainCharacter.life === damage|| mainCharacter.life < damage){
          mainCharacter.life -= damage
          mainCharacter.isDead = true
          lifeNode.innerHTML = `LIFE : 000`
          setTimeout(gameOver,2500);
          musicGameOverNode.play()
          mainCharacter.node.src = "../resources/mainCharDying3.gif"
          gameBoxNode.removeEventListener("click",handleClickJump)
          window.removeEventListener("keydown", handleArrow)
          clearTimeout(afterJumpTimeOutId)
          
        } else if(mainCharacter.life > 0 && mainCharacter.points < 500){
          mainCharacter.life -= damage
          lifeNode.innerHTML = `LIFE : 0${mainCharacter.life}`
          garlicAudioNode.load()
          garlicAudioNode.play()
          mainCharacter.node.src = "../resources/mainCharDamaged.gif"
          setTimeout(()=>{
          mainCharacter.node.src = "../resources/mainChar2.gif"
          }, 200);
      }
      }
     } 
})
}
function detectIfCollWithCross(){
 //we do a forEach to get to eachCross
 crossArr.forEach((eachCross, index)=>{
  //we compare the mainChar with eachBat on screen to get collisions
  //collision logic from https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
  if (
    mainCharacter.x < eachCross.x + eachCross.w/2 &&
    mainCharacter.x + mainCharacter.w/2 > eachCross.x &&
    mainCharacter.y < eachCross.y + eachCross.h/2 &&
    mainCharacter.y + mainCharacter.h > eachCross.y &&
    mainCharacter.points < pointsToWin
  ) {
    // Collision detected!
    
    let damage = crossArr[index].damage
    //borrar el elemento del dom
    crossArr[index].node.remove()
    crossArr.splice(index,1);
    if (mainCharacter.isDead === false){
      if(mainCharacter.life === damage || mainCharacter.life < damage){
        mainCharacter.life -= damage
        mainCharacter.isDead = true
        lifeNode.innerHTML = `LIFE : 000`
        setTimeout(gameOver,2500);
        musicGameOverNode.play()
        mainCharacter.node.src = "../resources/mainCharDying3.gif"
        gameBoxNode.removeEventListener("click",handleClickJump)
        window.removeEventListener("keydown", handleArrow)
        clearTimeout(afterJumpTimeOutId)
        
      } else if(mainCharacter.life > 0 && mainCharacter.points < 500){
        mainCharacter.life -= damage
        lifeNode.innerHTML = `LIFE : 0${mainCharacter.life}`
        garlicAudioNode.play()
        mainCharacter.node.src = "../resources/mainCharDamaged.gif"
        setTimeout(()=>{
        mainCharacter.node.src = "../resources/mainChar2.gif"
        }, 200);
      }
    }
    
  } 
})
}

                           /*     SCREEN CHANGES  */

/* Add Event Listeners */ 
startButtonNode.addEventListener("click", ()=>{
  startIntro()
  
})

ReStartButtonNode.addEventListener("click", ()=>{
  restartGame()
}) 



function handleClickJump(){
  if(mainCharacter.y >= 100 && mainCharacter.isJumping === false){
    mainCharacter.jump();
    mainCharacter.isJumping = true
    mainCharacter.node.src = "../resources/mainCharJumpingRe.gif"
  afterJumpTimeOutId = setTimeout(()=>{
    mainCharacter.node.src = "../resources/mainChar2.gif"
    mainCharacter.isJumping = false
  }, 650); 
  } else {
    mainCharacter.isJumping = false

  }
  
  
}




function handleArrow(event){
  switch(event.key){
    case "ArrowRight":
      if(mainCharacter.x <= gameBoxNode.offsetWidth-150){
        mainCharacter.x += pixelsCharMove
      //lo ajustamos en el DOM
      mainCharacter.node.style.left = `${mainCharacter.x}px`
      mainCharacter.node.src = "../resources/mainChar2.gif"
      }
      break;
    case "ArrowLeft":
      if(mainCharacter.x >= 0){
        mainCharacter.x -= pixelsCharMove
      //lo ajustamos en el DOM
      mainCharacter.node.style.left = `${mainCharacter.x}px`
      //cambiamos la imagen cuando va para la izquierda
      mainCharacter.node.src = "../resources/mainCharLeft.gif"
      }
      break;
    case "ArrowUp":
      if(mainCharacter.y >= 100 && mainCharacter.isJumping === false){
        mainCharacter.jump();
        mainCharacter.isJumping = true
        mainCharacter.node.src = "../resources/mainCharJumpingRe.gif"
        afterJumpTimeOutId = setTimeout(()=>{
        mainCharacter.node.src = "../resources/mainChar2.gif"
        mainCharacter.isJumping = true
      }, 650);
      }  else {
        mainCharacter.isJumping = false
      }
    
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

