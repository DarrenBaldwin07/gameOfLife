import {countAdjCells} from '../helpers/countNeighs.js'

const startGame = document.getElementById('start-game');
const randGrid = document.getElementById('gen-rand');
const mainCanvas = document.querySelector('canvas');
const context = mainCanvas.getContext('2d');

// columns, rows - (THESE VALUESs NEED TO BE THE CANVAS WIDTH X CANVAS HEIGHT)
// right now for each 1 that we find we render out one (one pixel) square 
let canvasDimensions = [window.innerWidth - 100, window.innerHeight * (0.75)];

let tileSize = 10;
// let gridWidth = canvasDimensions[0] / tileSize;
// let gridHeight = canvasDimensions[1] / tileSize;
let gridWidth = 5;
let gridHeight = 5;


mainCanvas.width = canvasDimensions[0];
mainCanvas.height = canvasDimensions[1];
// create grid
const createArray = function (rows) {
    let arr = [];

    for (let i = 0; i < rows; i++) {
        arr[i] = [];
    };

    return arr;
};

let grid2 = createArray(gridWidth);
let grid = createArray(gridWidth);
// Change: Make it such that each array inside the main array is either all 0s or all ones (not a random mix)

const createGridRandomly = function (grid) {

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

const clickGrid = function(grid) {

}

// 80 x 80 (80 rows of 80 cells)
const drawGrid = function (grid) {

    context.clearRect(0, 0, canvasDimensions[0], canvasDimensions[1]);
    let countery = 0;
    let counterx = 0;
    for (let i = 0; countery < gridHeight; i += tileSize) {

        counterx = 0;
        for (let j = 0; counterx < gridWidth; j += tileSize) {
            if (grid[countery][counterx] === 1) {
                context.fillStyle = '#FF0000';
                context.shadowBlur = 5;
                context.shadowColor = "red";
                context.fillRect(j, i, tileSize, tileSize);
            };

            counterx += 1;
        };
        countery += 1;
    };
};
// 80 x 80 - 80 rows of 10 pixel cells

const playGame = function () {
    drawGrid(grid);
    grid2 = countAdjCells(grid, grid2, gridHeight, gridWidth);

    for (let i = 0; i < gridHeight; i++) {
        for (let j = 0; j < gridWidth; j++) {
            grid[i][j] = grid2[i][j];
        };
    };

    requestAnimationFrame(playGame);
};

createGridRandomly(grid);
drawGrid(grid);
mainCanvas.addEventListener("click", (event) => {
    let mouseCoordinates = [event.clientX - mainCanvas.getBoundingClientRect().left, event.clientY - mainCanvas.getBoundingClientRect().top] //store the user's x,y coordinate in an array
    for(let i = 0; i < gridHeight; i++) {
        for(let j = 0; j < gridWidth; j++){
            if(mouseCoordinates[0] >= (j * tileSize) && mouseCoordinates[0] <= ((j * tileSize) + tileSize) && mouseCoordinates[1] >= (i * tileSize) && mouseCoordinates[1] <= ((i * tileSize)+tileSize)) {
                let clickedCell = grid[i][j];
                console.log(clickedCell)
                if(clickedCell == 1){
                    console.log("this cell is 1")
                }else {
                    console.log("this cell is 0")
                };
            };
        };
    };
});

startGame.addEventListener('click', playGame);
randGrid.addEventListener('click', () => {
    createGridRandomly(grid);
    drawGrid(grid);
})