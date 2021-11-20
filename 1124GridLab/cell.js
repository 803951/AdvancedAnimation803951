function Cell(x,y,w,h,color1,color2,isSelected,ctxArr){
  this.pos = new JSVector(x,y);
  this.scale = new JSVector(w,h);
  this.isSelected = isSelected;
  this.color = isSelected?color1:color2;
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

Cell.prototype.draw = function(){
  for(var i = 0;i<this.ctxArr.length.i++){
    let ctx = this.ctxArr[i];
    ctx.fillStyle = this.color.toString();
    ctx.fillRect(this.pos.x,this.pos.y,this.scale.x,this.scale.y);
  }
}
