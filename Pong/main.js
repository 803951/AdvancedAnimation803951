window.addEventListener("load", init);

var keysPressed = {};

document.addEventListener('keydown', function(event) {
  //space bar
  keysPressed[event.key] = true;
});

document.addEventListener('keyup', (event) => {
   delete keysPressed[event.key];
});

var cnv,ctx,player1,player2,score1,score2,ball,velMag,divider,speed,background;

function init(){
  cnv = document.getElementById("cnv");
  ctx = cnv.getContext("2d");
  speed = 7;
  let offset = 10;
  let w = 10;
  let h = 75;
  let color = new Color(255,255,255,1);
  player1 = new Paddle(offset,cnv.height/2-h/2,w,h,color,offset);
  player2 = new Paddle(cnv.width-w-offset,cnv.height/2-h/2,w,h,color,offset);
  score1 = new ScoreHandler(0,1,cnv.width/2-50,50,"40px Comic Sans MS","center",color);
  score2 = new ScoreHandler(0,1,cnv.width/2+50,50,"40px Comic Sans MS","center",color);

  let dir = 0;
  velMag = 5;
  ball = new Ball(cnv.width/2,cnv.height/2,Math.cos(dir)*velMag,Math.sin(dir)*velMag,10,color,0.2);

  w = 5
  divider = new Divider(cnv.width/2-w/2,10,0,50,w,30,cnv.width,cnv.height,color);

  background = new Color(0,0,0,1);

  animate();
}

function animate(){
  ctx.fillStyle = background.toString();
  ctx.fillRect(0,0,cnv.width,cnv.height);

  update();
  requestAnimationFrame(animate);
}

function update(){
  processInput();

  ctx.beginPath();
  divider.draw();
  ball.update();
  player1.update();
  player2.update();
  ctx.closePath();

  score1.display();
  score2.display();
}

function processInput(){
  if(keysPressed['w']) { //Player1 up 87
    player1.pos.y-=speed;
  }
  else if(keysPressed['s']){ //Player1 down 83
    player1.pos.y+=speed;
  }
  if(keysPressed['ArrowUp']){ //Player2 up 38
    player2.pos.y-=speed;
  }
  else if(keysPressed['ArrowDown']){ //Player2 down 40
    player2.pos.y+=speed;
  }
}
