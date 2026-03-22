import { createGameOfLife } from 'https://cdn.jsdelivr.net/gh/edouard-peyrouty/Jeu-de-la-vie@main/JavaScript/jeu-de-la-vie.js';

const canvas = document.getElementById('canvas');
const btnPlay = document.getElementById('btnPlay');

const game = createGameOfLife(canvas, {
    rows: 25,
    cell: 17,
    borderRadius: 3,
    aliveColor: '#CA3C66',
    deadColor: '#E8AABE',
    borderColor: '#F4D6E0',
    borderWidth: 2,
    clickable: true,
    speed: 120,
    density: 0.3
});

btnPlay.addEventListener('click', function() {
    const isNowRunning = game.toggle();
    this.textContent = isNowRunning ? 'Pause' : 'Lancer';
});

document.getElementById('btnRandom').addEventListener('click', () => game.randomize());

document.getElementById('btnClear').addEventListener('click', () => {
    game.clear();
    btnPlay.textContent = 'Lancer';
});

game.randomize();
game.start();