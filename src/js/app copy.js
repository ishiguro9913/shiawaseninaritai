require('../css/app.css');
require('../scss/style.scss');

import { init, Sprite, SpriteSheet, GameLoop, initKeys, keyPressed } from "kontra";

let { canvas } = init();
initKeys();

const maxUp = 25;
const gravityY = 1;
const jumpPower = 3;

const scoreTextBox = document.getElementById("score");
const helpMessage = document.getElementById("help-message")

let upScore = 0;
let distance = 0;

let isOver = false;
let loop;
let blockSpeed = 3;

function updateScore() {
  scoreTextBox.innerHTML = Math.floor(distance);
}

function jump(sprite) {
  upScore++;

  if(upScore < maxUp) {
    sprite.playAnimation("jump");
    sprite.y -= jumpPower;
  }
}

function stopJump(sprite) {
  upScore = maxUp;
}

function jumpCoolOff(sprite) {
  sprite.playAnimation("walk");
  upScore = 0;
}

function gravity(sprite) {
  sprite.y += gravityY;
}

let block = Sprite({
  x: canvas.width,
  y: canvas.height - 50,
  color: "#ff0",
  width: 30,
  height: 20,
  dx: -blockSpeed,
  anchor: {x: 1, y: 1}
});


let ground = Sprite({
  x: 0,
  y: canvas.height - 50,
  color: "#a0a0a0",
  width: canvas.width,
  height: 50
});

let image = new Image();
image.src = "images/character_walk_sheet.png";

image.onload = function() {

  let spriteSheet = SpriteSheet({
    image: image,
    frameWidth: 72,
    frameHeight: 97,
    animations: {
      walk: {
        frames: "0..9",
        frameRate: 30
      },
      jump: {
        frames: 1,
        frameRate: 1,
      }
    }
  });

  let player = Sprite({
    x: canvas.width / 2,
    y: 305,
    anchor: {x: 0.5, y: 0.5},

    animations: spriteSheet.animations
  });

  loop = GameLoop({
    update: function() {
      if(keyPressed("up")) {
        console.log("up");
        jump(player);
      } else {
        stopJump(player);
      }

      if(player.y < 305) {
        gravity(player);
      } else {
        jumpCoolOff(player);
      }

      
      player.update();
      block.update();

      if(block.x < 0) {
        block.x = canvas.width;
      }

      if(player.collidesWith(block)) {
        console.log("collide");
        distance = 0;

        isOver = true;

        loop.stop();
        helpMessage.innerHTML = "Restart: Press Enter Key";
        
      } else {
        distance += 0.2;
      }

      updateScore();

      if(Math.floor(distance) % 2 == 0) {
        block.dx = -Math.random() * blockSpeed - 3;
      }

      if(distance > 100) {
        isOver = true;
        loop.stop();
        helpMessage.innerHTML = "GAME CLEAR!!Restart: Press Enter Key";
      }

    },
    render: function() {
      player.render();
      ground.render();
      block.render();

    }
  });
  
  loop.start();
};

document.addEventListener("keyup", function(k) {
  if(isOver && k.code == "Enter") {
    loop.start();
    isOver = false;
    console.log("press enter key");

    block.x = canvas.width;
    helpMessage.innerHTML = "";

    distance = 0;
    
  }
});

