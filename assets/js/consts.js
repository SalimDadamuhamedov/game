const keys = {
    ArrowLeft: false,
    ArrowRight: false,
    ArrowUp: false,
    ArrowDown: false,
    Space: false,
};


const player = {
    x: canvas.width / 2 - 50,
    y: canvas.height - 200,
    width: 100,
    height: 100,
    color: 'white',
    speed: 15,
    bullets: []
};



export {keys, player}