window.addEventListener("load",init);

var cnv,ctx,snakes; //define global variables for context, canvas, and snakes array

function init(){
  cnv = document.getElementById("cnv");
  ctx = cnv.getContext("2d");

  //sets the size of the canvas to 90% of the window scale
  cnv.width = window.innerWidth*0.9;
  cnv.height = window.innerHeight*0.9;

  snakes = [];
  let n = 20; //number of snakes
  let r = 10; //radius of snake segments
  let dist = 5; //distance between each segment in snakes
  for(var i = 0;i<n;i++){
    let length = Math.random()*150+50; //random length in pixels of snake;
    let segments = length/dist; //sets segments of snake to the length divided by the distance between each segment
    let snake = Snake.generateRandomSnake(r,segments,length);
    snakes.push(snake); //adds new snake to snake array
  }

  animate();
}

function animate(){
  ctx.clearRect(0,0,cnv.width,cnv.height); //clears canvas every frame

  update(); //calls update method

  requestAnimationFrame(animate); //new animation from by calling animation function again
}

function update(){
  for(var i = 0;i<snakes.length;i++){ //runs through snake array
    snakes[i].move(); //move function to update all segment positions
    snakes[i].draw();
    for(var k = 0;k<snakes.length;k++){ //snakes interact with eachother
      if(i==k) continue;
      if(i%4!=k%4){ //each snake is attracted to 75% of other snakes with a smaller attracting force than the repelling force
        snakes[i].attract(snakes[k]);
      }
      else{ //each snake is repelled by 25% of other snakes with a larger repelling force than the attracting force
        snakes[i].repel(snakes[k]);
      }
    }
  }
}
