import Figure from "./Figure";
import {FigureMap} from './FigureMatricies';
import {
    BLOCK_SIZE,
    GAME_FIELD_HEIGHT,
    GAME_FIELD_WIDTH,
    SPAWN_POINT_X,
    SPAWN_POINT_Y
} from "./config";
import Array2D from "./Array2D";
import {
    Sprite,
    Texture,
    Container, Text
} from "pixi.js";
import State from "./State";

// TODO all states graphics design

export default class Tetris extends State{
    constructor(context) {
        super(context);
        this._gameField = new Array2D(GAME_FIELD_HEIGHT, GAME_FIELD_WIDTH);
        this._figure = null;
        this._nextFigure = null;
        this._stepTimer = 0;
        this._gameSpeed = 400;
        this._score = 0;
        this._scoreText = new Text('0',{ font: 'bold 60px Arial', fill: '#3e1707', align: 'center', stroke: '#fff', strokeThickness: 2 });
        this._scoreText.x = 450;
        this._scoreText.y = 150;
        this.addChild(this._scoreText);

        this.spawnFigure();
        this._createSpriteGrid();
        this._createNextFigurePreview();
    }

    _createSpriteGrid() {
        for (let i = 0; i < GAME_FIELD_HEIGHT; i++) {
            for (let j = 0; j < GAME_FIELD_WIDTH; j++) {
                const sprite = new Sprite(Texture.WHITE);
                sprite.x = j * BLOCK_SIZE;
                sprite.y = i * BLOCK_SIZE;
                sprite.width = BLOCK_SIZE;
                sprite.height = BLOCK_SIZE;
                sprite.tint = 0xFFFFFF;
                sprite.name = `${i}-${j}`;
                sprite.visible = false;
                this.addChild(sprite);
            }
        }
    }

    _renderSpriteGrid() {
        for (let i = 0; i < GAME_FIELD_HEIGHT; i++) {
            for (let j = 0; j < GAME_FIELD_WIDTH; j++) {
                const block = this._gameField.get(i, j);
                const blockSprite = this.getChildByName(`${i}-${j}`);
                blockSprite.visible = false;
                if (block) {
                    blockSprite.visible = true;
                    blockSprite.tint = block.color;
                }
            }
        }
    }

    _createNextFigurePreview() {
        const nextFigure = new Container();
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                const sprite = new Sprite(Texture.WHITE);
                sprite.x = j * BLOCK_SIZE;
                sprite.y = i * BLOCK_SIZE;
                sprite.width = BLOCK_SIZE;
                sprite.height = BLOCK_SIZE;
                sprite.tint = 0xFFFFFF;
                sprite.name = `next-figure-${i}-${j}`;
                sprite.visible = false;
                nextFigure.addChild(sprite);
            }
        }
        nextFigure.x = 430;
        nextFigure.y = 10;
        nextFigure.name = 'next-figure';
        this.addChild(nextFigure);
    }

    _renderNextFigurePreview() {
        if (this._nextFigure) {
            const figure = this._nextFigure.getRotationArray(0);
            for (let i = 0; i < 4; i++) {
                for (let j = 0; j < 4; j++) {
                    const block = figure.get(i, j);
                    const blockSprite = this.getChildByName('next-figure').getChildByName(`next-figure-${i}-${j}`);
                    blockSprite.visible = false;
                    if (block) {
                        blockSprite.visible = true;
                        blockSprite.tint = block.color;
                    }
                }
            }
        }
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
        if (!this._nextFigure) {
            this._nextFigure = new Figure(this._selectRandomFigure(), SPAWN_POINT_X, SPAWN_POINT_Y);
            this.addNextFigure();
            this._nextFigure = new Figure(this._selectRandomFigure(), SPAWN_POINT_X, SPAWN_POINT_Y);
        }
        else {
            this.addNextFigure();
            this._nextFigure = new Figure(this._selectRandomFigure(), SPAWN_POINT_X, SPAWN_POINT_Y);
        }
    }

    isGameOver() {
        return this._figure.getPosY() < 1;
    }

    resetState() {
        this._score = 0;
        this._scoreText.text = '0';
        this._gameField.clear();
        this.context.changeState('menu');
    }

    dropFigure() {
        if (this.isGameOver()) {
            this.resetState();
            return;
        }
        delete this._figure;
        this._gameField.normalize();
        this.checkFullRow();
    }

    addNextFigure() {
        this._figure = this._nextFigure;
        this._mergeCurrentFigurePos();
    }

    checkFullRow() {
        let blockCount = 0;
        let comboCount = 0
        for (let i = 0; i < this._gameField.getRows(); i++) {
            blockCount = 0;
            for (let j = 0; j < this._gameField.getColumns(); j++) {
                if (this._gameField.get(i, j) !== 0) blockCount++;
            }
            if (blockCount === GAME_FIELD_WIDTH) {
                this._gameField.dropRow(i);
                this._score += 100;
                comboCount++;
            }
        }
        if (comboCount >= 4) this._score = this._score * 4;
        if (comboCount >= 2) this._score = this._score * 2;
        this._scoreText.text = this._score;
    }

    updateFigurePosition(x, y) {
        this._clearCurrentFigurePos();
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
        this._renderSpriteGrid();
        this._renderNextFigurePreview();
    }

    onKeyLeft() {
        if (this._figure) {
            if (this._gameField.test(this._figure.getPosY(), this._figure.getPosX() - 1, this._figure.getCurrentState())) {
                this.updateFigurePosition(-1, 0);
            }
        }
    }

    onKeyRight() {
        if (this._figure) {
            if (this._gameField.test(this._figure.getPosY(), this._figure.getPosX() + 1, this._figure.getCurrentState())) {
                this.updateFigurePosition(1, 0);
            }
        }
    }

    onKeyDown() {
        this._stepTimer = 0;
    }

    onKeyUp() {
        if (this._figure && this._testCurrentFigurePos(0, 0, 1)) {
            this._clearCurrentFigurePos();
            this._figure.rotate();
            this.updateFigurePosition(0, 0, 1);
        }
    }

    onEnter(){}
}
