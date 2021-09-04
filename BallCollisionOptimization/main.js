window.addEventListener("load", init);

var canvas,context,radius,balls,grid,sd,reset;

function init(){
  canvas = document.getElementById("cnv");
  context = canvas.getContext("2d");
  radius = 4;
  sd = 1;
  reset = false;
  balls = [];
  grid = [];
  createRandomBalls(1000);
  animate();
}

function resetGrid(){
  context.clearRect(0,0,canvas.width,canvas.height);

  grid.splice(0, grid.length);

  let h = Math.floor(canvas.height/(radius*Math.sqrt(2)));
  let w = Math.floor(canvas.width/(radius*Math.sqrt(2)));
  for(var i = 0;i<w*h;i++){
    grid.push([]);
  }
}
function setSD(val){
  sd = val;
  balls.splice(0,balls.length);
  resetGrid();
  createRandomBalls(1000);
}
//mu is mean, sigma^2 is variance
function generateGaussianNoise(mu,sigma){

  let epsilon = Number.EPSILON;
  let two_pi = 2.0*Math.PI;

  //initialize two random numbers
  var u1,u2;
  do{
    u1 = Math.random();
    u2 = Math.random();
  } while(u1<=epsilon);

  let mag = sigma*Math.sqrt(-2.0*Math.log(u1));
  let z0 = mag*Math.cos(two_pi*u2)+mu;
  let z1 = mag*Math.sin(two_pi*u2)+mu;

  return new JSVector(z0,z1);
}
function constrain(val,min,max){
  if(val<min) return min;
  if(val>max) return max;
  return val;
}
function createRandomBalls(n){
  for(var i = 0;i<n;i++){

    //mean of 0 and standard deviation of 1
    let pos = generateGaussianNoise(0,sd);
    //let x = ((pos.x+1)/2)*(canvas.width-2*radius)+radius;
    //let y = ((pos.y+1)/2)*(canvas.height-2*radius)+radius;

    //gaussian distribution

    let x = constrain(Math.abs((pos.x/4+1/2)*canvas.width),radius*2,canvas.width-2*radius);
    let y = constrain(Math.abs((pos.y/4+1/2)*canvas.height),radius*2,canvas.height-2*radius);

    //let x = canvas.width/2;
    //let y = canvas.height/2;
    //let x = Math.random()*(canvas.width-2*radius)+radius;
    //let y = Math.random()*(canvas.height-2*radius)+radius;
    let velocity = (pos.x*pos.y)/(2*sd);

    let direction = Math.random()*2*Math.PI;
    let ball = new Ball(x,y,velocity*Math.cos(direction),velocity*Math.sin(direction),r=radius,color1="blue",color2="orange");
    balls.push(ball);
  }
}

function gridIndex(pos){
  let xIndex = Math.floor(pos.x/(radius*Math.sqrt(2)));
  let yIndex = Math.floor(pos.y/(radius*Math.sqrt(2)));
  let index = Math.floor(yIndex*canvas.width/(radius*Math.sqrt(2))+xIndex);

  if(index>=grid.length) return grid.length-1;

  return index;
}

function compareToPartition(ball_i,grid_i){
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
    let index = gridIndex(balls[i].pos);
    grid[index].push(balls[i]);
  }
}

function calculateCollisions(){
  assignBallBins();
  let w = Math.floor(canvas.width/(radius*Math.sqrt(2)));
  for(var i = 0;i<balls.length;i++){
    if(!balls[i].colorSet) balls[i].setOverlapping(false);
    else{
      balls[i].colorSet = false;
      continue;
    }
    let grid_i = gridIndex(balls[i].pos);

    compareToPartition(i,grid_i); //center

    if(grid_i%w!=0){
      compareToPartition(i,grid_i-1); //left
      if(grid_i-w>=0)compareToPartition(i,grid_i-w-1); //top left
      if(grid_i+w-1<=grid.length-1) compareToPartition(i,grid_i+w-1); //bottom left
    }
    if((grid_i+1)%w!=0){
      compareToPartition(i,grid_i+1); //right
      if(grid_i-w>=0) compareToPartition(i,grid_i-w+1); //top right
      if(grid_i+w+1<=grid.length-1)compareToPartition(i,grid_i+w+1); //bottom right
    }

    if(grid_i+w<=grid.length-1) compareToPartition(i,grid_i+w); //bottom
    if(grid_i-w>=0) compareToPartition(i,grid_i-w); //top
    balls[i].colorSet = false;
  }
}

function animate(){

  update();
  requestAnimationFrame(animate);
}

function update(){
  Comparisons.totalComparisons = 0;

  resetGrid();

  for(var i = 0;i<balls.length;i++){
    balls[i].update();
  }

  calculateCollisions();
}
