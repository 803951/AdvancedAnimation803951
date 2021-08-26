class Ball{
  constructor(x,y,radius,gravity,color){
    this.canvas = document.getElementById("cnv");
    this.context = this.canvas.getContext("2d");
    this.x = x;
    this.y = y;
    this.dx = 0;
    this.dy = 0;
    this.radius = radius;
    this.color = color;
    this.gravity = gravity;
  }
  draw = function(){
    this.context.beginPath();
    this.context.arc(this.x+this.canvas.width/2, this.canvas.height-this.y, this.radius, 0, 2 * Math.PI);
    this.context.fillStyle = this.color;
    this.context.fill();
  }
  updateVelocity = function(constraints){
    this.dy-=this.gravity;

    for(var i = 0;i<constraints.length;i++){
      let slope = constraints[i].derivative(this.x);
      console.log(slope);
    }

    if(this.y<this.radius){
      this.y = this.radius;
      this.dy = 0;
    }
  }
  move = function(){
    this.x+=this.dx;
    this.y+=this.dy;
  }
}
