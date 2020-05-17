import * as PIXI from "pixi.js";
import * as config from './config';

class Block {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        const {BLOCK_SIZE} = config;
        this.sprite = new PIXI.Sprite(PIXI.Texture.WHITE);
        this.sprite.x = x * BLOCK_SIZE;
        this.sprite.y = y * BLOCK_SIZE;
        this.sprite.width = BLOCK_SIZE;
        this.sprite.height = BLOCK_SIZE;
    }

    setPos(x, y) {
        const {BLOCK_SIZE} = config;
        this.x = x;
        this.y = y;
        this.sprite.x = x * BLOCK_SIZE;
        this.sprite.y = y * BLOCK_SIZE;
    }
}

export default class Figure {
    constructor(matricies, x, y) {
        this._figureMatrixAll = [...matricies];
        console.log(this._figureMatrixAll);
        this.rotateId = 0;
        this._figureCurrentMatrix = this._figureMatrixAll[this.rotateId].split('').map(item => +item);
        this._blocks = [];

        this._figurePosition = {x: x, y: y};

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (this._figureCurrentMatrix[i + j * 4]) {
                    this._blocks.push(new Block(i + x, j + y));
                }
            }
        }
    }

    rotate() {
        this.rotateId = (this.rotateId + 1) % 4;
        this.rebuildBlocks();
    }

    rebuildBlocks() {
        this._figureCurrentMatrix = this._figureMatrixAll[this.rotateId].split('').map(item => +item);
        let blockNum = 0;
        const maxBlocks = this._blocks.length;
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (this._figureCurrentMatrix[i + j * 4]) {
                    this._blocks[blockNum].setPos(i + this._figurePosition.x, j + this._figurePosition.y);
                    blockNum += 1;
                    if (blockNum > maxBlocks) return;
                }
            }
        }
    }

    getBlocks() {
        return this._blocks;
    }

    getMatrix() {
        return this._figureCurrentMatrix;
    }

    getPosition() {
        return this._figurePosition;
    }

    move(dirX, dirY) {
        this._figurePosition.x += dirX;
        this._figurePosition.y += dirY;
        for (let i = 0; i < this._blocks.length; i++) {
            const item = this._blocks[i];
            item.setPos(dirX + item.x, dirY + item.y);
        }
    }
}
