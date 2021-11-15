window.addEventListener("load", init);

var ctx1,ctx2,cnv1,cnv2,maze,cnvPos,worldW,worldH,controls,canvasMover,gridIncrement,targetPos,isControlled;

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
  ctx1 = cnv1.getContext("2d");
  cnv2 = document.getElementById("cnv2");
  ctx2 = cnv2.getContext("2d");

  worldW = 2000;
  worldH = 2000;
  controls = {left:false,right:false,up:false,down:false};
  isControlled = false;
  canvasMover = {vel:new JSVector(0,0),acc:0.2,maxSpeed:5};
  let x = -worldW/2+cnv1.width/2;
  let y = -worldH/2+cnv1.height/2;
  cnvPos = new JSVector(x,y);
  targetPos = new JSVector(x,y); //set target position to current canvas position

  cnv2.addEventListener("click",function(event){
    let rect = cnv2.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    let targetX = x*(-worldW/cnv2.width);
    let targetY = y*(-worldH/cnv2.height);
    targetPos.x = targetX;
    targetPos.y = targetY;
  });

  let lineColor = new Color(0,0,0,1);
  gridIncrement = 100;
  maze = new Maze(0,0,worldW,worldH,gridIncrement,lineColor);
  animate();      // kick off the animation
}

function animate() {
  // erase the HTMLCanvasElement
  ctx1.clearRect(0,0,cnv1.width,cnv1.height);
  ctx2.clearRect(0,0,cnv2.width,cnv2.height);
  update();   // update location   // render
  requestAnimationFrame(animate); // next cycle
}
// move the circle to a new location
function update(){

  updateOffset();
  if(!isControlled){
    lerpPosition(0.18);
  }
  else{
    targetPos.x = cnvPos.x;
    targetPos.y = cnvPos.y;
  }

  maze.draw(cnvPos.x,cnvPos.y);
}

//set speedScale to number between 0 and 1 exclusive
//speedScale is fractional amount of distance traveled between each interpolation
function lerpPosition(speedScale){
  let diff = JSVector.subGetNew(targetPos,cnvPos);
  let mag = diff.getMagnitude();
  diff.setMagnitude(mag*speedScale);
  cnvPos.add(diff);
}

function updateOffset(){

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

  if(cnvPos.x+canvasMover.vel.x>=-worldW-gridIncrement*2+cnv1.width&&cnvPos.x+canvasMover.vel.x<=gridIncrement){
    cnvPos.x+=canvasMover.vel.x;
  }
  else{
    canvasMover.vel.x = 0;
  }
  if(cnvPos.y+canvasMover.vel.y>=-worldH-gridIncrement*2+cnv1.height&&cnvPos.y+canvasMover.vel.y<=gridIncrement){
    cnvPos.y+=canvasMover.vel.y;
  }
  else{
    canvasMover.vel.y = 0;
  }

  isControlled = canvasMover.vel.getMagnitude() > 0;
}
