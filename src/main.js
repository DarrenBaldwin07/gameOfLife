import { countAdjCells } from '../helpers/countNeighs.js'

const startGame = document.getElementById('start-game');
const randGrid = document.getElementById('gen-rand');

// columns, rows - (THESE VALUESs NEED TO BE THE CANVAS WIDTH X CANVAS HEIGHT)
// right now for each 1 that we find we render out one (10 x 10) square 
let gridHeight = 80;
let gridWidth =  80;

// create grid
const createArray = function(rows) {
    let arr = [];

    for (let i = 0; i < rows; i++) {
        arr[i] = [];
    };

    return arr;
};


const createGridRandomly = function(grid) {

    for (let i = 0; i < gridHeight; i++) {
        
        for (let j = 0; j < gridWidth; j++) {
            const randOneZero = Math.floor(Math.random() * 2);
            // gets me a random zero or 1 to append to array
            if (randOneZero === 1) {
                grid[i][j] = 1;
            } else {
                grid[i][j] = 0;
            }; 
        };
    };
}; 



// 80 x 80 (80 rows of 80 cells)
const drawGrid = function(grid) {
    const mainCanvas = document.querySelector('canvas');
    const context = mainCanvas.getContext('2d');
    context.clearRect(0, 0, 800, 800);
    let countery = 0;
    let counterx = 0;
    for (let i = 0; countery < gridHeight; i += 10) {
        
        counterx = 0;
        for (let j = 0; counterx < gridWidth; j += 10) {
            if (grid[countery][counterx] === 1) {
                context.fillStyle = '#FF0000';
                context.fillRect(j, i, 10, 10);
            };
            
            counterx += 1; 
        };
        countery += 1;
    }; 
};




// 80 x 80 - 80 rows of 10 pixel cells
const showRandTemp = function() {
    let grid = createArray(gridWidth);
    createGridRandomly(grid);
    drawGrid(grid);
    
    return grid;
};



let grid2 = createArray(gridWidth);

let grid = showRandTemp();
const playGame = function() {
    drawGrid(grid);
    grid2 = countAdjCells(grid, grid2, gridHeight, gridWidth);

    for (let i = 0; i < gridHeight; i++) {
        for (let j = 0; j < gridWidth; j++) {
            grid[i][j] = grid2[i][j];
        };
    };

    requestAnimationFrame(playGame);
};


// buttons for starting game and creating random grid
startGame.addEventListener('click', playGame);
randGrid.addEventListener('click', () => {
    location.reload();
}); 













