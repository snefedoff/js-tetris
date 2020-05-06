import * as PIXI from "pixi.js";
import * as config from './config';

// export const Trino = [
//     1, 1, 0, 0,
//     0, 1, 1, 0,
//     0, 0, 0, 0,
//     0, 0, 0, 0,
// ];

export const T = [
    '0100111000000000',
    '0100011001000000',
    '0000111001000000',
    '0100110001000000',
];

export const O = [];
export const I = [];
export const S = [];
export const Z = [];
export const J = [];
export const L = [];

export class Block {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        const { BLOCK_SIZE } = config;
        this.sprite = new PIXI.Sprite(PIXI.Texture.WHITE);
        this.sprite.x = x * BLOCK_SIZE;
        this.sprite.y = y * BLOCK_SIZE;
        this.sprite.width = BLOCK_SIZE;
        this.sprite.height = BLOCK_SIZE;
    }

    setPos(x, y) {
        const { BLOCK_SIZE } = config;
        this.x = x;
        this.y = y;
        this.sprite.x = x * BLOCK_SIZE;
        this.sprite.y = y * BLOCK_SIZE;
    }
}

export class Figure {
    constructor(matrix, x, y) {
        this._figureMatrix = matrix.split('').map(item => +item);
        this._blocks = [];
        this.posX = x;
        this.posY = y;

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (this._figureMatrix[i + j * 4]) {
                    this._blocks.push( new Block(i,j) );
                }
            }
        }
    }

    getBlocks() {
        return this._blocks;
    }

    move(dirX, dirY) {
        //this.posX += dirX;
        //this.posY += dirY;
        this._blocks.map( item => item.setPos(dirX + item.x, dirY + item.y));
    }
}
