window.addEventListener("load", init);

document.addEventListener('keydown', function(event) {
  //space bar
  if(event.keyCode == 38) { //Player1 up: 38 Player 1 down: 40
    player1.pos.y+=speed;
  }
  else if(event.keyCode == 40){ //Player1 down
    player1.pos.y-=speed;
  }
  if(event.keyCode == 87){ //Player2 up
    player2.pos.y+=speed;
  }
  else if(event.keyCode == 83){ //Player2 down
    player2.pos.y-=speed;
  }
});

var cnv,ctx,player1,player2,ball,speed,background;

function init(){
  cnv = document.getElementById("cnv");
  ctx = cnv.getContext("2d");
  speed = 1;
  let w = 10;
  let h = 50;
  let color = new Color(255,255,255,1);
  player1 = new Paddle(w+10,cnv.height/2,w,h,color,cnv,ctx);
  player2 = new Paddle(cnv.width-10,cnv.height/2,w,h,color,cnv,ctx);
  ball = new Ball(0,0,0,0,10,new Color(255,255,255,1),ctx);

  background = new Color(0,0,0,1);
  ctx.fillStyle = background.toString();
  ctx.fillRect(0,0,cnv.width,cnv.height);

  animate();
}

function animate(){
  update();
  requestAnimationFrame(animate);
}

function update(){
  player1.draw();
  player2.draw();
  ball.draw();
}
