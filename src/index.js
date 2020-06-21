import {Application} from "pixi.js";
import Context from "./Context";

const application = new Application({
    width: 566,
    height: 576,
    backgroundColor: 0x1099bb,
    resolution: 1,
});
const applicationContext = new Context( application, 'menu' );
application.ticker.add(applicationContext.update.bind(applicationContext));
document.body.appendChild(application.view);
