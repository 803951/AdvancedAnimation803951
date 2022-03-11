window.addEventListener("load",init);

var cnv,ctx;
var circles;

function init(){
  cnv = document.getElementById("cnv");
  ctx = cnv.getContext("2d");

  circles = [];

  let n = 100;
  for(var i = 0;i<n;i++){
    let circle = Circle.generateRandomCircle(0,0,cnv.width,cnv.height,ctx);
    circles.push(circle);
  }


  animate();
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
