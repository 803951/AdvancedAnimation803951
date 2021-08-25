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
  checkPartitionSize = function(){
    if(this.x1-this.x2>this.minSize){
      let newBalls = balls;
      this.partitions = [];

      let newPartition = new Partition(this.x1,this.y1,this.x2/2,this.y2/2,newBalls,this.maxObjects,this.minSize);
      console.log(newPartition);
      this.partitions.push(newPartition);

      newPartition = new Partition((this.x1+this.x2)/2,this.y1,this.x2,this.y2/2,newBalls,this.maxObjects,this.minSize);
      this.partitions.push(newPartition);

      newPartition = new Partition(this.x1,(this.y1+this.y2)/2,this.x2/2,this.y2,newBalls,this.maxObjects,this.minSize);
      this.partitions.push(newPartition);

      newPartition = new Partition((this.x1+this.x2)/2,(this.y1+this.y2)/2,this.x2,this.y2,newBalls,this.maxObjects,this.minSize);
      this.partitions.push(newPartition);
    }
  }
  update = function(){
    this.checkPartitionSize();
    this.draw();
    for(var i = 0;i<this.partitions.length;i++){
      this.partitions[i].update();
    }
  }
}
