import * as PIXI from "pixi.js";
import * as config from './config';

class Block {
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

export default class Figure {
    constructor(matrix, x, y) {
        this._figureMatrix = matrix.split('').map(item => +item);
        this._blocks = [];

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (this._figureMatrix[i + j * 4]) {
                    this._blocks.push( new Block(i+x,j+y) );
                }
            }
        }
    }

    getBlocks() {
        return this._blocks;
    }

    move(dirX, dirY) {
        for (let i = 0; i < this._blocks.length; i++) {
            const item = this._blocks[i];
            item.setPos(dirX + item.x, dirY + item.y);
        }
    }
}
