window.addEventListener("load", init);

var keysPressed = {};

document.addEventListener('keydown', function(event) {
  //space bar
  keysPressed[event.key] = true;
});

document.addEventListener('keyup', (event) => {
   delete keysPressed[event.key];
});

var cnv,ctx,player1,player2,ball,speed,background;

function init(){
  cnv = document.getElementById("cnv");
  ctx = cnv.getContext("2d");
  speed = 7;
  let offset = 10;
  let w = 10;
  let h = 75;
  let color = new Color(255,255,255,1);
  player1 = new Paddle(offset,cnv.height/2-h/2,w,h,color,cnv,ctx,offset);
  player2 = new Paddle(cnv.width-w-offset,cnv.height/2-h/2,w,h,color,cnv,ctx,offset);

  let dir = (Math.random()*Math.PI*2);
  let velMag = 5;
  ball = new Ball(cnv.width/2,cnv.height/2,Math.cos(dir)*velMag,Math.sin(dir)*velMag,10,new Color(255,255,255,1),cnv,ctx);

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

  ball.update();
  player1.update();
  player2.update();
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
