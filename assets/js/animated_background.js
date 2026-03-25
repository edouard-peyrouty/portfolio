import { createGameOfLife } from 'https://cdn.jsdelivr.net/gh/edouard-peyrouty/Jeu-de-la-vie@main/JavaScript/jeu-de-la-vie.js';

const bg = document.getElementById('bg-canvas');
bg.width = window.innerWidth;
bg.height = window.innerHeight;

let size = 30;

const game = createGameOfLife(bg, {
    rows: Math.ceil(window.innerHeight / size),
    cols: Math.ceil(window.innerWidth / size),
    cell: size,
    borderRadius: 4,
    aliveColor: '#CA3C66',
    deadColor: 'transparent',
    borderColor: 'transparent',
    borderWidth: 3,
    clickable: false,
    speed: 100,
    density: 0.3
});

game.randomize();
game.start();

window.addEventListener('resize', () => {
    bg.width = window.innerWidth;
    bg.height = window.innerHeight;
});