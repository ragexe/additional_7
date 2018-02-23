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
        let result = [];
        let area = {
            row: Math.floor(row / 3) * 3,
            col: Math.floor(col / 3) * 3,
        };

        for (let i = 0; i < 9; i++) {
            result.push([matrix[row][i], matrix[i][col], matrix[area.row + i % 3][area.col + Math.floor(i / 3)]])
        }

        candidates.filter((value) => !result.includes(value))
        return result;
    }
};
