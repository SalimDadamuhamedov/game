const keys = {
    ArrowLeft: false,
    ArrowRight: false,
    ArrowUp: false,
    ArrowDown: false,
    Space: false,
};


const player = {
    x: canvas.width / 2 - 15,
    y: canvas.height - 50,
    width: 60,
    height: 60,
    color: 'white',
    speed: 5,
    bullets: []
};



export {keys, player}