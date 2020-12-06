import { Container } from "pixi.js";

export default class State extends Container {
    constructor(context) {
        super();
        this.context = context;
        this.visible = false;
    }

    setContext(context) {
        this.context = context;
    }
}
