window.addEventListener("load", init);

var canvas,context,radius,balls,partition,grid;

function init(){
  canvas = document.getElementById("cnv");
  context = canvas.getContext("2d");
  radius = 4;
  partition = document.getElementById("collisionHandler");
  partition.checked = true;
  balls = [];
  grid = [];
  createRandomBalls(1000);
  animate();
}

function resetGrid(){
  context.clearRect(0,0,canvas.width,canvas.height);

  grid.splice(0, grid.length);

  let h = Math.floor(canvas.height/(radius*2));
  let w = Math.floor(canvas.width/(radius*2));
  for(var i = 0;i<w*h;i++){
    grid.push([]);
  }
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

function gridIndex(x,y){
  let xIndex = Math.floor(x/(radius*2));
  let yIndex = Math.floor(y/(radius*2));
  return yIndex*canvas.width/(radius*2)+xIndex;
}

function compareToPartition(ball_i,grid_i,action){
  if(grid[grid_i]===undefined){
     console.log(action);
     return;
  }
  for(var i = 0;i<grid[grid_i].length;i++){
    if(balls[ball_i]===grid[grid_i][i]) continue;
    if(balls[ball_i].checkForCollision(grid[grid_i][i])){
      balls[ball_i].setOverlapping(true);
      grid[grid_i][i].setOverlapping(true);
      grid[grid_i][i].colorSet = true;
    }
  }
}

function assignBallBins(){
  for(var i = 0;i<balls.length;i++){
    grid[gridIndex(balls[i].x,balls[i].y)].push(balls[i]);
  }
}

function calculateCollisions(){
  if(partition.checked){
    assignBallBins();
    let w = Math.floor(canvas.width/(radius*2));
    for(var i = 0;i<balls.length;i++){
      if(!balls[i].colorSet) balls[i].setOverlapping(false);
      let grid_i = gridIndex(balls[i].x,balls[i].y);

      compareToPartition(i,grid_i,"center"); //center

      if(grid_i%w!=0){
        compareToPartition(i,grid_i-1,"left"); //left
        if(grid_i-w>=0)compareToPartition(i,grid_i-w-1,"top left"); //top left
        if(grid_i+w-1<=grid.length-1) compareToPartition(i,grid_i+w-1,"bottom left"); //bottom left
      }
      if((grid_i+1)%w!=0){
        compareToPartition(i,grid_i+1,"right"); //right
        if(grid_i-w>=0) compareToPartition(i,grid_i-w+1,"top right"); //top right
        if(grid_i+w+1<=grid.length-1)compareToPartition(i,grid_i+w+1,"bottom right"); //bottom right
      }

      if(grid_i+w<=grid.length-1) compareToPartition(i,grid_i+w,"bottom"); //bottom
      if(grid_i-w>=0) compareToPartition(i,grid_i-w,"top"); //top
      balls[i].colorSet = false;
    }
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

function displayInformation(time){
  context.font = "20px Comic Sans MS";
  context.fillStyle = "black";
  context.textAlign = "left";
  context.fillText("Calculation Time: "+(performance.now()-time).toFixed(5), 10, 30);
  context.fillText("Comparisons: "+Comparisons.totalComparisons, 10, 60);
}

function animate(){

  update();
  requestAnimationFrame(animate);
}

function update(){
  Comparisons.totalComparisons = 0;
  let time = performance.now();

  resetGrid();

  for(var i = 0;i<balls.length;i++){
    balls[i].update();
  }

  calculateCollisions();
  displayInformation(time);
}
