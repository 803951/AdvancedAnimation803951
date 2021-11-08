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
    this.drawWall(x,y,x,y+this.scale,color,ctx1);
  }
  if(this.rightWall){
    this.drawWall(x+this.scale,y,x+this.scale,y+this.scale,color,ctx1);
  }
  if(this.topWall){
    this.drawWall(x,y,x+this.scale,y,color,ctx1);
  }
  if(this.bottomWall){
    this.drawWall(x,y+this.scale,x+this.scale,y+this.scale,color,ctx1);
  }

  if(this.visited){
    this.fill(xOffset,yOffset,color,ctx1,1,1);
  }

  //mini display
  let xScale = cnv2.width/worldW;
  let yScale = cnv2.height/worldH;
  x = this.pos.x*xScale;
  y = this.pos.y*yScale;
  if(this.leftWall){
    this.drawWall(x,y,x,y+this.scale*yScale,color,ctx2);
  }
  if(this.rightWall){
    this.drawWall(x+this.scale*xScale,y,x+this.scale*xScale,y+this.scale*yScale,color,ctx2);
  }
  if(this.topWall){
    this.drawWall(x,y,x+this.scale*xScale,y,color,ctx2);
  }
  if(this.bottomWall){
    this.drawWall(x,y+this.scale*yScale,x+this.scale*xScale,y+this.scale*yScale,color,ctx2);
  }

  if(this.visited){
    this.fill(0,0,color,ctx2,xScale,yScale);
  }
}

GridBox.prototype.drawWall = function(startX,startY,endX,endY,color,ctx){
  ctx.lineWidth = 1;
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.moveTo(startX,startY);
  ctx.lineTo(endX,endY);
  ctx.stroke();
}

GridBox.prototype.fill = function(xOffset,yOffset,color,ctx,xScale,yScale){
  ctx.fillStyle = color;
  let x = this.pos.x+xOffset;
  let y = this.pos.y+yOffset;
  ctx.fillRect(x*xScale,y*yScale,this.scale*xScale,this.scale*yScale);
}
