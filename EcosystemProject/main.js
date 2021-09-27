window.addEventListener("load",init);

var cnv,ctx;

function init(){
  animate();
}

function animate(){

  update();

  requestAnimationFrame(animate);
}

function update(){

}
