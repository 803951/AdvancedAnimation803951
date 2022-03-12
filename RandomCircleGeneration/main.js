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
    update();
  }
  let pic = 4;
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
    case 4:
      //flower
      img.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Dahlia_x_hybrida.jpg/1200px-Dahlia_x_hybrida.jpg";
  }
  circles = [];
  let iteration = 3;

  let quality = 25;
  let cols = quality;
  let rows = quality;

  let w = cnv.width/cols;
  let h = cnv.height/rows;

  for(var i = 0;i<cols;i++){
    for(var j = 0;j<rows;j++){
      partition(i*w,j*h,w,h,0,iteration);
    }
  }
  //animate();
}

function animate(){
  ctx.fillStyle = "black";
  ctx.fillRect(0,0,cnv.width,cnv.height);
  update();

  requestAnimationFrame(animate);
}

function update(){
  ctx.drawImage(img,0,0,cnv.width,cnv.height);

  for(var i = 0;i<circles.length;i++){
    let x = Math.round(circles[i].pos.x);
    let y = Math.round(circles[i].pos.y);
    let data = ctx.getImageData(x,y,1,1).data;
    circles[i].clr.r = data[0];
    circles[i].clr.g = data[1];
    circles[i].clr.b = data[2];
    circles[i].clr.a = data[3];
  }
  ctx.fillStyle = "black";
  ctx.fillRect(0,0,cnv.width,cnv.height);
  for(var i = 0;i<circles.length;i++){
    circles[i].draw();
  }
}

function partition(cornerX,cornerY,boundW,boundH,num,max){

  if(num>=max) return;

  let circle = Circle.generateRandomCircle(cornerX,cornerY,boundW,boundH,ctx);
  circles.push(circle);

  let centerX = cornerX + boundW/2;
  let centerY = cornerY + boundH/2;

  /*let side = (boundW<boundH)? boundW:boundH
  let rad = (Math.sqrt(Math.pow(side,2)*2)-circle.rad*2)/4;
  let x = (circle.pos.x<centerX)?circle.pos.x+circle.rad-rad:circle.pos.x-circle.rad+rad;
  let y = (circle.pos.y<centerY)?circle.pos.y+circle.rad-rad:circle.pos.y-circle.rad+rad;
  let clr = Color.generateRandomColor(0.1,0.1,2,false);
  let tangCircle = new Circle(x,y,rad,clr,ctx);
  circles.push(tangCircle);*/
  ctx.strokeStyle = "black";

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

  let displayRectangles = false;
  if(displayRectangles){
    ctx.strokeRect(cornerX1,cornerY1,boundW1,boundH1);//top left
    ctx.strokeRect(cornerX2,cornerY2,boundW2,boundH2);//top middle
    ctx.strokeRect(cornerX3,cornerY3,boundW3,boundH3);//top right
    ctx.strokeRect(cornerX4,cornerY4,boundW4,boundH4);//bottom left
    ctx.strokeRect(cornerX5,cornerY5,boundW5,boundH5);//bottom middle
    ctx.strokeRect(cornerX6,cornerY6,boundW6,boundH6);//bottom right
    ctx.strokeRect(cornerX7,cornerY7,boundW7,boundH7);//middle left
    ctx.strokeRect(cornerX8,cornerY8,boundW8,boundH8);//middle right
  }

  if(boundW1>=2&&boundH1>=2)partition(cornerX1,cornerY1,boundW1,boundH1,num+1,max);
  if(boundW2>=2&&boundH2>=2)partition(cornerX2,cornerY2,boundW2,boundH2,num+1,max);
  if(boundW3>=2&&boundH3>=2)partition(cornerX3,cornerY3,boundW3,boundH3,num+1,max);
  if(boundW4>=2&&boundH4>=2)partition(cornerX4,cornerY4,boundW4,boundH4,num+1,max);
  if(boundW5>=2&&boundH5>=2)partition(cornerX5,cornerY5,boundW5,boundH5,num+1,max);
  if(boundW6>=2&&boundH6>=2)partition(cornerX6,cornerY6,boundW6,boundH6,num+1,max);
  if(boundW7>=2&&boundH7>=2)partition(cornerX7,cornerY7,boundW7,boundH7,num+1,max);
  if(boundW8>=2&&boundH8>=2)partition(cornerX8,cornerY8,boundW8,boundH8,num+1,max);
}
