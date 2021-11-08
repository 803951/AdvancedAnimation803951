function Maze(x,y,w,h,gridIncrement,color){
  this.pos = new JSVector(x,y);
  this.scale = new JSVector(w,h);
  this.gridIncrement = gridIncrement;
  this.color = color;
  this.gridBoxes = [];
  for(var i = 0;i<=this.scale.x;i+=this.gridIncrement){
    for(var j = 0;j<=this.scale.y;j+=this.gridIncrement){
      let left = i==0;
      let right = true;
      let top = j==0;
      let bottom = true;
      let x = this.pos.x+i;
      let y = this.pos.y+j;
      let gridBox = new GridBox(left,right,top,bottom,x,y,this.gridIncrement);
      if((this.gridBoxes.length+1)%4==0) gridBox.visited = true;
      this.gridBoxes.push(gridBox);
    }
  }

  this.generateNewMaze();
}

Maze.prototype.draw = function(xOffset,yOffset){
  for(var i = 0;i<this.gridBoxes.length;i++){
    this.gridBoxes[i].draw(xOffset,yOffset,this.color.toString());
  }
  ctx1.lineWidth = 5;
  ctx1.strokeStyle = "red";
  ctx1.beginPath();
  ctx1.moveTo((this.pos.x+this.scale.x)/2+xOffset,yOffset);
  ctx1.lineTo((this.pos.x+this.scale.x)/2+xOffset,this.pos.y+this.scale.y+yOffset+this.gridIncrement);
  ctx1.moveTo(this.pos.x+xOffset,(this.pos.y+this.scale.y)/2+yOffset);
  ctx1.lineTo(this.pos.x+this.scale.x+xOffset+this.gridIncrement,(this.pos.y+this.scale.y)/2+yOffset);
  ctx1.stroke();

  ctx2.lineWidth = 5;
  ctx2.strokeStyle = "red";
  ctx2.beginPath();
  ctx2.moveTo((this.pos.x+this.scale.x)/2*cnv2.width/worldW,0);
  ctx2.lineTo((this.pos.x+this.scale.x)/2*cnv2.width/worldW,(this.pos.y+this.scale.y+this.gridIncrement)*cnv2.height/worldH);
  ctx2.moveTo(this.pos.x*cnv2.width/worldW,(this.pos.y+this.scale.y)/2*cnv2.height/worldH);
  ctx2.lineTo((this.pos.x+this.scale.x+this.gridIncrement)*cnv2.width/worldW,(this.pos.y+this.scale.y)/2*cnv2.height/worldH);
  ctx2.stroke();

  ctx2.strokeStyle = "blue";
  ctx2.strokeRect((this.pos.x-xOffset)*cnv2.width/worldW,-yOffset*cnv2.height/worldH,cnv1.width/worldW*cnv2.width,cnv1.height/worldH*cnv2.height);
}

Maze.prototype.generateNewMaze = function(){
  let currentIndex = Math.floor(Math.random()*this.gridBoxes.length);
  let randDirection = Math.random();
  if(randDirection<0.25){//left
    if(currentIndex%(this.scale.x/this.gridIncrement)!=0){
      let nextIndex = currentIndex - 1;
      return;
    }
  }
  if(randDirection<0.5){//right
    if(currentIndex%((this.scale.x-this.gridIncrement)/this.gridIncrement)!=0){
      let nextIndex = currentIndex + 1;
      return;
    }
  }
  if(randDirection<0.75){//up
    if(currentIndex>=this.scale.x/this.gridIncrement){
      let nextIndex = currentIndex - this.scale.x/this.gridIncrement;
      return;
    }
  }
  //down
  if(currentIndex<=this.gridBoxes.length-this.scale.x/this.gridIncrement){
    let nextIndex = currentIndex + this.scale.x/this.gridIncrement;
  }
}
