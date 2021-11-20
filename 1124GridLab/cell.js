function Cell(x,y,scale,color1,color2,isSelected,ctxArr){
  this.pos = new JSVector(x,y);
  this.scale = scale;
  this.isSelected = isSelected;
  this.color1 = color1;
  this.color2 = color2;
  this.color = this.isSelected?this.color1:this.color2;
  this.ctxArr = ctxArr;
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
  let index = c + r*world.dimensions.x/this.scale;
}

Cell.prototype.update = function(){
  this.color = this.isSelected?this.color1:this.color2;
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
    let x = this.pos.x + this.scale/4;
    let y = this.pos.y + this.scale*2/5;
    ctx.fillStyle = "black";
    ctx.fillText("Row: " + r,x,y);
    ctx.fillText("Col: " + c,x,y+this.scale/5);
  }
}
