const keys = {
    ArrowLeft: false,
    ArrowRight: false,
    ArrowUp: false,
    ArrowDown: false,
    Space: false,
};


const player = {
    x: canvas.width / 2 - 15,
    y: canvas.height - 110,
    width: 100,
    height: 100,
    color: 'white',
    speed: 5,
    bullets: []
};



export {keys, player}