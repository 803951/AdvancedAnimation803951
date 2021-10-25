window.addEventListener("load",init);

var cnv,ctx; //define global variables for context, canvas, and snakes array

function init(){
  cnv = document.getElementById("cnv");
  ctx = cnv.getContext("2d");

  animate();
}

function animate(){
  ctx.clearRect(0,0,cnv.width,cnv.height); //clears canvas every frame

  update(); //calls update method

  requestAnimationFrame(animate); //new animation from by calling animation function again
}

function update(){

}
