window.addEventListener("load", init);

var ctx,cnv,maze;

function init(){

  cnv = document.getElementById("cnv");
  ctx = cnv.getContext("2d");

  let lineColor = new Color(0,0,0,1);
  let gridIncrement = 50;
  maze = new Maze(0,0,cnv.width,cnv.height,gridIncrement,lineColor);
  animate();      // kick off the animation
}

function animate() {
  // erase the HTMLCanvasElement
  ctx.clearRect(0,0,cnv.width,cnv.height);
  update();   // update location   // render
  requestAnimationFrame(animate); // next cycle
}
// move the circle to a new location
function update() {
  maze.draw();
}
