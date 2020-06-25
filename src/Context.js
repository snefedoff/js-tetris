import {Ticker} from "pixi.js";
import Tetris from "./Tetris";
import Menu from "./Menu";
import ScoreBoard from "./ScoreBoard";
import {throttle} from "./helpers";

export default class Context {
    constructor(application, state) {
        this.leftPressed = false;
        this.rightPressed = false;
        this.downPressed = false;
        this.state = null;
        this.states = {
            'menu': new Menu(this),
            'game': new Tetris(this),
            'scoreboard': new ScoreBoard(this)
        };

        this.updateInput = throttle(() => {
            if (this.leftPressed) this.state.onKeyLeft();
            if (this.rightPressed) this.state.onKeyRight();
            if (this.downPressed) this.state.onKeyDown();
        }, 70, this);

        application.stage.addChild(this.states.menu, this.states.game, this.states.scoreboard);

        this.changeState(state);

        window.addEventListener('keyup', (e) => {
            if (e.key === "ArrowUp") {
               this.state.onKeyUp();
            }

            if (e.key === "ArrowLeft") {
                this.leftPressed = false;
            }
            if (e.key === "ArrowRight") {
                this.rightPressed = false;
            }
            if (e.key === "ArrowDown") {
                this.downPressed = false;
            }

            if (e.key === "Enter") {
               this.state.onEnter();
            }
        });

        window.addEventListener('keydown', (e) => {
            if (e.key === "ArrowLeft") {
                this.leftPressed = true;
            }
            if (e.key === "ArrowRight") {
                this.rightPressed = true;
            }
            if (e.key === "ArrowDown") {
                this.downPressed = true;
            }
        });
    }

    changeState(newState) {
        const prevState = this.state;
        this.state = this.states[newState];
        if (prevState) prevState.visible = false;
        this.state.setContext(this);
        this.state.visible = true;
    }

    update() {
        this.state && this.state.update(Ticker.shared.deltaMS);

        this.updateInput();
    }
}
