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
        this.currentFigure = new Figure(Figures.T[0], 5,-3);
        this.addFigure( this.currentFigure );
    }

    addFigure(figure) {
        figure.getBlocks().forEach(item => {
            this._gameField[item.x + item.y * config.GAME_FIELD_HEIGHT] = 1;
        });
    }

    clear() {
        for (let i = 0; i < config.GAME_FIELD_WIDTH * config.GAME_FIELD_HEIGHT; i++) {
            this._gameField[i] = 0;
        }
    }

    update() {
        if (this.currentFigure)
        this.currentFigure.move(0, 1);
    }

    getGameField() {
        return this._gameField;
    }
}
