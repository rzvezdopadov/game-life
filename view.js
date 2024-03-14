const emptyClass = 'empty_field';
const entityClass = 'with_entity';
const entityWrapperClass = `entity_wrapper`;

class View {
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

    createCell(controller) {
        const elemTable = document.createElement('div');
        elemTable.classList.add(entityWrapperClass);
        let posId = 0;

        for (let i = 0; i < controller.model.sizeField; i += 1) {
            const elemTr = document.createElement('div');

            for (let j = 0; j < controller.model.sizeField; j += 1) {
                const elemTd = document.createElement('div');
                elemTd.id = posId++;
                elemTd.classList.add(emptyClass);
                elemTd.addEventListener('click', controller.model.changeBacteria.bind(controller.model));
                elemTr.appendChild(elemTd);
            }

            elemTable.appendChild(elemTr);
        }

        return elemTable;
    }
    
    generateBacterialsPosition(controller) {
        const main = document.querySelector('.main');

        if (main.childNodes.length === Math.pow(controller.model.sizeField, 2)) return;

        main.innerHTML = '';
        const cell = this.createCell(controller);
        if (main) main.appendChild(cell);
    }

    updateBacterialsPosition(controller) {
        const bacteriaPositionOld = controller.model.bacteriaPositionOld;
        const bacteriaPosition = controller.model.bacteriaPosition;

        for (let i = 0; i < bacteriaPositionOld.length; i++) {
            if (bacteriaPosition.includes(bacteriaPositionOld[i])) {
                const elem = document.getElementById(bacteriaPositionOld[i]);
                elem?.classList?.add(entityClass);
            } else {
                const elem = document.getElementById(bacteriaPositionOld[i]);
                elem?.classList?.remove(entityClass);
            }
        }

        for (let i = 0; i < bacteriaPosition.length; i++) {
            if (!bacteriaPositionOld.includes(bacteriaPosition[i])) {
                const elem = document.getElementById(bacteriaPosition[i]);
                elem?.classList?.add(entityClass);
            } 
        }
    }

    redraw() {
        this.view.generateBacterialsPosition(this);
        this.view.updateBacterialsPosition(this);
    }
}


