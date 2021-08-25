window.addEventListener("load", init);

var canvas,context,balls;

function init(){
  canvas = document.getElementById("cnv");
  context = canvas.getContext("2d");
  balls = [];
  curves = [];

  let coefficients1 = [5,0,0,0,0.0000001];
  let curve1 = new Curve(coefficients1,1,"black");
  curves.push(curve1);

  let ball1 = new Ball(0,300,10,"orange");
  balls.push(ball1);

  animate();
}

function draw(){
  context.clearRect(0,0,canvas.width,canvas.height);
  for(var i = 0;i<balls.length;i++){
    balls[i].draw();
  }
  for(var i = 0;i<curves.length;i++){
    curves[i].graph(1,-300,300);
  }
}

function animate(){

  draw();

  requestAnimationFrame(animate);
}
