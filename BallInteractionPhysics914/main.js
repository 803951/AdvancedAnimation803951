window.addEventListener("load", init);

function init(){
  animate();
}
function animate(){
  update();
  requestAnimationFrame(animate);
}
function update(){

}
