const keys = {
    ArrowLeft: false,
    ArrowRight: false,
    ArrowUp: false,
    ArrowDown: false,
    Space: false,
};


const player = {
    x: canvas.width / 2 - 20,
    y: canvas.height - 50,
    width: 35,
    height: 35,
    color: 'white',
    speed: 5,
    bullets: []
};



export {keys, player}