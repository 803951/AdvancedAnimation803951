window.addEventListener("load", init);

function init(){
  animate();
}
function animate(){
  requestAnimationFrame(animate);
}
