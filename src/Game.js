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

        this.blockSprites = [];
        this.blockCount = 0;

        this.render();

        this.application.ticker.add(throttle(this.update, 1000, this));
    }

    render() {
        const blocks = this.tetris.currentFigure.getBlocks();
        blocks.forEach( item => this.application.stage.addChild(item.sprite))
    }

    update() {
        this.tetris.update();
    }

    getApp() {
        return this.application;
    }

    createBlockSprite(i, j) {
        const block = new PIXI.Sprite(PIXI.Texture.WHITE);
        block.x = i * config.GAME_FIELD_WIDTH;
        block.y = j * config.GAME_FIELD_HEIGHT;
        block.width = config.GAME_FIELD_WIDTH;
        block.height = config.GAME_FIELD_HEIGHT;
        block.tint = '0x' + Math.floor(Math.random() * '0xffffff').toString(16);
        return block;
    }
}
