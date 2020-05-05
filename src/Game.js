import TetrisGlass from "./TetrisGlass";
import * as PIXI from "pixi.js";
import * as config from './config';
import {throttle} from './helpers';
import {GAME_FIELD_HEIGHT} from "./config";

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
        const blocks = this.tetris.getGameField();

        for (let i = 0; i < config.GAME_FIELD_WIDTH; i++) {
            for (let j = 0; j < config.GAME_FIELD_HEIGHT; j++) {
                if (blocks[i+j*GAME_FIELD_HEIGHT]) {
                    const block = new PIXI.Sprite(PIXI.Texture.WHITE);
                    block.x = i * 32;
                    block.y = j * 32;
                    block.width = 32;
                    block.height = 32;
                    block.tint = '0x'+Math.floor(Math.random()*'0xffffff').toString(16);
                    this.application.stage.addChild(block);
                }
            }
        }
    }

    update() {
    }

    getApp() {
        return this.application;
    }
}
