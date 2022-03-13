window.addEventListener("load",init);

var cnv,ctx;
var circles;
var img;

function init(){
  cnv = document.getElementById("cnv");
  ctx = cnv.getContext("2d");

  img = new Image();
  img.crossOrigin = "Anonymous";
  img.onload = () => {
    ctx.drawImage(img,0,0,cnv.width,cnv.height);

    let quality = 1;
    let iteration = 1;
    calculateCircles(quality,iteration,true);
  }
  assignSource(2);
}
function assignSource(pic){
  switch(pic){
    case 0:
      //harvey
      img.src = "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/steve-harvey-net-worth-1557432119.jpg?crop=0.685xw:0.910xh;0.0709xw,0.0529xh&resize=480:*";
      break;
    case 1:
      //van gogh
      img.src = "https://www.paint.org/wp-content/uploads/2019/11/Van-Gogh-The-Starry-Night-adult-coloring-page-1.jpg";
      break;
    case 2:
      //waves
      img.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Tsunami_by_hokusai_19th_century.jpg/800px-Tsunami_by_hokusai_19th_century.jpg";
      break;
    case 3:
      //stars
      img.src = "data:image/jpeg;base64,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";
      break;
    default:
      //flower
      img.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Dahlia_x_hybrida.jpg/1200px-Dahlia_x_hybrida.jpg";
  }
}
function calculateCircles(quality,iteration,dispLine){
  circles = [];

  let cols = quality;
  let rows = quality;

  let w = cnv.width/cols;
  let h = cnv.height/rows;

  for(var i = 0;i<cols;i++){
    for(var j = 0;j<rows;j++){
      partition(i*w,j*h,w,h,0,iteration,dispLine);
    }
  }
  update(dispLine);
}

function update(dispLine){
  for(var i = 0;i<circles.length;i++){
    let x = Math.round(circles[i].pos.x);
    let y = Math.round(circles[i].pos.y);
    let data = ctx.getImageData(x,y,1,1).data;
    circles[i].clr.r = data[0];
    circles[i].clr.g = data[1];
    circles[i].clr.b = data[2];
    circles[i].clr.a = data[3];
  }
  if(!dispLine){
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,cnv.width,cnv.height);
  }
  for(var i = 0;i<circles.length;i++){
    circles[i].draw();
  }
}

function partition(cornerX,cornerY,boundW,boundH,num,max,dispLine){

  if(num>=max) return;

  let circle = Circle.generateRandomCircle(cornerX,cornerY,boundW,boundH,ctx);
  circles.push(circle);

  let centerX = cornerX + boundW/2;
  let centerY = cornerY + boundH/2;

  //top left
  let cornerX1 = cornerX;
  let cornerY1 = cornerY;
  let boundW1 = circle.pos.x-cornerX-circle.rad;
  let boundH1 = circle.pos.y-cornerY-circle.rad;

  //top middle
  let cornerX2 = cornerX1+boundW1;
  let cornerY2 = cornerY1;
  let boundW2 = circle.rad*2;
  let boundH2 = boundH1;

  //top right
  let cornerX3 = cornerX2+boundW2;
  let cornerY3 = cornerY1;
  let boundW3 = boundW-boundW2-boundW1;
  let boundH3 = boundH1;

  //bottom left
  let cornerX4 = cornerX1;
  let cornerY4 = cornerY1+boundH1+circle.rad*2;
  let boundW4 = boundW1;
  let boundH4 = cornerY+boundH-circle.pos.y-circle.rad;

  //bottom middle
  let cornerX5 = cornerX4+boundW4;
  let cornerY5 = cornerY4;
  let boundW5 = circle.rad*2;
  let boundH5 = boundH4;

  //bottom right
  let cornerX6 = cornerX5+boundW5;
  let cornerY6 = cornerY4;
  let boundW6 = boundW-boundW5-boundW4;
  let boundH6 = boundH4;

  //middle left
  let cornerX7 = cornerX1;
  let cornerY7 = cornerY1+boundH1;
  let boundW7 = boundW1;
  let boundH7 = circle.rad*2;

  //middle right
  let cornerX8 = cornerX7+boundW7+circle.rad*2;
  let cornerY8 = cornerY7;
  let boundW8 = boundW-boundW7-circle.rad*2;
  let boundH8 = boundH7;


  //*****Mini Partitions*****//

  //top left
  let cornerX9 = circle.pos.x-circle.rad;
  let cornerY9 = circle.pos.y-circle.rad;
  let boundW9 = Math.sqrt(Math.pow(circle.rad,2)*(3-2*Math.sqrt(2))/2);
  let boundH9 = boundW9;

  //top right
  let cornerX10 = circle.pos.x+circle.rad*Math.sqrt(2)/2;
  let cornerY10 = circle.pos.y-circle.rad;
  let boundW10 = boundW9;
  let boundH10 = boundW9;

  //bottm left
  let cornerX11 = cornerX9;
  let cornerY11 = circle.pos.y+circle.rad*Math.sqrt(2)/2;
  let boundW11 = boundW9;
  let boundH11 = boundW9;

  //bottom right
  let cornerX12 = cornerX10;
  let cornerY12 = cornerY11;
  let boundW12 = boundW9;
  let boundH12 = boundW9;


  //************************//

  //*****Second Layer Mini Paritions****//
  //Math all previously worked out
  let r = circle.rad;
  let sqrW = (2*r-boundW9-Math.sqrt(Math.pow(2*r-boundW9,2)-2*(Math.pow(r,2)+Math.pow(boundW9,2)-2*r*boundW9)))/2;

  //top left bottom
  let cornerX13 = cornerX9;
  let cornerY13 = cornerY9+boundH9;
  let boundW13 = sqrW;
  let boundH13 = boundW13;

  //top left right
  let cornerX14 = cornerX9+boundW9;
  let cornerY14 = cornerY9;
  let boundW14 = sqrW;
  let boundH14 = boundW13;

  //top right left
  let cornerX15 = cornerX9+circle.rad*2-boundW9-sqrW;
  let cornerY15 = cornerY9;
  let boundW15 = sqrW;
  let boundH15 = boundW13;

  //top right bottom
  let cornerX16 = cornerX9+circle.rad*2-sqrW;
  let cornerY16 = cornerY9+boundH9;
  let boundW16 = sqrW;
  let boundH16 = boundW13;

  //bottom left top
  let cornerX17 = cornerX9;
  let cornerY17 = cornerY9+circle.rad*2-boundH9-sqrW;
  let boundW17 = sqrW;
  let boundH17 = boundW13;

  //bottom left right
  let cornerX18 = cornerX9+boundW9;
  let cornerY18 = cornerY9+circle.rad*2-sqrW;
  let boundW18 = sqrW;
  let boundH18 = boundW13;

  //bottom right left
  let cornerX19 = cornerX15;
  let cornerY19 = cornerY18;
  let boundW19 = sqrW;
  let boundH19 = boundW13;

  //bottom right top
  let cornerX20 = cornerX16;
  let cornerY20 = cornerY17;
  let boundW20 = sqrW;
  let boundH20 = boundW13;
  //***********************//

  ctx.lineWidth = 4;
  ctx.strokeStyle = "black";

  if(dispLine){
    ctx.strokeRect(cornerX1,cornerY1,boundW1,boundH1);//top left
    ctx.strokeRect(cornerX2,cornerY2,boundW2,boundH2);//top middle
    ctx.strokeRect(cornerX3,cornerY3,boundW3,boundH3);//top right
    ctx.strokeRect(cornerX4,cornerY4,boundW4,boundH4);//bottom left
    ctx.strokeRect(cornerX5,cornerY5,boundW5,boundH5);//bottom middle
    ctx.strokeRect(cornerX6,cornerY6,boundW6,boundH6);//bottom right
    ctx.strokeRect(cornerX7,cornerY7,boundW7,boundH7);//middle left
    ctx.strokeRect(cornerX8,cornerY8,boundW8,boundH8);//middle right

    //Mini Partitions
    ctx.strokeRect(cornerX9,cornerY9,boundW9,boundH9);//top left
    ctx.strokeRect(cornerX10,cornerY10,boundW10,boundH10);//top right
    ctx.strokeRect(cornerX11,cornerY11,boundW11,boundH11);//bottom left
    ctx.strokeRect(cornerX12,cornerY12,boundW12,boundH12);//bottom right

    //Second layer mini partitions
    ctx.strokeRect(cornerX13,cornerY13,boundW13,boundH13);//top left bottom
    ctx.strokeRect(cornerX14,cornerY14,boundW14,boundH14);//top left right
    ctx.strokeRect(cornerX15,cornerY15,boundW15,boundH15);//top right left
    ctx.strokeRect(cornerX16,cornerY16,boundW16,boundH16);//top right bottom
    ctx.strokeRect(cornerX17,cornerY17,boundW17,boundH17);//bottom left top
    ctx.strokeRect(cornerX18,cornerY18,boundW18,boundH18);//bottom left right
    ctx.strokeRect(cornerX19,cornerY19,boundW19,boundH19);//bottom right left
    ctx.strokeRect(cornerX20,cornerY20,boundW20,boundH20);//bottom right top
  }

  minSize = 10;
  if(boundW1>=minSize&&boundH1>=minSize)partition(cornerX1,cornerY1,boundW1,boundH1,num+1,max,dispLine);
  if(boundW2>=minSize&&boundH2>=minSize)partition(cornerX2,cornerY2,boundW2,boundH2,num+1,max,dispLine);
  if(boundW3>=minSize&&boundH3>=minSize)partition(cornerX3,cornerY3,boundW3,boundH3,num+1,max,dispLine);
  if(boundW4>=minSize&&boundH4>=minSize)partition(cornerX4,cornerY4,boundW4,boundH4,num+1,max,dispLine);
  if(boundW5>=minSize&&boundH5>=minSize)partition(cornerX5,cornerY5,boundW5,boundH5,num+1,max,dispLine);
  if(boundW6>=minSize&&boundH6>=minSize)partition(cornerX6,cornerY6,boundW6,boundH6,num+1,max,dispLine);
  if(boundW7>=minSize&&boundH7>=minSize)partition(cornerX7,cornerY7,boundW7,boundH7,num+1,max,dispLine);
  if(boundW8>=minSize&&boundH8>=minSize)partition(cornerX8,cornerY8,boundW8,boundH8,num+1,max,dispLine);

  //Mini Partition
  if(boundW9>=minSize&&boundH9>=minSize)partition(cornerX9,cornerY9,boundW9,boundH9,num+1,max,dispLine);
  if(boundW10>=minSize&&boundH10>=minSize)partition(cornerX10,cornerY10,boundW10,boundH10,num+1,max,dispLine);
  if(boundW11>=minSize&&boundH11>=minSize)partition(cornerX11,cornerY11,boundW11,boundH11,num+1,max,dispLine);
  if(boundW12>=minSize&&boundH12>=minSize)partition(cornerX12,cornerY12,boundW12,boundH12,num+1,max,dispLine);

  //Second layer mini partions
  if(boundW13>=minSize&&boundH13>=minSize)partition(cornerX13,cornerY13,boundW13,boundH13,num+1,max,dispLine);
  if(boundW14>=minSize&&boundH14>=minSize)partition(cornerX14,cornerY14,boundW14,boundH14,num+1,max,dispLine);
  if(boundW15>=minSize&&boundH15>=minSize)partition(cornerX15,cornerY15,boundW15,boundH15,num+1,max,dispLine);
  if(boundW16>=minSize&&boundH16>=minSize)partition(cornerX16,cornerY16,boundW16,boundH16,num+1,max,dispLine);
  if(boundW17>=minSize&&boundH17>=minSize)partition(cornerX17,cornerY17,boundW17,boundH17,num+1,max,dispLine);
  if(boundW18>=minSize&&boundH18>=minSize)partition(cornerX18,cornerY18,boundW18,boundH18,num+1,max,dispLine);
  if(boundW19>=minSize&&boundH19>=minSize)partition(cornerX19,cornerY19,boundW19,boundH19,num+1,max,dispLine);
  if(boundW20>=minSize&&boundH20>=minSize)partition(cornerX20,cornerY20,boundW20,boundH20,num+1,max,dispLine);
}
