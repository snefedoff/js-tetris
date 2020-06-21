export default class Array2D {
    constructor(rows, columns) {
        this.rows = rows;
        this.columns = columns;

        this._array2d = new Array(rows);

        for (let i = 0; i < rows; i++) {
            const row = new Array(columns);
            for (let j = 0; j < columns; j++) {
                row[j] = 0;
            }
            this._array2d[i] = row;
        }
    }

    set(row, col, value) {
        if (row < 0 || col < 0) return;
        this._array2d[row][col] = value;
    }

    get(row, col) {
        if (row < 0 || col < 0) return 0;
        return this._array2d[row][col];
    }

    getArray2d() {
        return this._array2d;
    }

    clear() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                this._array2d[i][j] = 0;
            }
        }
    }

    clearRegion(row, col, other) {
        for (let i = 0; i < other.getRows(); i++) {
            for (let j = 0; j < other.getColumns(); j++) {
                const r = row + i;
                const c = col + j;
                if (!this.isOutOfBounds(r, c)) {
                    const block = other.get(i,j);
                    if (block && block.state > 0) {

                        this.set(r,c, 0);
                    }
                }
            }
        }
    }

    getRows() {
        return this.rows;
    }

    getColumns() {
        return this.columns;
    }

    isOutOfBounds(r, c) {
        return r < -2 || r > this.rows - 1 || c < 0 || c > this.columns - 1;
    }

    merge(row, col, other) {
        for (let i = 0; i < other.getRows(); i++) {
            for (let j = 0; j < other.getColumns(); j++) {
                const r = row + i;
                const c = col + j;
                const value = other.get(i, j);
                if (!this.isOutOfBounds(r, c) && value && r >= 0) {
                    this._array2d[r][c] = value;
                }
            }
        }
    }

    test(row, col, other) {
        let valuesOverwritten = 0;
        for (let i = 0; i < other.getRows(); i++) {
            for (let j = 0; j < other.getColumns(); j++) {
                const r = row + i;
                const c = col + j;
                if (!this.isOutOfBounds(r, c)) {
                    const thisBlock = this.get(r,c);
                    const otherBlock = other.get(i,j);
                    if (thisBlock && thisBlock.state === 1 && otherBlock && otherBlock.state > 0) {
                        valuesOverwritten++;
                    }
                } else if (other.get(i, j).state > 0) valuesOverwritten++;
            }
        }
        return valuesOverwritten === 0;
    }

    dropRow( row ) {
        this._array2d.splice(row, 1);
        const newRow = new Array(this.columns);
        for (let j = 0; j < this.columns; j++) {
            newRow[j] = 0;
        }
        this._array2d.unshift(newRow);
    }

    normalize() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                const block = this._array2d[i][j];
                if (block && block.state === 2) block.state = 1;
            }
        }
    }
}
