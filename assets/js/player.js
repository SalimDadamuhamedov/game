import {keys} from "./consts.js"
import { shotBullet } from "./bullet.js";

canvas.addEventListener('touchstart', (e) => {
    const touch = e.touches[0];
    const touchX = touch.clientX;

    if (touchX < canvas.width / 2) {
        player.x -= player.speed;
    } else {
        player.x += player.speed;
    }
})

const movePlayer = (player) => {
    if (keys.ArrowLeft && player.x > 0) {
        player.x -= player.speed;
    }
    if (keys.ArrowRight && player.x + player.width < canvas.width) {
        player.x += player.speed;
    }
    if (keys.ArrowUp && player.y > 0) {
        player.y -= player.speed
    }
    if (keys.ArrowDown && player.y + player.height < canvas.height) {
        player.y += player.speed
    }
    if (keys.Space) {
        shotBullet(player)
    };

};


const drawPlayer = (player, ctx) => {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}



export { movePlayer, drawPlayer };