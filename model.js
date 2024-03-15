const STATUS_GAME_IN_PROCESS = 0;
const STATUS_GAME_STOP = 1;
const LEVEL_SPEED = 1000;

const NEIGHBORS = [
    [-1, -1], [-1, 0], [-1, 1], [1, -1],
    [1, 0], [1, 1], [0, 1], [0, -1]
];

class Model {
    constructor() {
        this.sizeField = 20;
        this.status = STATUS_GAME_STOP;
        this.bacteriaPosition = [];
        this.render = () => {};
        this.timer = null;
    }

    setSizeField(value) {
        if (value < 5 || this.status !== STATUS_GAME_STOP) return;

        this.sizeField = Number(value);
        this.clearState();
        this.render();
    }

    clearState() {
        this.status = STATUS_GAME_STOP;
        this.bacteriaPosition = [];

        for (let x = 0; x < this.sizeField; x++) {
            this.bacteriaPosition.push([]);

            for (let y = 0; y < this.sizeField; y++) {
                this.bacteriaPosition[x][y] = false; 
            }   
        } 
    }

    startGame() {
        model.timer = setInterval(()=> {
            this.engineGame();
        }, LEVEL_SPEED);

        this.status = STATUS_GAME_IN_PROCESS;
    }

    stopGame() {
        this.clearState();

        if (model.timer) clearInterval(model.timer);

        model.timer = null;
        this.render();
    }

    reloadGame() {
        if (this.status === STATUS_GAME_IN_PROCESS) {
            this.stopGame();
        } else {
            this.startGame();
        }
    }

    generateRandomBacterias() {
        if (this.status === STATUS_GAME_IN_PROCESS) return;

        this.clearState();

        for (let x = 0; x < this.sizeField; x++) {
            for (let y = 0; y < this.sizeField; y++) {
                this.bacteriaPosition[x][y] = Math.round(Math.random() * 2) ? false : true; 
            }   
        } 

        this.render();
    }

    changeBacteria(event) {
        const x = Math.floor((event.pageX - event.currentTarget.offsetLeft) / (event.target.width / this.sizeField)); 
        const y = Math.floor((event.pageY - event.currentTarget.offsetTop) / (event.target.height / this.sizeField)); 

        this.bacteriaPosition[y][x] = !this.bacteriaPosition[y][x];
        this.render();
    }

    isAlive(pointX, pointY) {
        const count = NEIGHBORS.reduce((sum, diff) => {
            const x = pointX - diff[0];
            const y = pointY - diff[1];
            let newX = x;
            let newY = y;
            // Transforms a surface into a torus 
            if (x < 0) newX = this.sizeField - 1;
            if (y < 0) newY = this.sizeField - 1;
            if (x > this.sizeField - 1) newX = 0;
            if (y > this.sizeField - 1) newY = 0;
            return (newX < 0 || newX >= this.bacteriaPosition[0].length || newY < 0 || newY >= this.bacteriaPosition.length) ?
                sum : sum + this.bacteriaPosition[newY][newX];
        }, 0);

        return this.bacteriaPosition[pointY][pointX] ? (count === 2 || count === 3) : count === 3;
    }

    engineGame() {
        this.bacteriaPosition = this.bacteriaPosition.map((row, y) => row.map((_, x) => this.isAlive(x, y)));
        this.render();
    }

    setHandlerRedraw(clbk) {
        if (typeof(clbk) === 'function') {
            this.render = clbk;
        }
    }
}
