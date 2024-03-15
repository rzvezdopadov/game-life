class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }

    init() {
        this.model.clearState();

        const reloadGame = this.model.reloadGame.bind(this.model);
        const generateRandomBacterias = this.model.generateRandomBacterias.bind(this.model);

        this.view.setHandlerButton(reloadGame, generateRandomBacterias, this);
        this.view.setHandlerInput(this.model.setSizeField.bind(this.model));
        addEventListener("resize", this.view.updateCanvas.bind(this.view));
        this.model.setHandlerRedraw(this.view.redraw.bind(this));
        this.model.stopGame();
    }
}

window.addEventListener('load',
    () => {
        controller.init();
    }
);

const model = new Model();
const view = new View();
const controller = new Controller(model, view);
