/*

    Conway's game of life

    Any live cell with two or three live neighbours survives.
    Any dead cell with three live neighbours becomes a live cell.
    All other live cells die in the next generation.
    Similarly, all other dead cells stay dead.
    
    [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ]

*/


const grid = document.getElementById('game');
let nextState = [];

seedGrid()

function seedGrid() {
    for (let i = 0; i < 100; i++) {
        const cell = document.createElement('div');
        cell.style.border = '1px solid black';
        if (Math.random() < 0.25) {
            cell.style.backgroundColor = 'black'
        }
        grid.appendChild(cell);
    }
}
