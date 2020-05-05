import * as PIXI from "pixi.js";
import * as config from './config';

// export const Trino = [
//     0, 1, 0, 0,
//     1, 1, 0, 0,
//     0, 1, 0, 0,
//     0, 0, 0, 0,
// ];

export const Trino = {
    a: '0100111000000000',
    b: '0100011001000000',
    c: '0000111001000000',
    d: '0100110001000000',
}

export class Figure {
    constructor(matrix, x, y) {
        this._figureMatrix = matrix;
        this._blocks = [];
        this.posX = x;
        this.posY = y;

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (this._figureMatrix[i + j * 4]) {
                    this._blocks.push({x: i, y: j});
                }
            }
        }
    }

    getBlocks() {
        return this._blocks;
    }

    move(dirX, dirY) {
        this.posX += dirX;
        this.posY += dirY;
    }
}
