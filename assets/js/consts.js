const keys = {
    ArrowLeft: false,
    ArrowRight: false,
    ArrowUp: false,
    ArrowDown: false,
    Space: false,
};


const player = {
    x: canvas.width / 2 - 15,
    y: canvas.height - 55,
    width: 30,
    height: 30,
    color: 'white',
    speed: 5,
    bullets: []
};



export {keys, player}