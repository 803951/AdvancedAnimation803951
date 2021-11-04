window.addEventListener("load", init);

var ctx1,ctx2,cnv1,cnv2,maze,cnvPos,worldW,worldH,controls,canvasMover;

window.addEventListener("keydown", function(event){
  if(event.code==="KeyW"){
    controls.up = true;
    controls.down = false;
  }
  else if(event.code==="KeyS"){
    controls.down = true;
    controls.up = false;
  }
  if(event.code==="KeyA"){
    controls.left = true;
    controls.right = false;
  }
  else if(event.code==="KeyD"){
    controls.right = true;
    controls.left = false;
  }
});
window.addEventListener("keyup", function(event){
  if(event.code==="KeyW"){
    controls.up = false;
  }
  else if(event.code==="KeyS"){
    controls.down = false;
  }
  if(event.code==="KeyA"){
    controls.left = false;
  }
  else if(event.code==="KeyD"){
    controls.right = false;
  }
});

function init(){

  cnv1 = document.getElementById("cnv1");
  worldW = 3000;
  worldH = 3000;
  controls = {left:false,right:false,up:false,down:false};
  canvasMover = {vel:new JSVector(0,0),acc:0.2,maxSpeed:5};
  cnvPos = new JSVector(-worldW/2+cnv1.width/2,-worldH/2+cnv1.height/2);
  ctx1 = cnv1.getContext("2d");

  let lineColor = new Color(0,0,0,1);
  let gridIncrement = 100;
  maze = new Maze(0,0,worldW,worldH,gridIncrement,lineColor);
  animate();      // kick off the animation
}

function animate() {
  // erase the HTMLCanvasElement
  ctx1.clearRect(0,0,cnv1.width,cnv1.height);
  update();   // update location   // render
  requestAnimationFrame(animate); // next cycle
}
// move the circle to a new location
function update(){
  if(controls.up){
    canvasMover.vel.y+=canvasMover.acc;
  }
  else if(controls.down){
    canvasMover.vel.y-=canvasMover.acc;
  }
  else if(canvasMover.vel.y!=0){
    let sign = Math.abs(canvasMover.vel.y)/canvasMover.vel.y;
    canvasMover.vel.y-=sign*canvasMover.acc;
    if (sign!=Math.abs(canvasMover.vel.y)/canvasMover.vel.y){
      canvasMover.vel.y = 0;
    }
  }
  if(controls.left){
    canvasMover.vel.x+=canvasMover.acc;
  }
  else if(controls.right){
    canvasMover.vel.x-=canvasMover.acc;
  }
  else if(canvasMover.vel.x!=0){
    let sign = Math.abs(canvasMover.vel.x)/canvasMover.vel.x;
    canvasMover.vel.x-=sign*canvasMover.acc;
    if (sign!=Math.abs(canvasMover.vel.x)/canvasMover.vel.x){
      canvasMover.vel.x = 0;
    }
  }

  if(canvasMover.vel.getMagnitude()>canvasMover.maxSpeed){
    canvasMover.vel.setMagnitude(canvasMover.maxSpeed);
  }

  cnvPos.x+=canvasMover.vel.x;
  cnvPos.y+=canvasMover.vel.y;

  let xOffset = cnvPos.x;
  let yOffset = cnvPos.y;
  maze.draw(xOffset,yOffset);
}
