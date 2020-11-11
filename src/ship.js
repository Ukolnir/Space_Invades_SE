import Bullet from './bullet'

export default class Ship {
  constructor(x, y, sprites, bulSprites, cnvsL, cnvsR) {
		this.x = x;
		this.y = y;
		this._sprites = sprites;
		this._bulSprites = bulSprites;
		this.w = sprites[0].w;
		this.h = sprites[0].h;
		this.cnvsL = cnvsL;
		this.cnvsR = cnvsR;
		this.hp = 2;
		
		this.mode = 0;
  }
  
	isAlive(){
		return this.hp > 0;
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
  
  center(){
	  return this.x + this.w/2;
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
				fig.hp = fig.type != 3 ? 0 : fig.hp;
			return true;
		}
		return false;
  }
  
	trimMode(value){
		this.mode = value < 0 ? Math.max(this.mode+value, 0) : Math.min(this.mode+value, 5);
	}
	
	shoot(height){
		const b1x = this.left() + 5;
		const b2x = this.right()- 5 - this._bulSprites[2].w;
		switch(this.mode) {
			case 0:
				return [new Bullet(this.center() - this._bulSprites[2].w / 2, this.y, 0, -8, this._bulSprites[2], height, this.cnvsL, this.cnvsR)];
			case 1:
				return [
					new Bullet(b1x, this.y, 0, -8, this._bulSprites[2], height, this.cnvsL, this.cnvsR),
					new Bullet(b2x, this.y, 0, -8, this._bulSprites[2], height, this.cnvsL, this.cnvsR)
				];
			case 2:
				return [
					new Bullet(this.center() - this._bulSprites[2].w / 2, this.y, 0, -8, this._bulSprites[2], height, this.cnvsL, this.cnvsR),
					new Bullet(b1x, this.y, -1, -8, this._bulSprites[2], height, this.cnvsL, this.cnvsR),
					new Bullet(b2x, this.y, 1, -8, this._bulSprites[2], height, this.cnvsL, this.cnvsR)
				];
			case 3:
				return [
					new Bullet(this.center() - this._bulSprites[3].w / 2, this.y, 0, -8, this._bulSprites[3], height, this.cnvsL, this.cnvsR),
					new Bullet(b1x, this.y, -1, -8, this._bulSprites[2], height, this.cnvsL, this.cnvsR),
					new Bullet(b2x, this.y, 1, -8, this._bulSprites[2], height, this.cnvsL, this.cnvsR)
				];
			case 4:
				return [
					new Bullet(this.center() - this._bulSprites[3].w / 2, this.y, 0, -8, this._bulSprites[3], height, this.cnvsL, this.cnvsR),
					new Bullet(b1x, this.y, -1, -8, this._bulSprites[2], height, this.cnvsL, this.cnvsR),
					new Bullet(b2x, this.y, 1, -8, this._bulSprites[2], height, this.cnvsL, this.cnvsR),
					new Bullet(b1x, this.y, -2, -8, this._bulSprites[2], height, this.cnvsL, this.cnvsR),
					new Bullet(b2x, this.y, 2, -8, this._bulSprites[2], height, this.cnvsL, this.cnvsR)
				];
			case 5:
				return [
					new Bullet(this.center() - this._bulSprites[3].w / 2, this.y, 0, -8, this._bulSprites[3], height, this.cnvsL, this.cnvsR),
					new Bullet(b1x, this.y, -1, -8, this._bulSprites[2], height, this.cnvsL, this.cnvsR),
					new Bullet(b2x, this.y, 1, -8, this._bulSprites[2], height, this.cnvsL, this.cnvsR),
					new Bullet(b1x, this.y, -2, -8, this._bulSprites[2], height, this.cnvsL, this.cnvsR),
					new Bullet(b2x, this.y, 2, -8, this._bulSprites[2], height, this.cnvsL, this.cnvsR),
					new Bullet(b1x, this.y, -3, -8, this._bulSprites[2], height, this.cnvsL, this.cnvsR),
					new Bullet(b2x, this.y, 3, -8, this._bulSprites[2], height, this.cnvsL, this.cnvsR)
				];
			default:
			break;
		}
	}
	
  move(step){
	if(step < 0 && this.x + step <= this.cnvsL 
	|| step > 0 && this.right() + step >= this.cnvsR) return;
	this.x += step;
  }
  
  draw(ctx, time) {
	const t = Math.ceil(time / 500) % 4;
	let sp = t === 3 ? this._sprites[1] : this._sprites[t];
		  
    ctx.drawImage(
      sp.img,
      sp.x, sp.y, sp.w, sp.h,
      this.x, this.y, sp.w, sp.h
    );
  }
}
