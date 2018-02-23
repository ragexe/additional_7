module.exports = function solveSudoku(matrix) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (matrix[row][col] === 0) {
                let candidates = getCandidates(row, col);
                for (let candidate of candidates) {
                    matrix[row][col] = candidate;
                    let attempt = solveSudoku(matrix);
                    if (attempt) return attempt;
                }
                matrix[row][col] = 0;
                return false;
            }
        }
    }
    return matrix;

    function getCandidates(row, col) {
        let candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        let areas = {
            row: [],
            col: [],
            block: {
                row: Math.floor(row / 3) * 3,
                col: Math.floor(col / 3) * 3,
                values: []
            }
        };

        for (let i = 0; i < 9; i++) {
            if (matrix[row][i] !== 0) areas.row.push(matrix[row][i]);
            if (matrix[i][col] !== 0) areas.col.push(matrix[i][col]);
            if (matrix[areas.block.row + i % 3][areas.block.col + Math.floor(i / 3)] !== 0)
                areas.block.values.push(matrix[areas.block.row + Math.floor(i / 3)][areas.block.col + i % 3])
        }

        candidates = candidates
            .filter((number) => !areas.row.includes(number))
            .filter((number) => !areas.col.includes(number))
            .filter((number) => !areas.block.values.includes(number));

        return candidates;
    }
};
