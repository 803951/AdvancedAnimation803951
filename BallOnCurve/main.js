window.addEventListener("load", init);

var canvas, context, curves;

class Curve{
  constructor(coefficients,size,color){
    this.coefficients = coefficients;
    this.size = size;
    this.color = color;
  }
  graph = function(increment,xMin,xMax){
    let points = [];
    for(var xVal = xMin;xVal<xMax;xVal+=increment){
      let yVal = 0;
      for(var i = 0;i<this.coefficients.length;i++){
        let val = this.coefficients[i];
        for(var k = 0;k<i;k++){
          val*=xVal;
        }
        yVal+=val;
      }
      points.push({x:xVal,y:yVal});
    }
    for(var i = 1;i<points.length;i++){
      context.strokeStyle = this.color;
      context.lineWidth = this.size;

      context.beginPath();
      context.moveTo(points[i-1].x+canvas.width/2,canvas.height-points[i-1].y);
      context.lineTo(points[i].x+canvas.width/2,canvas.height-points[i].y);
      context.stroke();
    }
  }
}

function init(){
  canvas = document.getElementById("cnv");
  context = canvas.getContext("2d");
  curves = [];
  let coefficients1 = [5,0.1,0.01];
  let curve1 = new Curve(coefficients1,1,"black");
  curves.push(curve1);

  for(var i = 0;i<curves.length;i++){
    curves[i].graph(1,-300,300);
  }
  animate();
}
function animate(){

  requestAnimationFrame(animate);
}
