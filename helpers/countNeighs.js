// x,y = row, col

// RULES
    // Any live cell with fewer than two live neighbours dies, as if by underpopulation.
    // Any live cell with two or three live neighbours lives on to the next generation. - //
    // Any live cell with more than three live neighbours dies, as if by overpopulation.
    // Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

// array is the main grid - mirror is grid2
export const countAdjCells = (array, mirror, gridHeight, gridWidth) => {

    for (let x = 1; x < gridHeight - 1; x++) {
        for (let y = 1; y < gridWidth -1; y++) {
            let totalneighs = 0;
            totalneighs += array[x - 1][y - 1];
            totalneighs += array[x][y - 1];
            totalneighs += array[x + 1][y - 1];
            totalneighs += array[x - 1][y];
            totalneighs += array[x + 1][y];
            totalneighs += array[x - 1 ][ y + 1 ];
            totalneighs += array[x][y + 1];
            totalneighs += array[x + 1][ y + 1];

            // apply rules to each cell
            if (array[x][y] === 0) {
                switch(totalneighs) {
                    case 3:
                        mirror[x][y] = 1; // if ded cell but has 3 neighs then it gets reproduced
                        break;
                    default:
                        mirror[x][y] = 0; // if not just leave cell ded
                };
            } else if(array[x][y] === 1) {
                switch(totalneighs) {
                    case 0:
                    case 1:
                        mirror[x][y] = 0;
                        break;
                    case 2:
                    case 3:
                        mirror[x][y] = 1; // keep life
                        break;
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                    case 8: // will only have up to 8 neighs
                        mirror[x][y] = 0; // die of over-population
                        break;
                    default:
                        mirror[x][y] = 0;

                };
            };
        };
    };

    return mirror
}; 

