import { gameState } from "./utils.js";

const enemies = [];
const enemySize = 100;
const en = {
    enemySpeed: 1,
}


let color = ['green', 'blue', 'orange', 'pink']

function spawnEnemy(canvas) {
    if (gameState.gameStart) {
        enemies.push({
            x: Math.random() * (canvas.width - enemySize),
            y: -enemySize,
            width: enemySize,
            height: enemySize,
            color: color[Math.floor(Math.random() * 4)],
            speed: en.enemySpeed,
        });
    }

    if (gameState.count % 15 === 0 && gameState.count !== 0 && en.enemySpeed <= 6) {
        en.enemySpeed += 0.2;
    }
}


function updateEnemies(player, canvas) {
    enemies.forEach((enemy, index) => {
        enemy.y += en.enemySpeed;


        if (enemy.x < player.x + player.width &&
            enemy.x + enemy.width > player.x &&
            enemy.y < player.y + player.height &&
            enemy.y + enemy.height > player.y) {
                enemies.splice(index, 1)
            gameState.lives--;
            const end = new Audio('/assets/sound/fayoz.mp3');
            end.play();
            if (gameState.lives === 0) {
                gameState.gameOver = true;
            }
        }

        if (enemy.y > canvas.height) {
            enemies.splice(index, 1);
            gameState.lives --;
            if (gameState.lives === 0 ) {
                gameState.gameOver = true;
                const lose = new Audio('/assets/sound/poraj.mp3');
                lose.play();
            }
        }

        player.bullets.forEach((bullet, bulindex) => {
            if (bullet.x < enemy.x + enemy.width &&
                bullet.x + bullet.width > enemy.x &&
                bullet.y < enemy.y + enemy.height &&
                bullet.y + bullet.height > enemy.y
            ) {
                enemies.splice(index, 1);
                player.bullets.splice(bulindex, 1);
                gameState.count++;
            }

        })
    })
}

function drawEnemies(ctx) {
    enemies.forEach(enemy => {
        ctx.fillStyle = enemy.color;
        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
    });
}

function clearEnemies() {
    enemies.length = 0;
}



export { drawEnemies, updateEnemies, spawnEnemy, clearEnemies, en}