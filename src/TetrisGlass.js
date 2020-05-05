import {Figure, Trino} from "./Figure";
import * as config from './config';
import {GAME_FIELD_HEIGHT, GAME_FIELD_WIDTH} from "./config";

export default class TetrisGlass {
    constructor() {
        this._gameField = [GAME_FIELD_WIDTH * GAME_FIELD_HEIGHT];
    }

    init() {
        this.clear();

        this.addFigure( new Figure(Trino, 0,0));
    }

    addFigure(figure) {
        figure.getBlocks().forEach(item => {
            this._gameField[(figure.posX + item.x) + (figure.posY + item.y) * config.GAME_FIELD_HEIGHT] = 1;
        });
    }

    clear() {
        for (let i = 0; i < config.GAME_FIELD_WIDTH * config.GAME_FIELD_HEIGHT; i++) {
            this._gameField[i] = 0;
        }
    }

    update() {
    }

    getGameField() {
        return this._gameField;
    }
}
