window.addEventListener("load",init);

var cnv,ctx,snakes;

function init(){
  cnv = document.getElementById("cnv");
  ctx = cnv.getContext("2d");
  snakes = [];
  let n = 3;
  let r = 10
  let segments = 10;
  let length = 200;
  for(var i = 0;i<n;i++){
    let snake = Snake.generateRandomSnake(r,segments,length);
    snakes.push(snake);
  }

  animate();
}

function animate(){
  ctx.clearRect(0,0,cnv.width,cnv.height);
  update();

  requestAnimationFrame(animate);
}

function update(){
  for(var i = 0;i<snakes.length;i++){
    snakes[i].move();
    snakes[i].draw();
    if(i!=0) snakes[i].attract(snakes[0]);
  }
}
