window.addEventListener("load",init);

var cnv,ctx,particles;

function init(){
  cnv = document.getElementById("cnv");
  ctx = cnv.getContext("2d");

  particles = [];

  animate();
}

function animate(){
  ctx.clearRect(0,0,cnv.width,cnv.height);
  update();

  requestAnimationFrame(animate);
}

function update(){

  for(var i = 0;i<particles.length;i++){
    if(particles[i].update()){ //checks if particle life is over
      particles.splice(i,1); //removes particle from particle array if its life is over
      i--;
    }
  }

}
