const keys = {
    ArrowLeft: false,
    ArrowRight: false,
    ArrowUp: false,
    ArrowDown: false,
    Space: false,
};


const player = {
    x: canvas.width / 2 - 20,
    y: canvas.height - 60,
    width: canvas.width / 8,
    height: canvas.width / 8,
    color: 'white',
    speed: 5,
    bullets: []
};



export {keys, player}