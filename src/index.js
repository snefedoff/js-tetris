import * as PIXI from 'pixi.js';

const app = new PIXI.Application({
    width: 800,
    height: 600,
    backgroundColor: 0x1099bb,
    resolution: 1,
});

app.ticker.add(() => {
});

document.body.appendChild(app.view);
