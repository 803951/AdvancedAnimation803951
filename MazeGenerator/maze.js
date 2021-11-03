function Maze(x,y,w,h,gridIncrement,color){
  this.pos = new JSVector(x,y);
  this.scale = new JSVector(w,h);
  this.gridIncrement = gridIncrement;
  this.color = color;
}

Maze.prototype.draw = function(){
  this.displayGrid();
}

Maze.prototype.displayGrid = function(){
  ctx.lineWidth = 1;
  ctx.strokeStyle = this.color.toString();
  //columns
  for(var x = this.pos.x;x<=this.scale.x+this.pos.x;x+=this.gridIncrement){
    ctx.beginPath();
    ctx.moveTo(x,this.pos.y);
    ctx.lineTo(x,this.pos.y+this.scale.y);
    ctx.stroke();
    ctx.closePath();
  }
  //rows
  for(var y = this.pos.y;y<=this.scale.y+this.pos.y;y+=this.gridIncrement){
    ctx.beginPath();
    ctx.moveTo(this.pos.x,y);
    ctx.lineTo(this.pos.x+this.scale.x,y);
    ctx.stroke();
    ctx.closePath();
  }
}
