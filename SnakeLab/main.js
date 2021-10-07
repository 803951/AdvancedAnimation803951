window.addEventListener("load",init);

var cnv,ctx;

function init(){
  cnv = document.getElementById("cnv");
  ctx = cnv.getContext("2d");

  animate();
}

function animate(){
  update();

  requestAnimationFrame(animate);
}

function update(){

}
