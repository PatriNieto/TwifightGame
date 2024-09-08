
/* selectores del DOM */
//las 3 pantallas principales: 
const startScreenNode = document.querySelector("#start-screen");
const gameScreenNode = document.querySelector("#game-screen");
const endScreenNode = document.querySelector("#end-screen");

//botones
const startButtonNode = document.querySelector("#start-button");
const ReStartButtonNode = document.querySelector("#restart-button");

function startGame(){
  startScreenNode.style.display = "none"
  gameScreenNode.style.display = "flex"
}

function restartGame(){
  endScreenNode.style.display = "none"
  gameScreenNode.style.display = "flex"
}





/* Add Event Listeners */

/* PASAR A SIGUIENTE PANTALLA */ 

startButtonNode.addEventListener("click", ()=>{
  startGame()
})

ReStartButtonNode.addEventListener("click", ()=>{
  restartGame()
}) 

