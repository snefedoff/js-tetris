import Tetris from "./Tetris";
import * as PIXI from "pixi.js";
import {throttle} from './helpers';
import {GAME_FIELD_HEIGHT, GAME_FIELD_WIDTH} from "./config";

export default class Game {
    constructor() {
        this.text = null;
    }

    init({viewportWidth, viewportHeight, backgroundColor}) {
        PIXI.utils.skipHello();
        this.application = new PIXI.Application({
            width: viewportWidth,
            height: viewportHeight,
            backgroundColor: backgroundColor,
            resolution: 1,
        });

        this.ticker = PIXI.Ticker.shared;

        this.tetris = new Tetris();

        this.text = new PIXI.Text('',{fontFamily : 'Arial', fontSize: 24, fill : 0x10dd10, align : 'center'});
        this.text.x = 416;
        this.application.stage.addChild(this.text);

        this.render();
    }

    render() {
        this.application.ticker.add(this.update.bind(this));

        window.addEventListener('keyup',(e)=>{
            if (e.key === "ArrowUp") {
                this.tetris.rotate();
            }
        });

        window.addEventListener('keydown', (e) => {
            if (e.key === "ArrowLeft") {
                this.tetris.moveLeft();
            }
            if (e.key === "ArrowRight") {
                this.tetris.moveRight();
            }
            if (e.key === "ArrowDown") {
                this.tetris.moveDown();
            }
        });
    }

    update() {
        this.text.text = '';
        for (let i = 0; i < GAME_FIELD_HEIGHT; i++) {
            for (let j = 0; j < GAME_FIELD_WIDTH; j++) {
                this.text.text += `${this.tetris._gameField.get(i,j)} `;
                this.text.color = 'ffffff';
            }
            this.text.text += '\n';
        }

        this.tetris.update(this.ticker.deltaMS);
    }

    getApp() {
        return this.application;
    }
}
