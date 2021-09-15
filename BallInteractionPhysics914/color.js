function Color(r,g,b,a){
  this.r = r;
  this.g = g;
  this.b = b;
  this.a = a;
}
Color.prototype.lerp = function(dist,maxDist,minA){
  if(dist<=Number.EPSILON) return "rgb("+this.r+","+this.g+","+this.b+",1)"

  let alpha = 1- dist/maxDist;
  if(alpha<minA) alpha = minA;
  return "rgb("+this.r+","+this.g+","+this.b+","+alpha+")";
}
