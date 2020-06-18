import Tetris from "./Tetris";
import * as PIXI from "pixi.js";

export default class Game {
    constructor() {
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
        this.application.stage.addChild(this.tetris);
        this.application.ticker.add(this.update.bind(this));

        window.addEventListener('keyup', (e) => {
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
        this.tetris.update(this.ticker.deltaMS);
    }

    getApp() {
        return this.application;
    }
}
