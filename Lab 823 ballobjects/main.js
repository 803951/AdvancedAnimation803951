window.addEventListener("load", init);

var balls,canvas,context,velocity,radius,partition;

function init(){

    canvas = document.getElementById("cnv");
    context = canvas.getContext("2d");
    radius = 20;
    velocity = 2;
    balls = [];

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

    let newBall = new Ball(xPos,yPos,dxVal,dyVal,randomVal(radius),"blue","orange");
    balls.push(newBall);

  }

}
// every animation cycle
function animate() {
    // erase the HTMLCanvasElement
    context.clearRect(0,0,canvas.width,canvas.height);
    update();   // update location   // render
    requestAnimationFrame(animate); // next cycle
}
// move the circle to a new location
function update() {
  partition = new Partition(0,0,canvas.width,canvas.height,balls,4,50);
  partition.update();
}
