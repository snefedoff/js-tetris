import State from "./State";
import {Sprite, Texture} from "pixi.js";

export default class ScoreBoard extends State{
    constructor(context) {
        super(context);
        this.addChild( new Sprite(Texture.WHITE) );
    }

    update(dt) {
        super.update(dt);

    }
}
