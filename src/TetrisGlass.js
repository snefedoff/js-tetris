import Figure from "./Figure";
import * as Figures from './FigureMatricies';
import * as config from './config';
import {GAME_FIELD_HEIGHT, GAME_FIELD_WIDTH} from "./config";

export default class TetrisGlass {
    constructor() {
        this._gameField = [GAME_FIELD_WIDTH * GAME_FIELD_HEIGHT];
        this.currentFigure = null;
    }

    init() {
        this.clear();
        this.addFigure(Figures.T, 5, -3);
    }

    setGlassBlockState(x, y, state) {
        this._gameField[x + y * config.GAME_FIELD_HEIGHT] = state;
    }

    getGlassBlockState(x, y) {
        return this._gameField[x + y * config.GAME_FIELD_HEIGHT];
    }

    addFigure(figure, x, y) {
        this.currentFigure = new Figure(figure, x, y);
        this.currentFigure.getBlocks().forEach(item => this.setGlassBlockState(item.x, item.y, 2));
    }

    updateFigurePosition(dirX, dirY) {
        this.currentFigure.getBlocks().forEach(item => {
            this.setGlassBlockState(item.x, item.y, 0);
            this.setGlassBlockState(item.x + dirX, item.y + dirY, 2);
        });
    }

    clear() {
        for (let i = 0; i < config.GAME_FIELD_WIDTH * config.GAME_FIELD_HEIGHT; i++) {
            this._gameField[i] = 0;
        }
    }

    update() {
        if (this.currentFigure) {
            const pos = this.currentFigure.getPosition();
            if (this.isFigureCanMoveTo(pos.x, pos.y + 1)) {
                this.updateFigurePosition(0, 1);
                this.currentFigure.move(0, 1);
            }
        }
    }

    moveLeft() {
        if (this.currentFigure) {
            const pos = this.currentFigure.getPosition();
            console.log(pos);
            if (this.isFigureCanMoveTo(pos.x-1, pos.y)) {
                this.updateFigurePosition(-1, 0);
                this.currentFigure.move(-1, 0);
            }
        }
    }

    moveRight() {
        if (this.currentFigure) {
            const pos = this.currentFigure.getPosition();
            if (this.isFigureCanMoveTo(pos.x+1, pos.y)) {
                this.updateFigurePosition(1, 0);
                this.currentFigure.move(1, 0);
            }
        }
    }

    rotate() {
        if (this.currentFigure) {
            this.currentFigure.rotate();
        }
    }

    isFigureCanMoveTo(posX, posY) {
        const matrix = this.currentFigure.getMatrix();
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (matrix[i + j * 4]) {
                    const blockIsEmpty = this.getGlassBlockState(posX + i, posY + j) !== 1;
                    const notOutOfRangeX = (posX >= 0) && (posX < GAME_FIELD_WIDTH-1);
                    const notOutOfRangeY = posY < GAME_FIELD_HEIGHT;
                    if (notOutOfRangeX && notOutOfRangeY && blockIsEmpty) continue;
                    else return false;
                }
            }
        }
        return true;
    }
}
