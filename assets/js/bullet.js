function shotBullet(player) {

    
    if (player.bullets.length < 1) {
        
            player.bullets.push({
                x: player.x + player.width / 2 - 10,
                y: player.y,
                width: 20,
                height: 40,
                color: 'red',
                speed: 20,
            })

            const shoot = new Audio('./assets/sound/salim.mp3');
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