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
      this.gridBoxes.push(gridBox);
    }
  }
  console.log(this.gridBoxes);
}

Maze.prototype.draw = function(){
  this.displayGrid();
}

Maze.prototype.displayGrid = function(){
  for(var i = 0;i<this.gridBoxes.length;i++){
    this.gridBoxes[i].draw(this.color.toString());
  }
}
