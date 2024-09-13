# TwifightGame
A simple-nice-dark-game

## [Play the Game!](https://patrinieto.github.io/TwifightGame/)

![Game Logo](https://ibb.co/cNZYnQ2)

![Game Logo](www.your-image-logo-here.com)

# Description

Twifight is a game about a little vampire, Vampi-Chan, who wants to get his teeth and enter the dark world.
The character must get his teeth by hunting seven bats in the cemetery, but he will have to be careful with the crosses and garlic.

# Main Functionalities

- main character moves to the right or left using the arrow keys on the keyboard.
- main character jumps by clicking the mouse on the game-screen
- everything pause and continue using the SpaceBar 


# Backlog Functionalities

- more levels relationated with the dark-world-growing-process

# Technologies used

-  HTML | CSS | Javascript | DOM Manipulation 

# States

- start-screen
- intro-box
- game-screen, with a game-box inside
- pause-screen
- outroScreenNode
- end-screen

# Proyect Structure

## main.js

- startIntro()
- startGame()
- gameLoop()
- gameOver()
- restartGame()
- addCloud()
- addBat()
- addGarlic()
- addCross()
- detectIfCloudOut()
- detectIfBatOut()
- detectIfGarlicOut()
- detectIfCrossOut()
- detectIfCupOut()
- detectIfCollWithBat()
- detectIfCollWithGarlic()
- detectIfCollWithCross()
- detectIfCollWithCup()
- handleClickJump()
- handleArrow()
- handleSpaceBar()
- pause()
- continuar()

## Garlic.js
- Garlic (delay) {
    this.delay
    this.x;
    this.y;
    this.w;
    this.h;
    this.speed;
    this.damage;
}
- automaticMovement () {}

## Cloud.js
- Cross (posY) {
    this.x;
    this.y = posY;
    this.w;
    this.h;
    this.speed;
}
- automaticMovement () {}

## BloodCup.js
- Cross () {
    this.x;
    this.y;
    this.w;
    this.h;
    this.speed;
    this.lifeBack;
}
- automaticMovement () {}

## Bat.js
- Bat (posY) {
    this.x;
    this.y = posY;
    this.w;
    this.h;
    this.speed;
    this.pointsGiven;
}
- automaticMovement () {}

## Cross.js

- Cross extends Garlic (delay) {
    super(delay)
    this.y;
    this.w;
    this.h; 
    this.damage;
    this.speed; 
}

## MainCharacter.js 

- MainCharacter () {
    this.x;
    this.y;
    this.w;
    this.h;
    this.life;
    this.points; 
    this.jumpSpeed;
    this.gravityForce;
    this.isJumping;
    this.isDead;
}
- gravity () {}
- jump () {}


# Extra Links 

### Sketch
[Figma very simple sketch](https://www.figma.com/design/szAl99az5T2fVT5XHQlYN4/Untitled?node-id=0-1&t=xn31OnPCywAdGC69-1)

### Trello
[Trello Kanban board](https://trello.com/invite/b/66e08746ad6a88669b971d96/ATTIce2d3dff652a65fcd4a21edb2c13a56c339D1225/twifght-kanban-template)

### Slides
[Simple presentation](https://docs.google.com/presentation/d/1Q2Qxuo_E1lLrtAxtwwlAficsv4i3p7mAIzZxiZ_pXcw/edit?usp=sharing)

## Deploy
[The Link for Deployed Twifight](https://patrinieto.github.io/TwifightGame/)
