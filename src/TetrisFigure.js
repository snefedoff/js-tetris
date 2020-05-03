import * as PIXI from "pixi.js";
import * as config from './config';

const figureT = [
    0, 1, 0, 0,
    1, 1, 1, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
];

export default class TetrisFigure {
    constructor(matrix) {
        this._figureMatrix = matrix;
        this._blocks = [];
        this._position = {x:0,y:0};

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (this._figureMatrix[i * j]) {
                    this._blocks.push(this.createBlock());
                }
            }
        }
    }

    createBlock(x, y) {
        const {BLOCK_SIZE} = config;
        const block = PIXI.Sprite.from('assets/block.png');
        block.x = x;
        block.y = y;
        block.width = BLOCK_SIZE;
        block.height = BLOCK_SIZE;
        return block;
    }
}
