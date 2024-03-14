const STATUS_GAME_IN_PROCESS = 0;
const STATUS_GAME_STOP = 1;

const LEVEL_SPEED = 500;

class Model {
    constructor() {
        this.sizeField = 50;
        this.status = STATUS_GAME_STOP;
        this.bacteriaPositionOld = [];
        this.bacteriaPosition = [];

        this.render = () => {};
        this.timer = null;
    }

    setSizeField(value) {
        if (value < 5 || this.status !== STATUS_GAME_STOP) return;

        this.sizeField = Number(value);
        this.render();
    }

    clearState() {
        this.status = STATUS_GAME_STOP;
        this.bacteriaPositionOld = [];
        this.bacteriaPosition = [];
        this.render();
    }

    startGame() {
        model.timer = setInterval(()=> {
            this.engineGame();
        }, LEVEL_SPEED);

        this.status = STATUS_GAME_IN_PROCESS;
    }

    stopGame() {
        this.clearState();

        if (model.timer) clearTimeout(model.timer);

        model.timer = null;
    }

    reloadGame() {
        if (this.status === STATUS_GAME_IN_PROCESS) {
            this.stopGame();
        } else {
            this.startGame();
        }
    }

    generateRandomBacterias() {
        let bacteriaArr = [];
        const maxField = this.sizeField * this.sizeField;
        
        for (let i = 0; i < maxField; i++) {
            const randomPos = Math.round(Math.random() * maxField);
            bacteriaArr.push(randomPos)
        }

        bacteriaArr = Array.from(new Set(bacteriaArr));

        this.bacteriaPosition = bacteriaArr;
        this.bacteriaPositionOld = bacteriaArr;
        this.render();
    }

    changeBacteria(event) {
        const id = Number(event.target.id);
        const position = this.bacteriaPosition.findIndex((value) => value === id);
        
        if (position === -1) {
            this.bacteriaPosition.push(id);
            this.bacteriaPositionOld.push(id);
        } else {
            this.bacteriaPosition.splice(position, 1);
            this.bacteriaPositionOld.splice(position, 1);
        }   

        this.render();
    }

    engineGame() {
        this.bacteriaPositionOld = [...this.bacteriaPosition];

        const newBacteriaPosition = [];
        const maxField = this.sizeField * this.sizeField;
              
        for (let i = 0; i < maxField; i++) {
            let summ = -1;
            const arrTest = [];
            for (let x = -1; x <= 1; x++) {
                for (let y = -1; y <= 1; y++) {
                    let coordAdjanced = i + x + y * this.sizeField;

                    if (coordAdjanced > maxField) coordAdjanced = coordAdjanced - maxField;
                    if (coordAdjanced < 0) coordAdjanced = maxField + coordAdjanced;
                    arrTest.push(coordAdjanced);
                    if ((this.bacteriaPosition.includes(coordAdjanced))) summ++;
                }    
            }
            
            if ((summ === 2) || (summ === 3)) newBacteriaPosition.push(i);
        }
        console.log(newBacteriaPosition);
        this.bacteriaPosition = newBacteriaPosition;
        this.render();
    }

    setHandlerRedraw(clbk) {
        if (typeof(clbk) === 'function') {
            this.render = clbk;
        }
    }
}
