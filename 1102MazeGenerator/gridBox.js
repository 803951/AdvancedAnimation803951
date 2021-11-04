function GridBox(leftWall,rightWall,topWall,bottomWall,x,y,scale){
  this.leftWall = leftWall;
  this.rightWall = rightWall;
  this.topWall = topWall;
  this.bottomWall = bottomWall;
  this.pos = new JSVector(x,y);
  this.scale = scale;
  this.visited = false; //checks if maze generator has visited this cell yet
}

GridBox.prototype.draw = function(xOffset,yOffset,color){
  let x = this.pos.x+xOffset;
  let y = this.pos.y+yOffset;
  if(this.leftWall){
    this.drawWall(x,y,x,y+this.scale,color);
  }
  if(this.rightWall){
    this.drawWall(x+this.scale,y,x+this.scale,y+this.scale,color);
  }
  if(this.topWall){
    this.drawWall(x,y,x+this.scale,y,color);
  }
  if(this.bottomWall){
    this.drawWall(x,y+this.scale,x+this.scale,y+this.scale,color);
  }

  if(this.visited){
    this.fill(xOffset,yOffset,color);
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

GridBox.prototype.fill = function(xOffset,yOffset,color){
  ctx.fillStyle = color;
  let x = this.pos.x+xOffset;
  let y = this.pos.y+yOffset;
  ctx.fillRect(x,y,this.scale,this.scale);
}
