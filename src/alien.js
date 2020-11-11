export default class Alien {
  constructor(x, y, vx, vy, hp, type, sprites, timeMark, cnvsL, cnvsR, cnvsH) {
		this.x = x;
		this.y = y;
		this.type = type;
		this.vx = vx;
		this.vy = vy;
		this._sprites = sprites;
		this.w = Math.max.apply(Math, sprites.map(x=>x.w));
		this.h = Math.max.apply(Math, sprites.map(x=>x.h));
		this.timeMark = timeMark;
		this.timeLastFire = 0;
		this.hp = hp;
		this.difHP = hp;
		this.cnvsL = cnvsL;
		this.cnvsR = cnvsR;
		this.cnvsH = cnvsH;
  }  
	
	isAlive(){
		return this.hp > 0;
	}
	
  left(){
		return this.x;  
  }
  
  top() {
		return this.y;  
  }

  right(){
		return this.x + this.w;  
  }
  
  bottom(){
		return this.y + this.h;  
  }
	  
  alienFire(time){
	  if (Math.ceil(time / 100) % 60 === this.timeMark
	  && time - this.timeLastFire > 2000){ //????
		this.timeLastFire = time;
		return true;
	  }
	  return false;
  }
  
	isInjured(){
		if(this.difHP > this.hp){
			this.difHP = this.hp;
			return true;
		}
		return false;
	}
	
  intersects(fig) {
		if(
			this.y < fig.bottom()
			&& this.x < fig.right()
            && fig.x < this.right()
            && (fig.y < this.bottom())
		){
			this.hp-=1;
			if(fig.hp === undefined)
				fig.isAlive = false;
			else 
				fig.hp-=1;
			
			return true;
		}
		return false;
  }
  
  center(){
		return this.x + this.w / 2;
  }
  
  move(){
		if(this.x <= this.cnvsL || this.right() >= this.cnvsR)
			this.vx = -this.vx;
		if(this.bottom() >= this.cnvsH && this.type != 3){
			this.hp = 0;
			return;
		}
		this.x += this.vx;
		this.y += this.vy;
  }	
	
  draw(ctx, time) {
	const t = Math.ceil(time / 500) % 4;
	let sp;
	switch (this.type){
		case 0:
        case 3:
			sp = t === 3 ? this._sprites[1] : this._sprites[t];
			break;
		case 1:
			sp = this._sprites[t % 2];
			break;
		case 2:
			const shift = this.vx > 0 ? 3 : 0;
			sp = t === 3 ? this._sprites[shift + 1] : this._sprites[shift + t];
			break;
	}
		
    ctx.drawImage(
      sp.img,
      sp.x, sp.y, sp.w, sp.h,
      this.x, this.y, sp.w, sp.h
    );
  }
}
