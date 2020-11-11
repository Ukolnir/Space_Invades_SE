import Alien from './alien'
import Bullet from './bullet'

export default class Level {
	constructor(typeLevel,
	countAlien,
	alienHP,
	movementSpeedVX,
	movementSpeedVY,
	alienSprites,
	bulletSprite,
	cnvsL,
	cnvsR,
	cnvsH){
		this.typeLevel = typeLevel;
		this.countAlien = countAlien; 
		this.alienHP = alienHP; 
		this.movementSpeedVX = movementSpeedVX;
		this.movementSpeedVY = movementSpeedVY;
		this.alienSprites = alienSprites;
		this.bulletSprite = bulletSprite;
		this.mark = 0;
		this.cnvsL = cnvsL;
		this.cnvsR = cnvsR;
		this.cnvsH = cnvsH;
		this.isEnd = false;

		this.isCDbyAlien = typeLevel == "falling" || typeLevel == "snake" || typeLevel == "boss";

		this.allAliens = [];
		this.aliens = [];

		this.idx = 0;
		this.lastTick = 0;
		
		this.tempYforBoss = 0;
		this.attackBoss = false;
		this.tempSpeedVXforBoss = 0;
	}

	getMark(step = 17){
		this.mark = (this.mark + step) % 60;
		return this.mark;
	}

	randomX() {
		let rand = this.cnvsL + Math.random() * ((this.cnvsR - 50) - this.cnvsL);
		return Math.floor(rand);
	}

	constructorLevel(){
		let typeForm = 0;
		switch(this.typeLevel){
			case "snake":
				typeForm = 2;
			case "formation":
			for (let k = 0; k < this.alienSprites.length; ++k){
				for (let i = 0; i < this.countAlien; ++i){
					let alienX = this.cnvsL + 40;
					let alienY = 40 + (k*this.countAlien+i)*50;
					while (alienX + 60 < this.cnvsR){
						this.aliens.push(new Alien(alienX, alienY, this.movementSpeedVX, this.movementSpeedVY,
						this.alienHP, typeForm, this.alienSprites[k], this.getMark(), this.cnvsL, this.cnvsR, this.cnvsH));
						alienX+=50;
					}
				}
			}
			break;

			case "falling":
			for (let k = 0; k < this.alienSprites.length; ++k){
				for (let i = 0; i < this.countAlien; ++i){
					let alienX = this.randomX();
					let alienY = 5;
					this.allAliens.push(new Alien(alienX, alienY, this.movementSpeedVX, this.movementSpeedVY,
						this.alienHP, 1, this.alienSprites[k], this.getMark(), this.cnvsL, this.cnvsR, this.cnvsH));
				}
			}
			let ret = this.randomX() % 10;
			this.aliens = this.allAliens.slice(this.idx, this.idx + ret);
			this.idx += ret;
			break;

      case "boss":
			let tempXforBoss = (this.cnvsL + this.cnvsR)/2;
			this.tempYforBoss = this.cnvsH/4;
      this.aliens.push(new Alien(tempXforBoss, this.tempYforBoss, this.movementSpeedVX, 0,
				this.alienHP, 3, this.alienSprites[0], this.getMark(30), this.cnvsL, this.cnvsR, this.cnvsH));
      break;

			default:
			break;
		}
	}

	shoot(time){
		let bullet = [];

		switch(this.typeLevel){
			case "formation":
                let alienIsReady = this.aliens.filter(x=>x.alienFire(time));
				alienIsReady.forEach(x=>{
				    const bulX = x.center();
				    const bulY = x.bottom();
				    bullet.push(new Bullet(bulX - this.bulletSprite.w / 2, bulY, 0, 8, this.bulletSprite, this.cnvsH, this.cnvsL, this.cnvsR));
				});
			break;

			case "falling":
			break;

			case "snake":
				let alienInjured = this.aliens.filter(x=>x.isInjured());
				alienInjured.forEach(x=>{
					const bulX = x.center();
					const bulY = x.bottom();
					bullet.push(new Bullet(bulX - this.bulletSprite.w / 2, bulY, 0, 8, this.bulletSprite, this.cnvsH, this.cnvsL, this.cnvsR));
				});
			break;

      case "boss":
				if(this.aliens.length == 0) break;
      	let boss = this.aliens[0];
        const bul1X = boss.left();
        const bul2X = boss.right() - this.bulletSprite.w;
				const bulY = boss.bottom();
        if(boss.alienFire(time) || boss.isInjured()){
					bullet.push(new Bullet(bul1X, bulY, 0, 8, this.bulletSprite, this.cnvsH, this.cnvsL, this.cnvsR));
        	bullet.push(new Bullet(bul2X, bulY, 0, 8, this.bulletSprite, this.cnvsH, this.cnvsL, this.cnvsR));
        }
      break;
		}
		return bullet;
	}

	getAlien(){
		this.aliens = this.aliens.filter(x=>x.isAlive());
		if(this.typeLevel == "falling"){
			this.isEnd = this.aliens.length == 0 && this.idx >= this.allAliens.length;
		}
		else
			this.isEnd = this.aliens.length == 0;
	}

	moveAlien(){
		if(this.typeLevel == "boss"){}
		this.aliens.forEach(x => x.move());
	}

	update(time, shipLeft, shipRight){
		switch(this.typeLevel){
			case "formation":
			break;
			case "falling":
				if(this.idx < this.allAliens.length && time - this.lastTick > 1000){
					let ret = this.randomX() % 6 + 1;
					let lastIdx = Math.min(this.allAliens.length, ret + this.idx);
					this.aliens = this.aliens.concat(this.allAliens.slice(this.idx, lastIdx));
					this.idx += ret;
					this.lastTick = time;
				}

			break;
      case "boss":
				let boss = this.aliens[0];
				if(shipLeft <= boss.center() && boss.center() < shipRight && boss.y == this.tempYforBoss){
					this.tempSpeedVXforBoss = boss.vx;
					this.aliens[0].vx = 0;
					this.aliens[0].vy = this.movementSpeedVY;
					this.attackBoss = true; 
				} else if(boss.bottom() >= this.cnvsH){
					this.aliens[0].vx = 0;
					this.aliens[0].vy = -this.movementSpeedVY;
				} else if(boss.top() < this.tempYforBoss && this.attackBoss){
					this.aliens[0].y = this.tempYforBoss;
					this.aliens[0].vx = this.tempSpeedVXforBoss;
					this.aliens[0].vy = 0;
					this.attackBoss = false;
				}
				
			break;
			default:
			break;
		}
		this.moveAlien();
	}

	drawAlien(context, time){
		this.aliens.forEach(a => a.draw(context, time));
	}
}
