import {movePlayer, drawPlayer} from "./player.js"
import { keys, player } from "./consts.js"
import { updateBullets, drawBullets, shotBullet } from "./bullet.js";
import { spawnEnemy, updateEnemies, drawEnemies, clearEnemies, en } from "./enemy.js";
import { gameState } from "./utils.js";
import { spawnPower, updatePower, drawPower, clearPower } from "./power.js";

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

ctx.fillStyle = 'gray';
ctx.textAlign = 'center';
ctx.font = '20px Heebo';
ctx.fillText('TAP TO PLAY...', canvas.width / 2, canvas.height / 2)




let spawnInterval = 1000;


window.addEventListener('keydown', (e) => keys[e.code] = true);
window.addEventListener('keyup', (e) => keys[e.code] = false);

function writeLives() {
    ctx.fillStyle = 'red';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'top';
    ctx.font = '10px Arial';
    ctx.fillText(`${gameState.lives} / 3`, canvas.width - 5, 10);
}

function writeScore() {
    ctx.fillStyle = 'white';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.font = '10px Arial'
    ctx.fillText(`score: ${gameState.count}`, 10, 10)
}


function gameLoop() {
if (gameState.gameOver) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // это нужно, чтобы остановить музыку после поражения.
    back.pause()

    ctx.fillStyle = 'red';
    ctx.font = '40px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Game over', canvas.width / 2, canvas.height / 2);
    ctx.fillStyle = 'yellow';
    ctx.textAlign = 'center';
    ctx.font = '16px Yantramanav';
    ctx.fillText(`Your score: ${gameState.count}`, canvas.width / 2 , canvas.height / 2 + 30);

    
    return;
}

    
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    movePlayer(player);
    updateBullets(player);
    updateEnemies(player, canvas);

    drawPlayer(player, ctx);
    drawBullets(player, ctx);
    drawEnemies(ctx);

    updatePower(player, canvas);
    drawPower(ctx);

    writeLives()
    writeScore()

    requestAnimationFrame(gameLoop)

    window.removeEventListener('keydown', gameLoop);
    canvas.removeEventListener('click', gameLoop);

    gameState.gameStart = true;

    canvas.addEventListener('touchmove', (e) => {
        e.preventDefault()
        const touch = e.touches[0];
        const rect = canvas.getBoundingClientRect();
        const touchX = touch.clientX - rect.left;

        player.x = touchX - player.width / 2;
    })

}

setInterval(() => {
    spawnEnemy(canvas)
}, spawnInterval); 

setInterval(() => {
    spawnPower(canvas)
}, 10000)

window.addEventListener('keydown', gameLoop);
canvas.addEventListener('click', gameLoop)

window.addEventListener('keydown', (e) => {
    if (e.code === 'Enter' && gameState.gameOver) {
        resetGame();
    }
})




function resetGame() {
    gameState.gameOver = false;
    player.x = canvas.width / 2 - 20;
    player.y = canvas.height - 50;
    player.bullets.length = 0;
    clearEnemies();
    clearPower();
    gameState.count = 0;
    gameState.lives = 3;
    en.enemySpeed = 1;
    gameLoop()
    player.color = 'white';
    // это, чтобы при нажатии на ентер начать музыку.
    musicPlay();
}

const back = new Audio('/assets/sound/back.mp3');
back.volume = 0.5;
back.loop = true;
back.pause();

// я делаю это, чтоб начать музыку
window.addEventListener('keydown', musicPlay);
canvas.addEventListener('click', musicPlay)

// функция
function musicPlay() {
    
    // это нужно, чтобы музыка начиналась с начала после game overa
    back.currentTime = 0;
    back.play()
    
    window.removeEventListener('keydown', musicPlay);
    canvas.removeEventListener('click', musicPlay)
}