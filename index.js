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
setInterval(getNextGridState, 1000)

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

function getNextGridState() {
    nextState = [];
    for (let i = 0; i < 100; i++) {
        getAliveNeighborCount(i, isCellAlive(i));
    }
    paintNextGridState();
}

function isCellAlive(index) {
    return grid.children[index].style.backgroundColor === 'black';
}

function getAliveNeighborCount(index, state) {
    let counter = 0;

    // top left corner
    if (index === 0) {
        isCellAlive(index + 1) ? ++counter : null;
        isCellAlive(index + 10) ? ++counter : null;
        isCellAlive(index + 11) ? ++counter : null;
    }

    // top right corner
    if (index === 9) {
        isCellAlive(index - 1) ? ++counter : null;
        isCellAlive(index + 10) ? ++counter : null;
        isCellAlive(index + 9) ? ++counter : null;
    }

    // bottom left corner
    if (index === 90) {
        isCellAlive(index + 1) ? ++counter : null;
        isCellAlive(index - 10) ? ++counter : null;
        isCellAlive(index - 9) ? ++counter : null;
    }

    // bottom right corner
    if (index === 99) {
        isCellAlive(index - 1) ? ++counter : null;
        isCellAlive(index - 10) ? ++counter : null;
        isCellAlive(index - 11) ? ++counter : null;
    }

    // top row 
    if (index > 0 && index < 9) {
        isCellAlive(index - 1) ? ++counter : null;
        isCellAlive(index + 1) ? ++counter : null;
        isCellAlive(index + 9) ? ++counter : null;
        isCellAlive(index + 10) ? ++counter : null;
        isCellAlive(index + 11) ? ++counter : null;
    }

    // bottom row 
    if (index > 90 && index < 99) {
        isCellAlive(index - 1) ? ++counter : null;
        isCellAlive(index + 1) ? ++counter : null;
        isCellAlive(index - 9) ? ++counter : null;
        isCellAlive(index - 10) ? ++counter : null;
        isCellAlive(index - 11) ? ++counter : null;
    }

    // left side
    if (index % 10 === 0 && index !== 0 && index !== 90) {
        isCellAlive(index - 10) ? ++counter : null;
        isCellAlive(index - 9) ? ++counter : null;
        isCellAlive(index + 1) ? ++counter : null;
        isCellAlive(index + 10) ? ++counter : null;
        isCellAlive(index + 11) ? ++counter : null;
    }

    // right side
    if (index % 10 === 9 && index !== 9 && index !== 99) {
        isCellAlive(index - 10) ? ++counter : null;
        isCellAlive(index - 11) ? ++counter : null;
        isCellAlive(index - 1) ? ++counter : null;
        isCellAlive(index + 10) ? ++counter : null;
        isCellAlive(index + 9) ? ++counter : null;
    }


    // all other nodes
    if (index % 10 !== 0 && index % 10 !== 9 && index > 9 && index < 89) {
        isCellAlive(index - 11) ? ++counter : null;
        isCellAlive(index - 10) ? ++counter : null;
        isCellAlive(index - 9) ? ++counter : null;
        isCellAlive(index - 1) ? ++counter : null;
        isCellAlive(index + 1) ? ++counter : null;
        isCellAlive(index + 9) ? ++counter : null;
        isCellAlive(index + 10) ? ++counter : null;
        isCellAlive(index + 11) ? ++counter : null;
    }

    if (state && (counter === 2 || counter === 3)) {
        nextState.push(1);
    } else if (!state && counter === 3) {
        nextState.push(1);
    } else {
        nextState.push(0)
    }
}

function paintNextGridState() {
    nextState.forEach((num, i) => {
        if (num === 0) {
            grid.children[i].style.backgroundColor = 'white';
        }
        if (num === 1) {
            grid.children[i].style.backgroundColor = 'black';
        }
    })

    if (nextState.filter(i => i === 0).length === 0 || nextState.filter(i => i === 1).length === 0) {
        console.log('replace')
        grid.replaceChildren()
        seedGrid()
    }
}