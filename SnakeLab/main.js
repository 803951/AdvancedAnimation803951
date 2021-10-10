window.addEventListener("load",init);

var cnv,ctx,snakes;

function init(){
  cnv = document.getElementById("cnv");
  ctx = cnv.getContext("2d");

  cnv.width = window.innerWidth*0.9;
  cnv.height = window.innerHeight*0.9;

  snakes = [];
  let n = 20; //number of snakes
  let r = 10; //radius of snake segments
  let dist = 5;
  for(var i = 0;i<n;i++){
    let length = Math.random()*150+50;
    let snake = Snake.generateRandomSnake(r,length/dist,length);
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
    for(var k = 0;k<snakes.length;k++){
      if(i==k) continue;
      if(i%4!=k%4){
        snakes[i].attract(snakes[k]);
      }
      else{
        snakes[i].repel(snakes[k]);
      }
    }
  }
}
