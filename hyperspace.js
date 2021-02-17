class Hyperspace{
  constructor(e){
    this.element = e.tagName ? e : document.getElementById(e);
    if(!this.element || this.element.tagName !== "CANVAS")throw"You must Supply a Canvas Element";
    this.ctx = this.element.getContext("2d");
    this.points = Array.from(new Array(100)).fill(star);
    this.lastTime = 0;
    this.deltaTime = 0;
    this.frame = requestAnimationFrame(this.update.bind(this));
    this.resize();
    onresize = this.resize.bind(this);
  }
  resize(e){
    let evt = e || event;
    this.element.width = innerWidth;
    this.element.height = innerHeight;
  }
  update(t){
    this.ctx.strokeStyle = "#fff";
    this.deltaTime = (t - this.lastTime) / 16;
    this.lastTime = t;
    this.ctx.clearRect(0, 0, innerWidth, innerHeight);
    this.points.map(p => {
      let xOffset = innerWidth / 2 - p.x;
      let xScale = Math.abs(xOffset / (innerWidth / 2))
      let yOffset = innerHeight / 2 - p.y;
      let yScale = Math.abs(yOffset / (innerHeight / 2));
      p.z += ((xScale + yScale) / 2 - p.z) / 10;
      // console.log(-xOffset / 10 * p.z);
      let oldX = p.x;
      let oldY = p.y;
      p.x += -xOffset * p.z;
      p.y += -yOffset * p.z;
      this.ctx.beginPath();
      this.ctx.lineWidth = p.z * 5;
      this.ctx.moveTo(oldX, oldY);
      this.ctx.lineTo(p.x, p.y);
      this.ctx.stroke();
      if(p.x < 0 || p.x > innerWidth || p.y < 0 || p.y > innerHeight)
      p.randPosition();
      // p.draw(this.ctx);
      return p;
    })
    this.frame = requestAnimationFrame(this.update.bind(this));
  }
}
class star {
  constructor(){
    this.z = 0;
    this.x = this.placePoint(innerWidth);
    this.y = this.placePoint(innerHeight);
    this.last
  }
  randPosition(){
    this.z = 0;
    this.x = this.placePoint(innerWidth);
    this.y = this.placePoint(innerHeight);
  }
  placePoint(v){
    return Math.random() * v;
    // return (Math.random() * 20 - 10) + v / 2
  }
  draw(ctx){
    ctx.beginPath();
    ctx.arc(this.x, this.y, 5, 0, Math.PI * 2);
    ctx.fill();
  }
}
Array.prototype.fill = function(e){
  for(let i = 0; i < this.length; i++){
    if(typeof e != "function" || !e.constructor){this[i] = e;continue};
    this[i] = new e();
  }
  return this;
}