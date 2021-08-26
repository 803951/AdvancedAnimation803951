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
  ballsIntersecting = function(ball1,ball2){
    let distX = ball1.x-ball2.x;
    let distY = ball1.y-ball2.y;
    let dist = Math.sqrt(distX*distX+distY*distY);
    return (dist <= ball1.r + ball2.r);
  }
  checkPartitionSize = function(){
    if(this.balls.length>this.maxObjects&&this.x2-this.x1>this.minSize){
      this.partition();
    }
    else{
      for(var i = 0;i<this.balls.length;i++){
        let isOverlapping = false;
        for(var k = i+1;k<this.balls.length;k++){
          if(k==i) continue;
          if(this.ballsIntersecting(this.balls[i],this.balls[k])){
            isOverlapping = true;
            this.balls[k].setOverlapping(true);
            break;
          }
        }
        if(!this.balls[i].colorUpdated) this.balls[i].setOverlapping(isOverlapping);
        this.balls[i].update();
      }
    }
  }
  partition = function(){
    let newBalls = balls;

    this.partitions = [];

    let newPartition1 = new Partition(this.x1,this.y1,(this.x2+this.x1)/2,(this.y2+this.y1)/2,newBalls,this.maxObjects,this.minSize);
    this.partitions.push(newPartition1);

    let newPartition2 = new Partition((this.x1+this.x2)/2,this.y1,this.x2,(this.y2+this.y1)/2,newBalls,this.maxObjects,this.minSize);
    this.partitions.push(newPartition2);

    let newPartition3 = new Partition(this.x1,(this.y1+this.y2)/2,(this.x2+this.x1)/2,this.y2,newBalls,this.maxObjects,this.minSize);
    this.partitions.push(newPartition3);

    let newPartition4 = new Partition((this.x1+this.x2)/2,(this.y1+this.y2)/2,this.x2,this.y2,newBalls,this.maxObjects,this.minSize);
    this.partitions.push(newPartition4);
  }
  update = function(){
    this.checkPartitionSize();
    this.draw();
    for(var i = 0;i<this.partitions.length;i++){
      this.partitions[i].update();
    }
  }
}
