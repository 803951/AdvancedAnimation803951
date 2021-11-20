var targetPos;

function World(w,h,cellSize){

  this.dimensions = new JSVector(w,h);
  this.cnv1 = document.getElementById("cnv1");
  this.ctx1 = cnv1.getContext("2d");
  this.zoomScale = new JSVector(1,1);
  this.cnv2 = document.getElementById("cnv2");
  this.ctx2 = cnv2.getContext("2d");

  this.ctx1Pos = new JSVector(-this.cnv1.width/2,-this.cnv1.height/2);
  this.ctx1TargetPos = new JSVector(this.ctx1Pos.x,this.ctx1Pos.y);
  targetPos = new JSVector(0,0);
  this.movementSpeed = 1;

  let ctxArr = [this.ctx1,this.ctx2];
  this.cellSize = cellSize;
  this.cells = this.generateNewGrid(this.cellSize,ctxArr);

  this.cnv1.addEventListener("click",function(event){
    let x = event.offsetX+world.ctx1Pos.x+world.dimensions.x/2;
    let y = event.offsetY+world.ctx1Pos.y+world.dimensions.y/2;
    if(x>world.dimensions.x||y>world.dimensions.y||x<0||y<0) return;
    let r = Math.floor(y/world.cellSize);
    let c = Math.floor(x/world.cellSize);
    let index = Math.round(c + r*world.dimensions.x/world.cellSize);
    world.cells[index].isSelected = !world.cells[index].isSelected;
  });

  this.cnv2.addEventListener("click",function(event){
    let x = event.offsetX;
    let y = event.offsetY;
    let targetX = x-this.width/2;
    let targetY = y-this.height/2;
    targetPos.x = targetX;
    targetPos.y = targetY;
  });
}

World.prototype.generateNewGrid = function(cellSize,ctxArr){
  let cells = [];
  let color1 = new Color(188,238,236,93); //selected cell
  let color2 = new Color(90,184,179,72); //unselected cell
  for(var j = -this.dimensions.x/2;j<this.dimensions.x/2;j+=cellSize){
    for(var i = -this.dimensions.y/2;i<this.dimensions.y/2;i+=cellSize){
      let selected = Math.random()<0.1; //10% chance of selection
      let cell = new Cell(i,j,cellSize,color1,color2,selected,ctxArr);
      cells.push(cell);
      let x = i + this.dimensions.x/2;
      let y = j + this.dimensions.y/2;
      let r = Math.floor(y/this.cellSize);
      let c = Math.floor(x/this.cellSize);
      let index = Math.round(c + r*this.dimensions.x/this.cellSize);
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
  this.ctx1.scale(this.zoomScale.x,this.zoomScale.y);
  this.ctx2.save();

  let xScale = this.cnv2.width/this.dimensions.x;
  let yScale = this.cnv2.height/this.dimensions.y;

  this.ctx2.scale(xScale,yScale);
  this.ctx2.translate(this.dimensions.x/2,this.dimensions.y/2);

  //Cell update and drawing methods
  for(var i = 0;i<this.cells.length;i++){
    this.cells[i].update();
    this.cells[i].draw();
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
  let zoomDelta = 0.01;
  if(controls.zoomIn){
    this.zoomScale.x*=1.01;
    this.zoomScale.y*=1.01;
  }
  if(controls.zoomOut){
    this.zoomScale.x/=1.01;
    this.zoomScale.y/=1.01;
  }

  if(delta.getMagnitude()>0) delta.setMagnitude(this.movementSpeed);
  targetPos.add(delta);
}

World.prototype.updatePosition = function(){

  targetPos.x = this.clamp(targetPos.x,-this.cnv2.width/2,this.cnv2.width/2);
  targetPos.y = this.clamp(targetPos.y,-this.cnv2.height/2,this.cnv2.height/2);

  let x = targetPos.x*this.dimensions.x/this.cnv2.width-this.cnv1.width/2;
  let y = targetPos.y*this.dimensions.y/this.cnv2.height-this.cnv1.height/2;

  this.ctx1TargetPos.x = x;
  this.ctx1TargetPos.y = y;
}

World.prototype.lerpPosition = function(scale){

  let diff = JSVector.subGetNew(this.ctx1TargetPos,this.ctx1Pos);
  let mag = diff.getMagnitude();
  diff.setMagnitude(mag*scale);
  this.ctx1Pos.add(diff);

}

World.prototype.draw = function(){

  let lineColor = new Color(0,0,0,1);
  this.ctx1.lineWidth = 4;
  this.ctx1.strokeStyle = lineColor.toString();
  this.ctx1.save();
  this.ctx1.translate(-this.ctx1Pos.x,-this.ctx1Pos.y);
  this.ctx1.scale(this.zoomScale.x,this.zoomScale.y);

  this.ctx1.beginPath();
  this.ctx1.moveTo(0,this.dimensions.y/2);
  this.ctx1.lineTo(0,-this.dimensions.y/2);
  this.ctx1.moveTo(this.dimensions.x/2,0);
  this.ctx1.lineTo(-this.dimensions.x/2,0);
  this.ctx1.stroke();
  this.ctx1.strokeRect(-this.dimensions.x/2,-this.dimensions.y/2,this.dimensions.x,this.dimensions.y);
  this.ctx1.restore();

  let xScale = this.cnv2.width/this.dimensions.x;
  let yScale = this.cnv2.height/this.dimensions.y;

  this.ctx2.save();
  this.ctx2.scale(xScale,yScale);
  this.ctx2.translate(this.dimensions.x/2,this.dimensions.y/2);
  this.ctx2.lineWidth = 5;
  this.ctx2.strokeStyle = lineColor.toString();
  this.ctx2.beginPath();
  this.ctx2.moveTo(0,this.dimensions.y/2);
  this.ctx2.lineTo(0,-this.dimensions.y/2);
  this.ctx2.moveTo(this.dimensions.x/2,0);
  this.ctx2.lineTo(-this.dimensions.x/2,0);
  this.ctx2.stroke();
  this.ctx2.strokeStyle = lineColor.toString();
  this.ctx2.strokeRect(this.ctx1Pos.x/this.zoomScale.x, this.ctx1Pos.y/this.zoomScale.y, this.cnv1.width/this.zoomScale.x, this.cnv1.height/this.zoomScale.x);
  this.ctx2.restore();

}

World.prototype.clamp = function clamp(val,min,max){
  return val>max?max:(val<min?min:val);
}
