var targetPos;

function World(w,h,cellSize){

  this.dimensions = new JSVector(w,h);
  this.cnv1 = document.getElementById("cnv1");
  this.ctx1 = cnv1.getContext("2d");
  this.cnv2 = document.getElementById("cnv2");
  this.ctx2 = cnv2.getContext("2d");
  this.pathSetter = document.getElementById("pathSetter");
  this.start = null;
  this.end = null;

  this.ctx1Pos = new JSVector(-this.cnv1.width/2,-this.cnv1.height/2);
  this.ctx1TargetPos = new JSVector(this.ctx1Pos.x,this.ctx1Pos.y);
  targetPos = new JSVector(0,0);
  this.movementSpeed = 15*this.cnv2.width/this.dimensions.x;

  let ctxArr = [this.ctx1];
  this.cellSize = cellSize;
  this.cells = this.generateNewGrid(this.cellSize,ctxArr);

  this.cnv1.addEventListener("click",function(event){
    let x = event.offsetX+world.ctx1Pos.x+world.dimensions.x/2;
    let y = event.offsetY+world.ctx1Pos.y+world.dimensions.y/2;
    if(x>world.dimensions.x||y>world.dimensions.y||x<0||y<0) return;
    let r = Math.floor(y/world.cellSize);
    let c = Math.floor(x/world.cellSize);
    let index = Math.round(c + r*world.dimensions.x/world.cellSize);
    switch(world.pathSetter.value){
      case "obstacle":
        world.cells[index].isSelected = !world.cells[index].isSelected;
        break;
      case "start":
        if(this.start!=null)this.start.isStart = false;
        this.start = world.cells[index];
        this.start.isStart = true;
        break;
      case "end":
        if(this.end!=null)this.end.isEnd = false;
        this.end = world.cells[index];
        this.end.isEnd = true;
        break;
    }
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
  let color1 = new Color(188,238,236,0.93); //selected cell
  let color2 = new Color(90,184,179,0.72); //unselected cell
  let colorStart = new Color(240,47,27,0.94); //red start color
  let colorEnd = new Color(97,240,145,0.94); //green end color
  let pathColor = new Color(235,203,135,0.92)
  for(var j = -this.dimensions.x/2;j<this.dimensions.x/2;j+=cellSize){
    for(var i = -this.dimensions.y/2;i<this.dimensions.y/2;i+=cellSize){
      let selected = Math.random()<0.1; //10% chance of selection
      let cell = new Cell(i,j,cellSize,color1,color2,colorStart,colorEnd,pathColor,selected,ctxArr);
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
  this.generatePath();
  this.draw();
  this.displayFPS();
}

World.prototype.generatePath = function(){
  if(this.start==null||this.end==null) return;
}

World.prototype.displayFPS = function(){
  this.ctx1.fillStyle = "black";
  this.ctx1.font = "30px serif";
  this.ctx1.fillText("FPS: "+Math.round(fps),10,30);
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
    cell.update();
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
  this.ctx2.strokeRect(this.ctx1Pos.x, this.ctx1Pos.y, this.cnv1.width, this.cnv1.height);
  this.ctx2.restore();

}

World.prototype.clamp = function clamp(val,min,max){
  return val>max?max:(val<min?min:val);
}
