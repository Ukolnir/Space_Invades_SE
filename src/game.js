import Sprite from './sprite'
import Ship from './ship'
import Bullet from './bullet'
import Alien from './alien'
import InputHandler from './input-handler'
import Level from './level'
import Gift from './gift'

import assetShipPath from '../assets/ship.png'
import assetAlienPath from '../assets/aliens.png'

import { config } from './conf'

let assetShip;
let assetsAliens;

const sprites = {
  aliens: [],
  ship: [],
  bulletsShip: [],
  bulletsAliens: [],
	gift: null
};
const gameState = {
  startRun: null,
  cnvsBorder: 450,
  bullets: [],
  bulletsAlien: [],
  aliens: [],
  ship: null,
  levels: [],
  nextLevel: false,
  numberLevel: 0,
  startGame: true,
  gameOver: false,
	playerWin:false,
	score: 0,
	scoreLastBonus: 0,
	bonus: [],
	catchedBonus: 0
};

function onPressedKey(e){
	if(e.keyCode === 13){
		if(gameState.startGame){
			gameState.startGame = false;
			levelLoop();
			return;
		}
		if(gameState.nextLevel){
				gameState.numberLevel+=1;
				gameState.nextLevel = false;
				levelLoop();
				return;
		}
		if(gameState.playerWin || gameState.gameOver){
			window.location.reload();
		}
	}
}

let mark = 0;
const inputHandler = new InputHandler();

export function preload(nextInit){
	assetsAliens = new Image();
	assetsAliens.addEventListener("load", () => {
	
	sprites.bulletsAliens = [
		new Sprite(assetsAliens,  258, 20, 6, 16), new Sprite(assetsAliens,  279, 19, 11, 19)
	];

	sprites.aliens = [
		[new Sprite(assetsAliens,  2, 2, 47, 39), new Sprite(assetsAliens,  51, 2, 47, 39), new Sprite(assetsAliens,  99, 2, 44, 39)], //for 1, 2, 5, 8
		[new Sprite(assetsAliens,  1, 48, 47, 45), new Sprite(assetsAliens,  50, 48, 47, 45), new Sprite(assetsAliens,  98, 48, 44, 45)], // for 2, 5, 8
		[new Sprite(assetsAliens,  156, 146, 47, 45), new Sprite(assetsAliens,  204, 146, 47, 45), new Sprite(assetsAliens,  256, 146, 44, 45)], //for 5, 8 (complex)
		[new Sprite(assetsAliens,  152, 11, 47, 33), new Sprite(assetsAliens,  204, 11, 44, 33)], // for 6, 9
		[new Sprite(assetsAliens,  152, 53, 47, 33), new Sprite(assetsAliens,  204, 53, 44, 33)], // for 9
		[new Sprite(assetsAliens,  152, 93, 47, 33), new Sprite(assetsAliens,  204, 93, 44, 33)], // for 3, 6, 9
		[
			new Sprite(assetsAliens,  10, 101, 37, 39), new Sprite(assetsAliens,  58, 101, 37, 39), new Sprite(assetsAliens,  12, 193, 37, 43), //for 4, 7
			new Sprite(assetsAliens,  1, 148, 38, 40), new Sprite(assetsAliens,  53, 148, 38, 40), new Sprite(assetsAliens,  5, 241, 38, 43)
		], 
		[
			new Sprite(assetsAliens,  106, 101, 37, 39), new Sprite(assetsAliens,  61, 195, 37, 39), new Sprite(assetsAliens,  109, 195, 37, 43), //for 7
			new Sprite(assetsAliens,  97, 147, 38, 40), new Sprite(assetsAliens,  56, 243, 38, 40), new Sprite(assetsAliens,  102, 243, 38, 43)
		],
		[new Sprite(assetsAliens,  306, 99, 92, 92), new Sprite(assetsAliens,  306, 191, 92, 92), new Sprite(assetsAliens,  306, 4, 92, 92)] // for 10
    ]  
  });
  
	assetsAliens.src = assetAlienPath;
  
	assetShip = new Image();
	assetShip.addEventListener("load", () => {
    sprites.ship = [new Sprite(assetShip, 2, 6, 55, 96), new Sprite(assetShip, 59, 6, 55, 96), new Sprite(assetShip, 117, 6, 55, 96)];
    sprites.bulletsShip = [
		new Sprite(assetShip, 178, 3, 5, 13), new Sprite(assetShip, 178, 18, 17, 14), 
		new Sprite(assetShip, 179, 35, 10, 17), new Sprite(assetShip, 178, 53, 23, 24)
	];
		sprites.gift = new Sprite(assetShip, 202, 46, 31, 34);
	nextInit();
  });
	assetShip.src = assetShipPath;
}

export function initGame(startRun, canvas) {
	gameState.cnvsBorder = ((canvas.width + 100) / 3 + 260)/2;
	
	//load levels
	config.levels.forEach(level => {
		let alSp = [];
		level.typeAliens.forEach(x=>alSp.push(sprites.aliens[x]));
		gameState.levels.push(
		new Level(level.typeLevel, level.countAlien, level.alienHP, 
			level.movementSpeedVX, level.movementSpeedVY, alSp, sprites.bulletsAliens[level.typeBullet], 
			canvas.width/2 - gameState.cnvsBorder, canvas.width/2 + gameState.cnvsBorder, canvas.height));
	});
	
	//init ship
	gameState.ship = new Ship(
		canvas.width/2 - gameState.cnvsBorder + 10, canvas.height - 200,
		sprites.ship, sprites.bulletsShip, canvas.width/2 - gameState.cnvsBorder, canvas.width/2 + gameState.cnvsBorder 
	);
	
	gameState.startRun = startRun;
		
	window.addEventListener('keydown', onPressedKey, true);
}

function levelLoop(){
	gameState.levels[gameState.numberLevel].constructorLevel();
	gameState.ship.hp += 1;
	gameState.bullets = [];
	gameState.bulletsAlien = [];
	gameState.bonus = [];
	gameState.startRun();
}

function randomX(cnvsL, cnvsR) {
		let rand = cnvsL + Math.random() * ((cnvsR - 50) - cnvsL);
		return Math.floor(rand);
	}

export function update(time, stopGame, canvas) {
	if (inputHandler.isDown(37)) { // Left
		gameState.ship.move(-4);
	}

	if (inputHandler.isDown(39)) { // Right
		gameState.ship.move(4);
	}

	if (inputHandler.isPressed(32)) { // Space
		gameState.bullets = gameState.bullets.concat(gameState.ship.shoot(canvas.height));
	}
  
		if(gameState.scoreLastBonus != Math.floor(gameState.score / 70)){
		gameState.bonus.push(new Gift(
		randomX(canvas.width/2 - gameState.cnvsBorder, canvas.width/2 + gameState.cnvsBorder),
		40, 6, sprites.gift));
		gameState.scoreLastBonus = Math.floor(gameState.score / 70);
	}
	
	gameState.bonus.forEach(g=>{
		if(g.intersects(gameState.ship)){
			gameState.catchedBonus+=1;
			if(gameState.catchedBonus % 3 == 0)
				gameState.ship.trimMode(1);
			if(gameState.catchedBonus % 7 == 0)
				gameState.ship.hp+=1;
		}
		g.move(canvas.height);
	});
	
	let level = gameState.levels[gameState.numberLevel];
	
	gameState.bulletsAlien = gameState.bulletsAlien.concat(level.shoot(time));
	
  gameState.bullets.forEach(b => { 
		b.update(time);
		level.aliens.forEach(x=>{
			if(x.intersects(b))	
				gameState.score += 5;
		});
  });
  
  level.getAlien();
  
	if(level.isCDbyAlien){
		level.aliens.forEach(x=> {
			if(gameState.ship.intersects(x))
				gameState.ship.trimMode(-2);
		})
	}
		
  gameState.bulletsAlien.forEach(b => { 
		b.update(time);
		if(gameState.ship.intersects(b)){
			gameState.ship.trimMode(-1);
		};
  });
  
  if (!gameState.ship.isAlive()){
		gameState.gameOver = true;
		stopGame();
  }
  
   if (level.isEnd){
	   if(gameState.numberLevel+1 == gameState.levels.length){
		  gameState.playerWin = true; 
		} else {
			gameState.nextLevel = true;
			stopGame();
		}
   }
  
	level.update(time, gameState.ship.left(), gameState.ship.right());

  gameState.bulletsAlien = gameState.bulletsAlien.filter(b => b.isAlive);
  gameState.bullets = gameState.bullets.filter(b => b.isAlive);
	gameState.bonus = gameState.bonus.filter(g => g.isAlive);
}

function drawSwitchLevel(canvas){
	const context = canvas.getContext('2d');
	context.font = "64px serif";
	context.fillStyle = "#FFFFFF";
	context.fillText("Level " + (gameState.numberLevel+2), canvas.width/2 - 110, canvas.height/2-150);
	context.font = "48px serif";
	context.fillText("Press Enter for start", canvas.width/2 - 185, canvas.height/2);
}

function drawWin(canvas){
	const context = canvas.getContext('2d');
	context.font = "64px serif";
	context.fillStyle = "#FFFFFF";
	context.fillText("Congratulation!", canvas.width/2 - 200, canvas.height/2-150);
	context.fillText("You won", canvas.width/2 - 120, canvas.height/2 - 70);
	context.font = "48px serif";
	context.fillText("Your score: " + gameState.score, canvas.width/2 - 155, canvas.height/2 - 10);
	context.fillText("Press Enter for repeat", canvas.width/2 - 200, canvas.height/2 + 80);
}

function drawGameOver(canvas){
	const context = canvas.getContext('2d');
	context.font = "64px serif";
	context.fillStyle = "#FFFFFF";
	context.fillText("You died", canvas.width/2 - 120, canvas.height/2 - 150);
	context.font = "48px serif";
	context.fillText("Your score: " + gameState.score, canvas.width/2 - 155, canvas.height/2 - 90);
	context.fillText("Level: " + (gameState.numberLevel+1), canvas.width/2 - 80, canvas.height/2 - 30);
	context.fillText("Press Enter for repeat", canvas.width/2 - 200, canvas.height/2 + 60);
}

export function draw(canvas, time) {
  const context = canvas.getContext('2d');
  context.clearRect(0, 0, canvas.width, canvas.height);

	if(gameState.nextLevel){
		drawSwitchLevel(canvas);
		return;
	}
	
	if(gameState.playerWin){
		drawWin(canvas);
		return;
	}
	
	if(gameState.gameOver){
		drawGameOver(canvas);
		return;
	}
	
	let cnvsL = canvas.width/2 - gameState.cnvsBorder;
	let cnvsR = canvas.width/2 + gameState.cnvsBorder;
	
	//borders
	context.beginPath();
	context.strokeStyle = "#FFFFFF";
	context.moveTo(cnvsL, 0);
	context.lineTo(cnvsL, canvas.height);
	context.moveTo(cnvsR, 0);
	context.lineTo(cnvsR, canvas.height);
	context.closePath();
	context.stroke();
	
	//info
	context.font = "48px serif";
	context.fillStyle = "#FFFFFF";
	context.fillText("Level " + (gameState.numberLevel + 1), cnvsL/2 - 65, 150);
	context.font = "40px serif";
	context.fillText("Score " + gameState.score, cnvsL/2 - 65, 200);
	
	context.drawImage(
      sprites.gift.img,
      sprites.gift.x, sprites.gift.y, sprites.gift.w, sprites.gift.h,
      (cnvsR + canvas.width)/2 - sprites.gift.w - 10, canvas.height - 3*sprites.ship[0].h, sprites.gift.w, sprites.gift.h
  );
	
	context.fillText(gameState.catchedBonus, (cnvsR + canvas.width)/2 + sprites.gift.w - 10, canvas.height - 2.65 * sprites.ship[0].h);
	
	context.drawImage(
    sprites.ship[0].img,
    sprites.ship[0].x, sprites.ship[0].y, sprites.ship[0].w, sprites.ship[0].h,
    (cnvsR + canvas.width)/2 - sprites.ship[0].w + 1, canvas.height - 2*sprites.ship[0].h, sprites.ship[0].w, sprites.ship[0].h
  );
	
	context.fillText(gameState.ship.hp, (cnvsR + canvas.width)/2 + sprites.gift.w - 10, canvas.height - 1.3 * sprites.ship[0].h);
	
	
  gameState.levels[gameState.numberLevel].drawAlien(context, time);
	gameState.bonus.forEach(g => g.draw(context));
  gameState.ship.draw(context, time);
  gameState.bullets.forEach(b => b.draw(context));
  gameState.bulletsAlien.forEach(b => b.draw(context));
}
