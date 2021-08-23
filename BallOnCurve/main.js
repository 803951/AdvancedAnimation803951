window.addEventListener("load", init);

function init(){
  curves = [];
  let coefficients1 = [5,0.1,0.01];
  let curve1 = new Curve(coefficients1,1,"black");
  curves.push(curve1);

  for(var i = 0;i<curves.length;i++){
    curves[i].graph(1,-300,300);
  }
  animate();
}
function animate(){

  requestAnimationFrame(animate);
}
