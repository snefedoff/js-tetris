import TetrisGlass from "./TetrisGlass";
import * as PIXI from "pixi.js";
import * as config from './config';
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



        //this.application.ticker.add(throttle(this.update, 1000, this));
    }

    render() {
        
    }

    update() {
    }

    getApp() {
        return this.application;
    }
}
