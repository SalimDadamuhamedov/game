function shotBullet(player) {

    
    if (player.bullets.length < 10) {
        
            player.bullets.push({
                x: player.x + player.width / 2 - 4,
                y: player.y,
                width: 8,
                height: 20,
                color: 'red',
                speed: 7,
            })

            const shoot = new Audio('/assets/sound/salim.mp3');
            shoot.play();
        
    }
};


function updateBullets(player) {
    player.bullets.forEach((bullet, index) => {
        bullet.y -= bullet.speed;
        if (bullet.y + bullet.height < 0) player.bullets.splice(index, 1);
    });
};


function drawBullets(player, ctx) {
    player.bullets.forEach(bullet => {
        ctx.fillStyle = bullet.color;
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
    });
}

export {shotBullet, updateBullets, drawBullets}