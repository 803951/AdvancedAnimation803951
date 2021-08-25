class Partition{
  constructor(x1,y1,x2,y2){
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.canvas = document.getElementById("cnv");
    this.context = canvas.getContext("2d");
  }
  draw = function(){
    context.strokeStyle = "black";
    context.beginPath();
    context.moveTo(this.x2,this.y1);
    context.lineTo(this.x2,this.y2);
    context.lineTo(this.x1,this.y2);
    context.stroke();
  }
}
