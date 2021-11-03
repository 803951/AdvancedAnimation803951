function GridBox(leftWall,rightWall,topWall,bottomWall,x,y,scale){
  this.leftWall = leftWall;
  this.rightWall = rightWall;
  this.topWall = topWall;
  this.bottomWall = bottomWall;
  this.pos = new JSVector(x,y);
  this.scale = scale;
  this.visited = false; //checks if maze generator has visited this cell yet
}

GridBox.prototype.draw = function(color){
  if(this.leftWall){
    this.drawWall(this.pos.x,this.pos.y,this.pos.x,this.pos.y+this.scale,color);
  }
  if(this.rightWall){
    this.drawWall(this.pos.x+this.scale,this.pos.y,this.pos.x+this.scale,this.pos.y+this.scale,color);
  }
  if(this.topWall){
    this.drawWall(this.pos.x,this.pos.y,this.pos.x+this.scale,this.pos.y,color);
  }
  if(this.bottomWall){
    this.drawWall(this.pos.x,this.pos.y+this.scale,this.pos.x+this.scale,this.pos.y+this.scale,color);
  }

  if(this.visited){
    this.fill(color);
  }
}

GridBox.prototype.drawWall = function(startX,startY,endX,endY,color){
  ctx.lineWidth = 1;
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.moveTo(startX,startY);
  ctx.lineTo(endX,endY);
  ctx.stroke();
}

GridBox.prototype.fill = function(color){
  ctx.fillStyle = color;
  ctx.fillRect(this.pos.x,this.pos.y,this.scale,this.scale);
}
