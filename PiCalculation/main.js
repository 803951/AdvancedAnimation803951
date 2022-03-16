window.addEventListener("load",init);

var cnv,ctx;
var label;
var label_t;
var grid,sticks;
var cellSize;
var success,total;

function init(){

  cnv = document.getElementById("cnv");
  ctx = cnv.getContext("2d");
  label = document.getElementById("label");
  label_t = document.getElementById("total");
  cellSize = 1;
  success = 0;
  total = 0;

  resetGrid(cellSize);
  animate();
}

function animate(){
  update();

  requestAnimationFrame(animate);
}

function update(){
  generateSticks(500,cellSize);
  let pi = 2.0/(success/total);
  label.innerHTML = "Pi Estimate: "+pi;
  label_t.innerHTML = "Total Simulations:" +total;
}

function resetGrid(cellSize){
  grid = [];
  sticks = [];
  let r = cnv.height/cellSize;
  let c = cnv.width/cellSize;
  let clr = new Color(0,0,0,1);

  for(var j = 0;j<=r;j++){
    let x = -cellSize;
    let y = j*cellSize;
    let angle = 0;

    let border = new Wall(ctx,x,y,angle,cnv.width+cellSize,clr)
    grid.push(border);
  }

  for(var i = 0;i<grid.length;i++){
    grid[i].displayLine();
  }
}

function generateSticks(n,cellSize){
  let clr = new Color(0,0,255,1);

  for(var i = 0;i<n;i++){
    let x = Math.random()*cnv.width;
    let y = Math.random()*cnv.height;
    let angle = Math.random()*Math.PI*2;

    let stick = new Wall(ctx,x,y,angle,cellSize,clr)

    for(var k = 0;k<this.grid.length;k++){
      if(this.grid[k].isColliding(stick)){
        stick.clr = new Color(255,0,0,1);
        success++;
        break;
      }
    }

    stick.displayLine();

    sticks.push(stick)
    total++;
  }
}
