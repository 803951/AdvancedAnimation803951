window.addEventListener("load", init);

var canvas,context,balls;

function init(){
  canvas = document.getElementById("cnv");
  context = canvas.getContext("2d");
  balls = [];
  curves = [];

  let coefficients1 = [2,0.1,0.01];
  let curve1 = new Curve(coefficients1,1,"black");
  curves.push(curve1);

  let ball1 = new Ball(0,300,10,0.25,"orange");
  balls.push(ball1);

  animate();
}

function update(){
  context.clearRect(0,0,canvas.width,canvas.height);
  for(var i = 0;i<balls.length;i++){
    balls[i].updateVelocity(curves);
    balls[i].move();
    balls[i].draw();
  }
  for(var i = 0;i<curves.length;i++){
    curves[i].graph(1,-300,300);
  }
}

function animate(){

  update();

  requestAnimationFrame(animate);
}
