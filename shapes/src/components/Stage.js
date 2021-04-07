import { Shape } from './shape.js';

export class Stage {
    constructor(el) {
        this._el = el; 
        this._shapes = new Map();
        this._el.addEventListener('click',(e) => {
            if(e.target.nodeName === 'rect'){
                let thisEl = e.target.parentElement;
                console.log(this._shapes.get(thisEl).name);
            }
        });
    }

    addShape = (type, name) => {
        let shape = new Shape(type, name);  
        this._el.insertAdjacentHTML("beforeend", shape.img);
        this._shapes.set(this._el.lastElementChild, shape);
        shape.setEl(this._el.lastElementChild);
    }
}