window.addEventListener("load",init);

var cnv,ctx;
var circle;

function init(){
  cnv = document.getElementById("cnv");
  ctx = cnv.getContext("2d");

  circle = Circle.generateRandomCircle(0,0,cnv.width,cnv.height,ctx);

  animate();
}

function animate(){
  ctx.clearRect(0,0,cnv.width,cnv.height);
  update();

  requestAnimationFrame(animate);
}

function update(){
  circle.draw();
}
