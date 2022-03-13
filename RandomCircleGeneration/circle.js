function Circle(x,y,rad,clr,ctx){
  this.pos = new JSVector(x,y);
  this.rad = rad;
  this.clr = clr;
  this.ctx = ctx;
}

Circle.generateRandomCircle = function(cornerX,cornerY,boundW,boundH,ctx){//assigns circle to random corner of bound box

  let scaleFactor = 1.5;
  let minR = (boundW<boundH)? boundW/scaleFactor:boundH/scaleFactor;
  let maxR = minR*1.5;
  let rad = minR + Math.random()*(maxR-minR);

  //let x = cornerX + boundW/2 + Math.sign(Math.random()-0.5)*(boundW/2-rad); //random left or right corner
  //let y = cornerY + boundH/2 + Math.sign(Math.random()-0.5)*(boundH/2-rad); //random top or bottom corner
  let x = cornerX + rad + Math.random()*(boundW-2*rad);
  let y = cornerY + rad + Math.random()*(boundH-2*rad);

  let clr = Color.generateRandomColor(0.1,0.1,2,false);

  return new Circle(x,y,rad,clr,ctx);
}

Circle.prototype.draw = function(){
  this.ctx.fillStyle = this.clr.toString();
  this.ctx.beginPath();
  this.ctx.arc(this.pos.x,this.pos.y,this.rad,0,Math.PI*2);
  this.ctx.fill();
}
