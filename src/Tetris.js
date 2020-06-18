import Figure from "./Figure";
import { FigureMap } from './FigureMatricies';
import { BLOCK_SIZE, GAME_FIELD_HEIGHT, GAME_FIELD_WIDTH, SPAWN_POINT_X, SPAWN_POINT_Y } from "./config";
import Array2D from "./Array2D";
import * as PIXI from "pixi.js";

export default class Tetris extends PIXI.Container {
    constructor() {
        super();
        this._gameField = new Array2D(GAME_FIELD_HEIGHT, GAME_FIELD_WIDTH);
        this._figure = null;
        this._stepTimer = 0;
        this._gameSpeed = 400;

        this.spawnFigure();
    }

    addSpriteBlock(row, col, texture) {
        const spriteBlock = new PIXI.Sprite( texture ? texture : PIXI.Texture.WHITE );
        spriteBlock.width = BLOCK_SIZE;
        spriteBlock.height = BLOCK_SIZE;
        spriteBlock.x = col * BLOCK_SIZE;
        spriteBlock.y = row * BLOCK_SIZE;
        spriteBlock.name = `${row}-${col}`;
        this.addChild(spriteBlock);
    }

    removeSpriteBlock(row, col) {
        this.removeChild(this.getChildByName(`${row}-${col}`));
    }

    updateSpriteBlock(row, col, newRow, newCol){
        const block = this.getChildByName(`${row}-${col}`);
        block.y = newRow * BLOCK_SIZE;
        block.x = newCol * BLOCK_SIZE;
        block.name = `${newRow}-${newCol}`;
    }

    _clearCurrentFigurePos() {
        this._gameField.clearRegion(this._figure.getPosY(), this._figure.getPosX(), this._figure.getCurrentState());
    }

    _mergeCurrentFigurePos() {
        this._gameField.merge(this._figure.getPosY(), this._figure.getPosX(), this._figure.getCurrentState());
    }

    _testCurrentFigurePos(x, y, rot) {
        let rotation = rot ?
            this._figure.getRotationArray((this._figure.getRotationId() + rot) % 4)
            : this._figure.getCurrentState();

        return this._gameField.test(this._figure.getPosY() + y, this._figure.getPosX() + x, rotation);
    }

    _selectRandomFigure() {
        return FigureMap[Math.floor(Math.random() * Math.floor(7))];
    }

    spawnFigure() {
        this.addFigure(this._selectRandomFigure(), SPAWN_POINT_X, SPAWN_POINT_Y);
        const indexes = this._figure.getCurrentState().getNonZeroIndexes();
        indexes.forEach( item => this.addSpriteBlock(item.row+this._figure.getPosY(), item.col+this._figure.getPosX()) );
    }

    dropFigure() {
        delete this._figure;
        this._gameField.normalize();
        this.checkFullRow();
    }

    addFigure(figure, x, y) {
        this._figure = new Figure(figure, x, y);
        this._mergeCurrentFigurePos();
    }

    checkFullRow() {
        let blockCount = 0;
        for (let i = 0; i < this._gameField.getRows(); i++) {
            blockCount = 0;
            for (let j = 0; j < this._gameField.getColumns(); j++) {
                if (this._gameField.get(i,j) !== 0) blockCount++;
            }
            if (blockCount === GAME_FIELD_WIDTH) {

                this._gameField.dropRow(i);
                for (let k = 0; k < this._gameField.getColumns(); k++) {
                    this.removeSpriteBlock(i, k);
                }
                console.log(this._gameField.getArray2d());
            }
        }
    }

    updateFigurePosition(x, y, rot) {
        this._clearCurrentFigurePos();
        if (rot) {
            const indexes = this._figure.getCurrentState().getNonZeroIndexes();
            indexes.forEach( item => this.addSpriteBlock(item.row+this._figure.getPosY(), item.col+this._figure.getPosX()) );
        }
        else {
            this._figure.getCurrentState().getNonZeroIndexes()
                .forEach(item => this.updateSpriteBlock(
                    item.row + this._figure.getPosY(),
                    item.col + this._figure.getPosX(),
                    item.row + this._figure.getPosY() + y,
                    item.col + this._figure.getPosX() + x
                    )
                );
        }
        this._figure.step(x, y);
        this._mergeCurrentFigurePos();
    }

    update(dt) {
        if (this._stepTimer <= 0) {
            if (this._figure) {
                if (this._testCurrentFigurePos(0, 1, 0)) {
                    this.updateFigurePosition(0, 1);
                } else {
                    this.dropFigure();
                    this.spawnFigure();
                }
            }
            this._stepTimer = this._gameSpeed;
        } else {
            this._stepTimer -= 1.0 * dt;
        }
    }

    moveLeft() {
        if (this._figure) {
            if (this._gameField.test(this._figure.getPosY(), this._figure.getPosX() - 1, this._figure.getCurrentState())) {
                this.updateFigurePosition(-1, 0);
            }
        }
    }

    moveRight() {
        if (this._figure) {
            if (this._gameField.test(this._figure.getPosY(), this._figure.getPosX() + 1, this._figure.getCurrentState())) {
                this.updateFigurePosition(1, 0);
            }
        }
    }

    moveDown() {
        this._stepTimer = 0;
    }

    rotate() {
        if (this._figure && this._testCurrentFigurePos(0, 0, 1)) {
            this._clearCurrentFigurePos();
            this._figure.getCurrentState().getNonZeroIndexes().forEach(
                item => this.removeSpriteBlock(
                item.row+this._figure.getPosY(),
                item.col+this._figure.getPosX(),
                )
            );
            this._figure.rotate();
            this.updateFigurePosition(0, 0, 1);
        }
    }
}
