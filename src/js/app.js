require('../css/app.css');
require('../scss/style.scss');

import { init, Sprite, SpriteSheet, GameLoop, initKeys, keyPressed } from "kontra";

let { canvas } = init();

const image = new Image();
image.src = 'images/test.png';

const backimage = new Image();
backimage.src = 'images/shiawase.png';

let sprite = Sprite({
  image: image, 
  x: 10,
  y: 20,
  color: "red",
  width: 90,
  height: 50,
  dx: 2
}); 

let button = Sprite({ 
  image: backimage,
  x: 100,
  y: 20,
  width: 100,
  height: 100,

});

document.getElementById("text-button").onclick = function() {
  document.getElementById("text").innerHTML = "ストップした！";
  loop.stop();

  console.log(sprite.x)

  if(90 < sprite.x && sprite.x < 120) {
    document.getElementById("result").innerHTML = "すごい！"; 
  } else {
    document.getElementById("result").innerHTML = "だめだ！";  
  }
};

let loop = GameLoop({
  update: function() {
    sprite.update();
    button.update();

    if(sprite.x > canvas.width) {
      sprite.x = -sprite.width;
    }

  },
  render: function() {
    sprite.render();
    button.render();

  }
});

loop.start();