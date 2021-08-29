window.addEventListener("load", init);

var canvas,context,radius,balls,partition,grid;

function init(){
  canvas = document.getElementById("cnv");
  context = canvas.getContext("2d");
  radius = 20;
  partition = document.getElementById("collisionHandler");
  partition.checked = true;
  totalComparisons = 0;
  balls = [];

  grid = [];
  let h = canvas.height/(radius*2);
  let w = canvas.width/(radius*2);
  for(var j = 0;j<h;j++){
    for(var i = 0;i<w;i++){
      grid.push([]);
    }
  }
  console.log(grid.length-w*h);

  createRandomBalls(10);

  animate();
}

function createRandomBalls(n){
  for(var i = 0;i<n;i++){
    let x = Math.random()*(canvas.width-2*radius)+radius;
    let y = Math.random()*(canvas.height-2*radius)+radius;
    let velocity = Math.random()*3+1;
    let direction = Math.random()*2*Math.PI;
    let ball = new Ball(x,y,velocity*Math.cos(direction),velocity*Math.sin(direction),r=radius,color1="blue",color2="orange");
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
  Comparisons.totalComparisons = 0;
  let time = performance.now();
  context.clearRect(0,0,canvas.width,canvas.height);
  for(var i = 0;i<balls.length;i++){
    balls[i].update();
  }
  calculateCollisions(false); // sequential default

  context.font = "20px Comic Sans MS";
  context.fillStyle = "black";
  context.textAlign = "left";
  context.fillText("Calculation Time: "+(performance.now()-time).toFixed(5), 10, 30);
  context.fillText("Comparisons: "+Comparisons.totalComparisons, 10, 60);
}
