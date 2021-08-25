class Partition{
  constructor(x1,y1,x2,y2,balls,maxObjects,minSize){
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.maxObjects = maxObjects; //limits capacity of partition
    this.minSize = minSize;
    this.canvas = document.getElementById("cnv");
    this.context = canvas.getContext("2d");
    this.balls = balls;
    this.partitions = [];
  }
  draw = function(){
    context.strokeStyle = "black";
    context.beginPath();
    context.moveTo(this.x2,this.y1);
    context.lineTo(this.x2,this.y2);
    context.lineTo(this.x1,this.y2);
    context.stroke();
  }
  update = function(){
    this.draw();
    for(var i = 0;i<this.partitions.length;i++){
      this.partitions[i].update();
    }
  }
}
