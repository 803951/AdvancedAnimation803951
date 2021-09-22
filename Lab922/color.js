function Color(r,g,b,a){
  this.r = r;
  this.g = g;
  this.b = b;
  this.a = a;
}

Color.prototype.toString = function(){
  return "rgb("+this.r+","+this.g+","+this.b+")";  // color to stroke
}
