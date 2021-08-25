class Ball{
  constructor(x,y,radius,color){
    this.canvas = document.getElementById("cnv");
    this.context = this.canvas.getContext("2d");
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }
  draw = function(){
    this.context.beginPath();
    this.context.arc(this.x+this.canvas.width/2, this.canvas.height-this.y, this.radius, 0, 2 * Math.PI);
    this.context.fillStyle = this.color;
    this.context.fill();
  }
  move = function(curve){

  }
}
