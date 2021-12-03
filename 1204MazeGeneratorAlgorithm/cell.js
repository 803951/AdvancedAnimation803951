function Cell(x,y,scale,color,ctxArr){
  this.pos = new JSVector(x,y);
  this.scale = scale;
  this.color = color;
  this.ctxArr = ctxArr;
  this.connectedTo = null;
  this.visited = false;
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
  this.walls = {
    n:true,
    s:true,
    w:true,
    e:true
  }
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
}

Cell.prototype.draw = function(){
  for(var i = 0;i<this.ctxArr.length;i++){
    let ctx = this.ctxArr[i];
    ctx.fillStyle = this.color.toString();
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.fillRect(this.pos.x,this.pos.y,this.scale,this.scale);
    if(this.walls.n){
      ctx.beginPath();
      ctx.moveTo(this.pos.x,this.pos.y);
      ctx.lineTo(this.pos.x+this.scale,this.pos.y);
      ctx.stroke();
    }
    if(this.walls.s){
      ctx.beginPath();
      ctx.moveTo(this.pos.x,this.pos.y+this.scale);
      ctx.lineTo(this.pos.x+this.scale,this.pos.y+this.scale);
      ctx.stroke();
    }
    if(this.walls.w){
      ctx.beginPath();
      ctx.moveTo(this.pos.x,this.pos.y);
      ctx.lineTo(this.pos.x,this.pos.y+this.scale);
      ctx.stroke();
    }
    if(this.walls.e){
      ctx.beginPath();
      ctx.moveTo(this.pos.x+this.scale,this.pos.y);
      ctx.lineTo(this.pos.x+this.scale,this.pos.y+this.scale);
      ctx.stroke();
    }
  }
}
