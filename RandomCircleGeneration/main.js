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
  let pic = 0;
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
  }
  circles = [];
  let iteration = 2;

  let cols = 20;
  let rows = 20;

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
