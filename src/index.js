import Game from "./Game";

const game = new Game();

game.init({
    viewportWidth: 416,
    viewportHeight: 600,
    backgroundColor: 0x1099bb
});

document.body.appendChild(game.getApp().view);
