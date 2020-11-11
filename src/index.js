import {
  preload,
  initGame,
  update,
  draw
} from './game'

const canvas = document.getElementById("cnvs");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const tickLength = 15; //ms
let lastTick;
let lastRender;
let stopCycle;

function run(tFrame) {
    stopCycle = window.requestAnimationFrame(run);

    const nextTick = lastTick + tickLength;
    let numTicks = 0;

    if (tFrame > nextTick) {
        const timeSinceTick = tFrame - lastTick;
        numTicks = Math.floor(timeSinceTick / tickLength);
    }

    for (let i = 0; i < numTicks; i++) {
        lastTick = lastTick + tickLength;
        update(lastTick, stopGame, canvas);
    }

    draw(canvas, tFrame);
    lastRender = tFrame;
}

function stopGame() {
   window.cancelAnimationFrame(stopCycle);
}

function onPreloadComplete() {
  lastTick = performance.now();
  lastRender = lastTick;
  stopCycle = null;
  run();
}

function drawGameStart(context){
	context.font = "64px serif";
	context.fillStyle = "#FFFFFF";
	context.fillText("Space Invaders", canvas.width/2 - 195, canvas.height/2-170);
	context.font = "48px serif";
	context.fillText("(Special Edition)", canvas.width/2 - 150, canvas.height/2 - 110);
	context.fillText("Press Enter for start", canvas.width/2 - 185, canvas.height/2);
}

function nextInit(){
	drawGameStart(canvas.getContext('2d'));
	initGame(onPreloadComplete, canvas);
}

preload(nextInit);