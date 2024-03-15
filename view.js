const emptyClass = 'empty_field';
const entityClass = 'with_entity';
const entityWrapperClass = `entity_wrapper`;

class View {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.timecode = 0;
    }

    setHandlerInput(changeSizeFieldClbk) {
        document.getElementById('size_field').addEventListener('change', (event) => {     
            const value = event.target.value;
            
            if (value > 5) {
                changeSizeFieldClbk(value);
            } 
        });

    }

    setHandlerButton(reloadGameClbk, generateRandomBacterialsClbk, controller) {
        document.getElementById('reload_game').addEventListener('click', () => {         
            reloadGameClbk();

            const button = document.getElementById('reload_game');

            if (controller.model.status === STATUS_GAME_STOP) {
                button.innerHTML = `Старт`;
            } else {
                button.innerHTML = `Стоп`;
            }
        });

        document.getElementById('generate_bacterials').addEventListener('click', () => {
            generateRandomBacterialsClbk();
        });
    }

    addGrid(controller) {
        // added grids
        const sizeField = controller.model.sizeField;     	    
        const rangeWidth = this.canvas.width / sizeField;
        const rangeHeight = this.canvas.height / sizeField;

        this.ctx.strokeStyle = `#000`;
        for (let i = 0; i < sizeField; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(i * rangeWidth, 0);
            this.ctx.lineTo(i * rangeWidth, this.canvas.height);
            this.ctx.stroke();
            this.ctx.beginPath();
            this.ctx.moveTo(0, i * rangeHeight);
            this.ctx.lineTo(this.canvas.width, i * rangeHeight);
            this.ctx.stroke();
        }
    }

    updateCanvas() {
        const main = document.querySelector(".main");
        this.canvas = document.getElementById("canvas");
        canvas.addEventListener('click', controller.model.changeBacteria.bind(controller.model));
        canvas.width  = main.clientWidth;
        canvas.height = main.clientHeight;  
        this.ctx = canvas.getContext('2d'); 
        this.addGrid(controller);
    }

    updateBacterialsPosition(controller) {
        if (!this.canvas) this.updateCanvas();
        
        const bacteriaPosition = controller.model.bacteriaPosition;
        const sizeField = controller.model.sizeField;     	    
        const rangeWidth = this.canvas.width / sizeField;
        const rangeHeight = this.canvas.height / sizeField;
        this.ctx.fillStyle = `#888`
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.addGrid(controller);
        // added bacteria
        bacteriaPosition.forEach((col, y) => col.forEach((_, x) => {
            bacteriaPosition[y][x] ? this.ctx.fillStyle = `lime` : this.ctx.fillStyle = `#00000000`;
            this.ctx.fillRect(x * rangeWidth, y * rangeHeight, rangeWidth, rangeHeight);
        }));
    }

    redraw() {
        this.view.updateBacterialsPosition(this);
        const timecode = new Date(); 
        console.log(`+${(timecode - this.view.timecode) / 1000}`); // Performance - time between renders
        this.view.timecode = timecode;
    }
}


