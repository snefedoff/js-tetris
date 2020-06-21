import {Ticker} from "pixi.js";
import Tetris from "./Tetris";
import Menu from "./Menu";
import ScoreBoard from "./ScoreBoard";

export default class Context {
    constructor(application, state) {
        this.state = null;
        this.states = {
            'menu': new Menu(this),
            'game': new Tetris(this),
            'scoreboard': new ScoreBoard(this)
        };

        application.stage.addChild(this.states.menu, this.states.game, this.states.scoreboard);

        this.changeState(state);

        window.addEventListener('keyup', (e) => {
            if (e.key === "ArrowUp") {
                this.state.onKeyUp();
            }

            if (e.key === "Enter") {
                this.state.onEnter();
            }
        });

        window.addEventListener('keydown', (e) => {
            if (e.key === "ArrowLeft") {
                this.state.onKeyLeft();
            }
            if (e.key === "ArrowRight") {
                this.state.onKeyRight();
            }
            if (e.key === "ArrowDown") {
                this.state.onKeyDown();
            }
        });
    }

    changeState(newState) {
        const prevState = this.state;
        this.state = this.states[newState];
        if (prevState) prevState.visible = false;
        this.state.setContext(this);
        this.state.visible = true;

        console.log(this.state);
    }

    update() {
        this.state && this.state.update(Ticker.shared.deltaMS);
    }
}
