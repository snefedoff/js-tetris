import {Container, Text, Sprite, Texture} from "pixi.js";
import State from "./State";

export default class Menu extends State {
    constructor(context) {
        super(context);
        this.text = new Text('Press ENTER to start',{fontFamily : 'Arial', fontSize: 24, fill : 0xff1010, align : 'center'});
        this.text.x = 90;
        this.text.y = 256;
        this.addChild(this.text);
    }

    update(dt) {
    }

    onEnter(){
        this.context.changeState('game');
    }
    onKeyLeft() {}
    onKeyRight() {}
    onKeyDown() {}
    onKeyUp() {}
}
