window.addEventListener("load", init);

var canvas,context,radius,balls,partition;

function init(){
  canvas = document.getElementById("cnv");
  context = canvas.getContext("2d");
  radius = 20;
  partition = document.getElementById("collisionHandler");
  balls = [];

  createRandomBalls(10);

  animate();
}

function createRandomBalls(n){
  for(var i = 0;i<n;i++){
    let x = Math.random()*(canvas.width-2*radius)+radius;
    let y = Math.random()*(canvas.height-2*radius)+radius;
    let velocity = Math.random()*3+1;
    let direction = Math.random()*2*Math.PI;
    let ball = new Ball(x,y,velocity*Math.cos(direction),velocity*Math.sin(direction),r=20,color1="blue",color2="orange");
    balls.push(ball);
  }
}

function calculateCollisions(){
  if(partition.checked){

  }
  else{
    for(var i = 0;i<balls.length;i++){
      let isOverlapping = false;
      for(var k = 0;k<balls.length;k++){
        if(i==k) continue;
        if(balls[i].checkForCollision(balls[k])){
          balls[k].setOverlapping(true);
          isOverlapping = true;
          break;
        }
      }
      balls[i].setOverlapping(isOverlapping);
    }
  }
}

function animate(){

  update();

  requestAnimationFrame(animate);
}

function update(){
  let time = performance.now();
  context.clearRect(0,0,canvas.width,canvas.height);
  for(var i = 0;i<balls.length;i++){
    balls[i].update();
  }
  calculateCollisions(false); // sequential default
  console.log("Time difference: "+(performance.now()-time)); //calculate time of update
}
