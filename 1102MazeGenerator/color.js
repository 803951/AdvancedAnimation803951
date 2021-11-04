function Color(r,g,b,a){
  this.r = r;
  this.g = g;
  this.b = b;
  this.a = a; //sets transparency of color
}

Color.generateRandomColor = function(scaleR,scaleG,scaleB,grayScale){
  if(grayScale){ //generates gray scale
    let val = Math.random()*255;
    return new Color(val,val,val,1);
  }

  return new Color(Math.random()*255*scaleR,Math.random()*255*scaleG,Math.random()*255*scaleB,1); //returns random non BW color
}

Color.prototype.opposite = function(){
  return new Color(255-this.r,255-this.g,255-this.b,this.a); //returns oposite color
}

Color.prototype.toString = function(){
  return "rgb("+this.r+","+this.g+","+this.b+","+this.a+")";  // color to string for strokestyle
}
