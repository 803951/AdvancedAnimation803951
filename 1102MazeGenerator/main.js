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
  ctx1 = cnv1.getContext("2d");
  cnv2 = document.getElementById("cnv2");
  ctx2 = cnv2.getContext("2d");
  let runSimulation = false;
  if(runSimulation){
    cnv1.width = window.innerWidth*0.9;
    cnv1.height = window.innerHeight*0.9;
    let totalStudents = 30;
    let trials = 1000;
    let results = [];
    for(var i = 0;i<=totalStudents;i++){
      results.push(0);
    }
    for(var i = 0;i<trials;i++){
      let counter = 0;
      for(var j = 0;j<totalStudents;j++){
        if(Math.random()<1/6) counter++;
      }
      results[counter]++;
    }

    for(var i = 0;i<results.length;i++){
      let width = cnv1.width*0.9/results.length;
      let height = (results[i]/(trials/2))*cnv1.height;
      let x = i*width;
      let y = cnv1.height - height;
      ctx1.fillStyle = "black";
      ctx1.fillRect(x,y-10,width,height);
      ctx1.fillText(i,x+width/2,cnv1.height);
    }
    return;
  }

  worldW = 2000;
  worldH = 2000;
  controls = {left:false,right:false,up:false,down:false};
  canvasMover = {vel:new JSVector(0,0),acc:0.2,maxSpeed:5};
  cnvPos = new JSVector(-worldW/2+cnv1.width/2,-worldH/2+cnv1.height/2);

  let lineColor = new Color(0,0,0,1);
  let gridIncrement = 100;
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
