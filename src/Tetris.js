import Figure from "./Figure";
import * as Figures from './FigureMatricies';
import {GAME_FIELD_HEIGHT, GAME_FIELD_WIDTH, SPAWN_POINT_X, SPAWN_POINT_Y} from "./config";
import Array2D from "./Array2D";

const FigureMap = {
    0: Figures.L,
    1: Figures.T,
    2: Figures.I,
    3: Figures.J,
    4: Figures.O,
    5: Figures.S,
    6: Figures.Z,
};

export default class Tetris {
    constructor() {
        this._gameField = new Array2D(GAME_FIELD_HEIGHT, GAME_FIELD_WIDTH);
        this._figure = null;
        this._stepTimer = 0;
        this._gameSpeed = 400;

        this.spawnFigure();
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
    }

    dropFigure() {
        delete this._figure;
        this._gameField.normalize();
    }

    addFigure(figure, x, y) {
        this._figure = new Figure(figure, x, y);
        this._mergeCurrentFigurePos();
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
        }
        else {
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
            this._figure.rotate();
            this.updateFigurePosition(0, 0);
        }
    }
}
