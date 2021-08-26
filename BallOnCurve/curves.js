class Curve{
  constructor(coefficients,size,color){
    this.canvas = document.getElementById("cnv");
    this.context = this.canvas.getContext("2d");
    this.coefficients = coefficients;
    this.size = size;
    this.color = color;
  }
  derivative = function(xVal){
    let newCoefficients = [];
    for(var i = 1;i<this.coefficients;i++){
      let newCoefficient = this.coefficients[i]*i;
      newCoefficients.push(newCoefficient);
    }
    return this.yReturnValue(xVal,newCoefficients);
  }
  yReturnValue = function(xVal,coefficients){
    let yVal = 0;
    for(var i = 0;i<coefficients.length;i++){
      let val = coefficients[i];
      for(var k = 0;k<i;k++){
        val*=xVal;
      }
      yVal+=val;
    }
    return yVal;
  }
  graph = function(increment,xMin,xMax){
    let points = [];
    for(var xVal = xMin;xVal<xMax;xVal+=increment){
      points.push({x:xVal,y:this.yReturnValue(xVal,this.coefficients)});
    }
    for(var i = 1;i<points.length;i++){
      this.context.strokeStyle = this.color;
      this.context.lineWidth = this.size;

      this.context.beginPath();
      this.context.moveTo(points[i-1].x+this.canvas.width/2,this.canvas.height-points[i-1].y);
      this.context.lineTo(points[i].x+this.canvas.width/2,this.canvas.height-points[i].y);
      this.context.stroke();
    }
  }
}
