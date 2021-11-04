window.addEventListener("load", init);

var ctx1,ctx2,cnv1,cnv2,maze,cnvPos;

window.addEventListener("keydown", function(event){
  let speed = 5;
  if(event.code==="KeyW"){
    cnvPos.y-=speed;
  }
  else if(event.code==="KeyS"){
    cnvPos.y+=speed;
  }
  if(event.code==="KeyA"){
    cnvPos.x-=speed;
  }
  else if(event.code==="KeyD"){
    cnvPos.x+=speed;
  }
});

function init(){

  cnv1 = document.getElementById("cnv1");
  let worldW = 1000;
  let worldH = 1000;
  //
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
  let xOffset = cnvPos.x;
  let yOffset = cnvPos.y;
  maze.draw(xOffset,yOffset);
}
