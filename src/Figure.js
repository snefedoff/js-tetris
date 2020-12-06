import {convertArray1D} from "./ArrayUtils";

export default class Figure {
    constructor(matricies, x, y, color) {
        this._figure = matricies.map(
            item => convertArray1D( item.split('').map(item => +item ? {state: 2, color: color || '0x00ff00'} : 0), 4)
        );
        this._rotation = 0;
        this._posX = x;
        this._posY = y;
    }

    rotate() {
        this._rotation = (this._rotation + 1) % 4;
    }

    getCurrentState() {
        return this._figure[this._rotation];
    }

    getPosX() {
        return this._posX;
    }

    getPosY() {
        return this._posY;
    }

    getRotationId() {
        return this._rotation;
    }

    getRotationArray(id) {
        return this._figure[id];
    }

    step(x, y) {
        this._posX += x;
        this._posY += y;
    }
}
