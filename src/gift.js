export default class Gift {
	constructor(x, y, vy, sprite){
		this.x = x;
		this.y = y;
		this.w = sprite.w;
		this.h = sprite.h;
		this.vy = vy;
		this.sprite = sprite;
		this.isAlive = true;
	}
	
	left() {
		return this.x;
	}
	
	right() {
		return this.x + this.w;
	}
	
	top() {
		return this.y;
	}
	
	bottom() {
		return this.y + this.h;
	}
	
	move(cnvsB) {
		if(this.bottom() >= cnvsB)
			this.isAlive = false;
		else
			this.y += this.vy;
	}
	
	draw(ctx) {
    ctx.drawImage(
      this.sprite.img,
      this.sprite.x, this.sprite.y, this.w, this.h,
      this.x, this.y, this.w, this.h
    );
  }
	
	intersects(fig) {
		if(
			this.y < fig.bottom()
			&& this.x < fig.right()
      && fig.x < this.right()
      && (fig.y < this.bottom())
		){
			this.isAlive = false;
			return true;
		}
		return false;
  }
}