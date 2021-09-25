function ScoreHandler(score,increment,x,y,font,textAlign,color){
  this.score = score;
  this.increment = increment;
  this.pos = new JSVector(x,y);
  this.font = font;
  this.textAlign = textAlign;
  this.color = color
}

ScoreHandler.prototype.display = function(){
  ctx.font = this.font;
  ctx.fillStyle = this.color.toString();
  ctx.textAlign = this.textAlign;
  ctx.fillText(this.score, this.pos.x, this.pos.y);
}

ScoreHandler.prototype.increaseScore = function(){
  this.score+=this.increment;
}
