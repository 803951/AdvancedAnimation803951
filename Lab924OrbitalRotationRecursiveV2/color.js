function Color(r,g,b,a){
  this.r = r;
  this.g = g;
  this.b = b;
  this.a = a;
}

Color.generateRandomColor = function(){
  return new Color(Math.random()*255,Math.random()*255,Math.random()*255,1);
}

Color.prototype.toString = function(){
  return "rgb("+this.r+","+this.g+","+this.b+","+this.a+")";  // color to stroke
}
