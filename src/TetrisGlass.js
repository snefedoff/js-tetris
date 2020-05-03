import TetrisFigure from "./TetrisFigure";
import * as config from './config';

export default class TetrisGlass {
    constructor() {
        const {GAME_FIELD_WIDTH, GAME_FIELD_HEIGHT} = config;
        this._gameField = new Array(GAME_FIELD_WIDTH * GAME_FIELD_HEIGHT);
    }

    init() {
        this.update();
    }

    update() {
        for (let i = 0; i < this._width; i++) {
            for (let j = 0; j < this._height; j++) {
                this._gameField = Math.round(Math.random());
            }
        }
    }

    getGameField() {
        return this._gameField;
    }
}
