import TetrisGlass from "./TetrisGlass";
import * as PIXI from "pixi.js";
import {throttle} from './helpers';

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

        this.tetris = new TetrisGlass();
        this.tetris.init();

        this.render();
    }

    render() {
        const blocks = this.tetris.currentFigure.getBlocks();
        blocks.forEach( item => this.application.stage.addChild(item.sprite));
        this.application.ticker.add(throttle(this.update, 700, this));
    }

    update() {
        this.tetris.update();
    }

    getApp() {
        return this.application;
    }
}
