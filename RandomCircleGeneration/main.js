window.addEventListener("load",init);

var cnv,ctx;
var circles;

function init(){
  cnv = document.getElementById("cnv");
  ctx = cnv.getContext("2d");

  circles = [];

  partition(0,0,cnv.width,cnv.height,0,5);
  update();
  //animate();
}

function animate(){
  ctx.clearRect(0,0,cnv.width,cnv.height);
  update();

  requestAnimationFrame(animate);
}

function update(){
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

  //horizontal
  let cornerX1 = (circle.pos.x<centerX)?cornerX+2*circle.rad:cornerX;
  let cornerY1 = cornerY;
  let boundW1 = boundW-2*circle.rad;
  let boundH1 = (circle.pos.y<centerY)?2*circle.rad:boundH-2*circle.rad;

  //right
  let cornerX2 = cornerX1
  let cornerY2 = cornerY1+boundH1;
  let boundW2 = boundW1;
  let boundH2 = boundH-boundH1;

  //left
  let cornerX3 = (circle.pos.x<centerX)?cornerX:cornerX+boundW-2*circle.rad;
  let cornerY3 = (circle.pos.y<centerY)?cornerY+2*circle.rad:cornerY;
  let boundW3 = boundW-boundW1;
  let boundH3 = (circle.pos.y<centerY)?boundH2:boundH1;

  partition(cornerX1,cornerY1,boundW1,boundH1,num+1,max);
  partition(cornerX2,cornerY2,boundW2,boundH2,num+1,max);
  partition(cornerX3,cornerY3,boundW3,boundH3,num+1,max);
}
