import {movePlayer, drawPlayer} from "./player.js"
import { keys, player, canvas } from "./consts.js"
import { updateBullets, drawBullets } from "./bullet.js";
import { spawnEnemy, updateEnemies, drawEnemies, clearEnemies, en } from "./enemy.js";
import { gameState } from "./utils.js";
import { spawnPower, updatePower, drawPower, clearPower } from "./power.js";




const ctx = canvas.getContext('2d');

ctx.fillStyle = 'gray';
ctx.textAlign = 'center';
ctx.font = '50px Heebo';
ctx.fillText('TAP TO PLAY...', canvas.width / 2, canvas.height / 2)




let spawnInterval = 1000;


window.addEventListener('keydown', (e) => keys[e.code] = true);
window.addEventListener('keyup', (e) => keys[e.code] = false);

canvas.addEventListener('touchstart', () => keys.Space = true);
canvas.addEventListener('touchend', () => keys.Space = false)


function writeLives() {
    ctx.fillStyle = 'red';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'top';
    ctx.font = '30px Arial';
    ctx.fillText(`${gameState.lives} / 3`, canvas.width - 5, 10);
}

function writeScore() {
    ctx.fillStyle = 'white';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.font = '30px Arial'
    ctx.fillText(`score: ${gameState.count}`, 10, 10)
}


function gameLoop() {
if (gameState.gameOver) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    gameState.gameStart = false;
    // это нужно, чтобы остановить музыку после поражения.
    back.pause()

    ctx.fillStyle = 'red';
    ctx.font = '70px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Game over', canvas.width / 2, canvas.height / 2);
    ctx.fillStyle = 'yellow';
    ctx.textAlign = 'center';
    ctx.font = '40px Yantramanav';
    ctx.fillText(`Your score: ${gameState.count}`, canvas.width / 2 , canvas.height / 2 + 50);

    canvas.addEventListener('dblclick', resetGame)

    
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
        const touchX = touch.clientX;

        player.x = touchX - player.width / 2;



        if (player.x < 0) player.x = 0;
        if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
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
    player.x = canvas.width / 2 - 50;
    player.y = canvas.height - 200;
    player.bullets.length = 0;
    clearEnemies();
    clearPower();
    gameState.count = 0;
    gameState.lives = 3;
    gameState.gameStart = true;
    en.enemySpeed = 2;
    gameLoop()
    player.color = 'white';
    // это, чтобы при нажатии на ентер начать музыку.
    musicPlay();
    canvas.removeEventListener('dblclick', resetGame);
}

const back = new Audio('./assets/sound/back.mp3');
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