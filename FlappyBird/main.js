var canvas, context;

window.addEventListener("load", init);
document.addEventListener('keydown', function(event) {
  //space bar
  if(event.keyCode == 32) {
    alert("space");
  }
});

function init(){
  canvas = document.getElementById("cnv");
  context = canvas.getContext("2d");

  animate();
}

function animate(){
  update();
  requestAnimationFrame(animate);
}
function update(){
  //update
}
