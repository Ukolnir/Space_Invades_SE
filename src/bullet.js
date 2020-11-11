export default class Bullet {
  constructor(x, y, vx, vy, sprite, cnvsB, cnvsL, cnvsR) {
    this.x = x;
  	this.y = y;
		this.vx = vx;
  	this.vy = vy;
  	this.w = sprite.w;
  	this.h = sprite.h;
  	this.sprite = sprite;
		this.cnvsB = cnvsB;
		this.isAlive = true;
		this.cnvsL = cnvsL;
		this.cnvsR = cnvsR;
  }

  update(time) {
		if(this.bottom() < this.cnvsB && this.y > 0 
			&& this.left() > this.cnvsL 
			&& this.right() < this.cnvsR) {
				this.y += this.vy;
				this.x += this.vx;
		} else {
			this.isAlive = false;
		}
  }

  draw(ctx) {
	let sp = this.sprite;
    ctx.drawImage(
      sp.img,
      sp.x, sp.y, sp.w, sp.h,
      this.x, this.y, sp.w, sp.h
    );
  }
  
  left(){
		return this.x;  
  }
  
  right(){
		return this.x + this.w;  
  }
  
  top(){
		return this.y;
  }
  
  bottom(){
		return this.y + this.h;  
  }
}