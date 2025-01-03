import { gameState } from "./utils.js";


const powers = [];
const powerSize = 25;
const powerSpeed = 1;

function spawnPower(canvas) {
    if (gameState.gameStart) {
        powers.push({
            x: Math.random() * (canvas.width - powerSize),
            y: -powerSize,
            width: powerSize,
            height: powerSize,
            color: 'gold',
            speed: powerSpeed,
        })
    }
}

function updatePower(player, canvas) {
    powers.forEach((power, index) => {
        power.y += powerSpeed;

        if (power.x + power.width > player.x &&
            power.x < player.x + player.width &&
            power.y + power.height > player.y &&
            power.y < player.y + player.height
        ) {
            powers.splice(index, 1);
            player.color = 'gold'
            const plus = new Audio('./assets/sound/power.mp3');
            plus.volume = 1;
            gameState.count += 3;
            if (gameState.lives < 3) gameState.lives += 1;
            plus.play();
            sizeBack(player);
        }

        if (power.y > canvas.height) {
            powers.splice(index, 1)
        }
    })
}


function sizeBack(player) {
    setTimeout(() => {
       player.color = 'white'
    }, 7000)
}

function drawPower(ctx) {
    powers.forEach(power => {
        ctx.fillStyle = power.color;
        ctx.fillRect(power.x, power.y, power.width, power.height)
    })
}

function clearPower() {
    powers.length = 0;
}


export {updatePower, spawnPower, drawPower, clearPower}