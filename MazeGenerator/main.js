window.addEventListener("load", init);

var ctx,cnv,maze,cnvPos;

function init(){

  cnv = document.getElementById("cnv");
  let worldW = 1000;
  let worldH = 1000;
  cnvPos = new JSVector(0,-worldH+cnv.height);
  ctx = cnv.getContext("2d");

  let lineColor = new Color(0,0,0,1);
  let gridIncrement = 25;
  maze = new Maze(0,0,worldW,worldH,gridIncrement,lineColor);
  animate();      // kick off the animation
}

function animate() {
  // erase the HTMLCanvasElement
  ctx.clearRect(0,0,cnv.width,cnv.height);
  cnvPos.y+=1; //shift canvas
  update();   // update location   // render
  requestAnimationFrame(animate); // next cycle
}
// move the circle to a new location
function update(){
  let xOffset = cnvPos.x;
  let yOffset = cnvPos.y;
  maze.draw(xOffset,yOffset);
}
