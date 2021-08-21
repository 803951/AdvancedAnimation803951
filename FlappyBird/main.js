var canvas, context,lastDateTime,deltaTime;
var birdY,radius,color,velocity,jumpSpeed,gravity;

window.addEventListener("load", init);
document.addEventListener('keydown', function(event) {
  //space bar
  if(event.keyCode == 32) {
    jump();
  }
});

function init(){
  canvas = document.getElementById("cnv");
  context = canvas.getContext("2d");
  birdY = canvas.height/2;
  radius = 10;
  color = "orange";
  velocity = 0;
  jumpSpeed = 5;
  gravity = 8;
  lastDateTime = new Date().getTime();
  deltaTime = 0;

  animate();
}

function animate(){
  context.clearRect(0,0,canvas.width,canvas.height);
  update();
  drawBird();
  drawObstacles();
  requestAnimationFrame(animate);
}
function update(){
  updateDeltaTime();
  birdY+=velocity;

  if(birdY-radius<=0){
    velocity = 0;
    birdY = radius;
  }
  else{
    velocity -= gravity*deltaTime;
  }
  console.log(velocity);
}
function jump(){
  velocity=jumpSpeed;
}
function drawBird(){
  context.beginPath();
  context.arc(canvas.width/2, canvas.height-birdY, radius, 0, 2 * Math.PI);
  context.fillStyle = color;     // color to stroke
  context.fill();     // render the fill
}
function drawObstacles(){

}
function updateDeltaTime(){
  deltaTime = (new Date().getTime()-lastDateTime)/1000;
  console.log(deltaTime);
  lastDateTime = new Date().getTime();
}
