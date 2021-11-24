function Cell(x,y,scale,color1,color2,colorStart,colorEnd,pathColor,isSelected,ctxArr){
  this.pos = new JSVector(x,y);
  this.scale = scale;
  this.isSelected = isSelected;
  this.color1 = color1;
  this.color2 = color2;
  this.colorStart = colorStart;
  this.colorEnd = colorEnd;
  this.pathColor = pathColor;
  this.ctxArr = ctxArr;
  this.isStart = false;
  this.isEnd = false;
  this.isPath = false;
  this.neighbors = {
    n:null,
    ne:null,
    nw:null,
    s:null,
    se:null,
    sw:null,
    e:null,
    w:null
  };
}

Cell.prototype.loadNeighbors = function(){
  let r = (this.pos.y+world.dimensions.y/2)/this.scale;
  let c = (this.pos.x+world.dimensions.x/2)/this.scale;
  let rowSize = world.dimensions.x/this.scale;
  let index = c + r*rowSize;

  let top = index<rowSize //check if in top row
  let bottom = index>=world.cells.length-rowSize //check if in bottom row
  let left = index%rowSize == 0 //checks if in first column
  let right = (index+1)%rowSize == 0 //checks if in last column

  if(!top){
    this.neighbors.n = world.cells[index-rowSize];
    if(!right){
      this.neighbors.ne = world.cells[index-rowSize+1];
    }
    if(!left){
      this.neighbors.nw = world.cells[index-rowSize-1];
    }
  }
  if(!bottom){
    this.neighbors.s = world.cells[index+rowSize];
    if(!right){
      this.neighbors.se = world.cells[index+rowSize+1];
    }
    if(!left){
      this.neighbors.sw = world.cells[index+rowSize-1];
    }
  }
  if(!right){
    this.neighbors.e = world.cells[index+1];
  }
  if(!left){
    this.neighbors.w = world.cells[index-1];
  }
}

Cell.prototype.update = function(){
  this.loadNeighbors();
  if(this.isStart){
    this.color = this.colorStart;
  }
  else if(this.isEnd){
    this.color = this.colorEnd;
  }
  else if(this.isPath){
    this.color = this.pathColor;
  }
  else{
    this.color = this.isSelected?this.color1:this.color2;
  }
}

Cell.prototype.draw = function(){
  for(var i = 0;i<this.ctxArr.length;i++){
    let ctx = this.ctxArr[i];
    ctx.fillStyle = this.color.toString();
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.fillRect(this.pos.x,this.pos.y,this.scale,this.scale);
    ctx.strokeRect(this.pos.x,this.pos.y,this.scale,this.scale);
    let r = (this.pos.y+world.dimensions.y/2)/this.scale;
    let c = (this.pos.x+world.dimensions.x/2)/this.scale;
    let index = c + r*world.dimensions.x/this.scale;
    let x = this.pos.x + this.scale/6;
    let y = this.pos.y + this.scale*2/5;
    ctx.fillStyle = "black";
    ctx.font = "10px serif";
    ctx.fillText("Row: " + r,x,y);
    ctx.fillText("Col: " + c,x,y+this.scale/5);
  }
}
