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
    if(this.balls.length>this.maxObjects&&this.x2-this.x1>this.minSize){
      this.partition();
    }
    else{
      for(var i = 0;i<this.balls.length;i++){
        let isOverlapping = false;
        for(var k = i+1;k<this.balls.length;k++){
          if(k==i) continue;
          if(this.balls[i].ballsIntersecting(this.balls[k])){
            isOverlapping = true;
            this.balls[k].setOverlapping(true);
            break;
          }
        }
        if(!this.balls[i].colorUpdated) this.balls[i].setOverlapping(isOverlapping);
      }
    }
  }
  createPartition = function(x1,y1,x2,y2){
    let newBalls = [];

    //put correct balls in the partition
    for(var i = 0;i<this.balls.length;i++){ //TODO: move balls between partitions rather than reset ball positions in partitions
      if(this.balls[i].x>=x1-this.balls[i].r&&this.balls[i].x<=x2+this.balls[i].r&&this.balls[i].y>=y1-this.balls[i].r&&this.balls[i].y<=y2+this.balls[i].r){
      //if(this.balls[i].x>=x1&&this.balls[i].x<=x2&&this.balls[i].y>=y1&&this.balls[i].y<=y2){
        newBalls.push(this.balls[i]);
      }
    }

    let newPartition = new Partition(x1,y1,x2,y2,newBalls,this.maxObjects,this.minSize);
    this.partitions.push(newPartition);

  }
  partition = function(){

    this.partitions = []; //reset partition array TODO: add and remove partitions as code runs rather than reset each frame

    this.createPartition(this.x1,this.y1,(this.x1+this.x2)/2,(this.y1+this.y2)/2); //top left quadrant
    this.createPartition((this.x1+this.x2)/2,this.y1,this.x2,(this.y2+this.y1)/2); //top right quadrant
    this.createPartition(this.x1,(this.y1+this.y2)/2,(this.x2+this.x1)/2,this.y2); //bottom left quadrant
    this.createPartition((this.x1+this.x2)/2,(this.y1+this.y2)/2,this.x2,this.y2); //bottom right quadrant

  }
  update = function(){
    this.checkPartitionSize();
    this.draw();
    for(var i = 0;i<this.partitions.length;i++){
      this.partitions[i].update();
    }
  }
}
