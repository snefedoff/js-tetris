import Array2D from "./Array2D";

export const convertArray1D = (array1d, cols) => {
    const rows = array1d.length / cols;
    const array2d = new Array2D(rows, cols);

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            array2d.set( i, j, array1d[j + i * cols]);
        }
    }

    return array2d;
}
