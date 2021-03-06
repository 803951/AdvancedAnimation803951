var targetPos,playerSize;

function World(w,h,cellSize){

  this.dimensions = new JSVector(w,h);
  this.cnv1 = document.getElementById("cnv1");
  this.ctx1 = cnv1.getContext("2d");
  this.cnv2 = document.getElementById("cnv2");
  this.ctx2 = cnv2.getContext("2d");
  playerSize = 30;
  /*this.ctx1Pos = new JSVector(-this.cnv1.width/2-this.dimensions.x/2+cellSize/2,-this.cnv1.height/2-this.dimensions.y/2+cellSize/2);
  this.ctx1TargetPos = new JSVector(this.ctx1Pos.x,this.ctx1Pos.y);
  targetPos = new JSVector(-this.dimensions.x/2+playerSize,-this.dimensions.y/2+cellSize/2);*/

  this.ctx1Pos = new JSVector(-this.cnv1.width/2,-this.cnv1.height/2);
  this.ctx1TargetPos = new JSVector(this.ctx1Pos.x,this.ctx1Pos.y);
  targetPos = new JSVector(0,0);

  this.movementSpeed = 15*this.cnv2.width/this.dimensions.x;

  let ctxArr = [this.ctx1,this.ctx2];
  this.cellSize = cellSize;
  this.cells = this.generateNewGrid(this.cellSize,ctxArr);
  this.cnv2.addEventListener("click",function(event){
    let x = event.offsetX;
    let y = event.offsetY;
    let targetX = x-this.width/2;
    let targetY = y-this.height/2;
    targetPos.x = targetX;
    targetPos.y = targetY;
  });
  this.cells[0].buildMaze(this,0); //call recursive maze building function
  this.pathFinder = new PathFinder(this.cells);
  this.pathFinder.findPath(0,this.cells.length-1);
}

World.prototype.generateNewGrid = function(cellSize,ctxArr){
  let cells = [];
  let color = new Color(255,255,255,1);
  for(var j = -this.dimensions.x/2;j<this.dimensions.x/2;j+=cellSize){
    for(var i = -this.dimensions.y/2;i<this.dimensions.y/2;i+=cellSize){
      let selected = Math.random()<0.1; //10% chance of selection
      let cell = new Cell(i,j,cellSize,color,ctxArr);
      cells.push(cell);
    }
  }
  return cells;
}

World.prototype.update = function(){
  this.ctx1.clearRect(0,0,this.dimensions.x,this.dimensions.y);
  this.ctx2.clearRect(0,0,this.dimensions.x,this.dimensions.y);
  this.processInput();
  this.updatePosition();
  this.lerpPosition(0.18)
  this.updateGrid();
  this.draw();
}

World.prototype.updateGrid = function(){
  this.ctx1.save();
  this.ctx1.translate(-this.ctx1Pos.x,-this.ctx1Pos.y);
  this.ctx2.save();

  let xScale = this.cnv2.width/this.dimensions.x;
  let yScale = this.cnv2.height/this.dimensions.y;

  this.ctx2.scale(xScale,yScale);
  this.ctx2.translate(this.dimensions.x/2,this.dimensions.y/2);

  //Cell update and drawing methods
  for(var i = 0;i<this.cells.length;i++){
    let cell = this.cells[i];
    let minX = this.ctx1Pos.x;
    let minY = this.ctx1Pos.y;
    if(controls.performance){
      if(cell.pos.x<minX-this.cellSize||cell.pos.x>minX+this.cnv1.width) continue;
      if(cell.pos.y<minY-this.cellSize||cell.pos.y>minY+this.cnv1.height) continue;
    }
    cell.draw();
  }

  this.ctx1.restore();
  this.ctx2.restore();
}

World.prototype.processInput = function(){

  let delta = new JSVector(0,0);
  if(controls.up){
    delta.y -= this.movementSpeed;
  }
  else if(controls.down){
    delta.y += this.movementSpeed;
  }
  if(controls.left){
    delta.x -= this.movementSpeed;
  }
  else if(controls.right){
    delta.x += this.movementSpeed;
  }

  if(delta.getMagnitude()>0) delta.setMagnitude(this.movementSpeed);
  targetPos.add(delta);
}

World.prototype.updatePosition = function(){

  targetPos.x = this.clamp(targetPos.x,-this.cnv2.width/2,this.cnv2.width/2);
  targetPos.y = this.clamp(targetPos.y,-this.cnv2.height/2,this.cnv2.height/2);

  let x = targetPos.x*this.dimensions.x/this.cnv2.width-this.cnv1.width/2;//+this.cellSize/2;
  let y = targetPos.y*this.dimensions.y/this.cnv2.height-this.cnv1.height/2;//+this.cellSize/2;

  this.ctx1TargetPos.x = x;
  this.ctx1TargetPos.y = y;
}

World.prototype.lerpPosition = function(scale){
  let diff = JSVector.subGetNew(this.ctx1TargetPos,this.ctx1Pos);
  let mag = diff.getMagnitude();
  diff.setMagnitude(mag*scale);
  this.ctx1Pos.add(diff);

}
World.prototype.clamp = function clamp(val,min,max){
  return val>max?max:(val<min?min:val);
}
World.prototype.draw = function(){
  this.ctx1.lineWidth = 4;
  this.ctx1.strokeStyle = "black";
  this.ctx1.save();
  this.ctx1.translate(-this.ctx1Pos.x,-this.ctx1Pos.y);
  this.ctx1.strokeRect(-this.dimensions.x/2,-this.dimensions.y/2,this.dimensions.x,this.dimensions.y);
  this.ctx1.restore();
  this.ctx1.beginPath();
  //this.ctx1.arc(this.cnv1.width/2,this.cnv1.height/2,playerSize,0,2*Math.PI);
  //this.ctx1.fillStyle = "red";
  //this.ctx1.fill();

  let xScale = this.cnv2.width/this.dimensions.x;
  let yScale = this.cnv2.height/this.dimensions.y;

  this.ctx2.save();
  this.ctx2.scale(xScale,yScale);
  this.ctx2.translate(this.dimensions.x/2,this.dimensions.y/2);
  this.ctx2.strokeStyle = "black";
  this.ctx2.lineWidth = 5;
  this.ctx2.strokeRect(this.ctx1Pos.x, this.ctx1Pos.y, this.cnv1.width, this.cnv1.height);
  this.ctx2.beginPath();
  //this.ctx2.arc(this.ctx1Pos.x+this.cnv1.width/2,this.ctx1Pos.y+this.cnv1.height/2,playerSize,0,2*Math.PI);
  //this.ctx2.fillStyle = "red";
  //this.ctx2.fill();
  this.ctx2.restore();
}
