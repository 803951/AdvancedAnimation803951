window.addEventListener("load", init);

var balls,canvas,context,velocity,radius,partitions;

function init(){

    canvas = document.getElementById("cnv");
    context = canvas.getContext("2d");
    radius = 20;
    velocity = 2;
    balls = [];
    partitions = [];

    createBalls(10);
    animate();      // kick off the animation
}
function randomVal(value){
    return Math.floor((value-1)*Math.random())+value/2;
}
//creates a certain number of balls
function createBalls(ballAmount){

  for(var i = 0;i<ballAmount;i++){
    let xPos = radius+Math.random()*(canvas.width-2*radius);
    let yPos = radius+Math.random()*(canvas.height-2*radius);

    let dxVal = (1-2*Math.round(Math.random()))*randomVal(velocity);
    let dyVal = (1-2*Math.round(Math.random()))*randomVal(velocity);

    let newBall = new Ball(xPos,yPos,dxVal,dyVal,radius,"blue","orange");
    balls.push(newBall);

  }

}
function partition(){
  partitions = [];
  let minPartitionSize = balls.length;//one partition so initial partition has all the balls

  let partition1 = new Partition(0,0,canvas.width/2,canvas.height/2);
  let partition2 = new Partition(canvas.width/2,0,canvas.width,canvas.height/2);
  let partition3 = new Partition(0,canvas.height/2,canvas.width/2,canvas.height);
  let partition4 = new Partition(canvas.width/2,canvas.height/2,canvas.width,canvas.height);

  partitions.push(partition1);
  partitions.push(partition2);
  partitions.push(partition3);
  partitions.push(partition4);
}
// every animation cycle
function animate() {
    // erase the HTMLCanvasElement
    context.clearRect(0,0,canvas.width,canvas.height);
    update();   // update location   // render
    requestAnimationFrame(animate); // next cycle
}
function ballsIntersecting(ball1,ball2){
  distX = ball1.x-ball2.x;
  distY = ball1.y-ball2.y;
  dist = Math.sqrt(distX*distX+distY*distY);
  return (dist <= ball1.r + ball2.r);
}
// move the circle to a new location
function update() {
  for(var i = 0;i<balls.length;i++){
    let isOverlapping = false;
    for(var k = i+1;k<balls.length;k++){
      if(k==i) continue;
      if(ballsIntersecting(balls[i],balls[k])){
        isOverlapping = true;
        balls[k].setOverlapping(true);
        break;
      }
    }
    if(!balls[i].colorUpdated)balls[i].setOverlapping(isOverlapping);
    balls[i].update();
  }
  partition();
  for(var i = 0;i<partitions.length;i++){
    partitions[i].draw();
  }
}
