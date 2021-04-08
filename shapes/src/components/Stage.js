import { Shape } from "./shape.js";
import userInputHandler from "./userInputHandler.js";
import snapPosition from "./snap.js";

export class Stage {
    constructor(el) {
        this._el = el;
        this._shapes = new Map();
        this._currentTarget = undefined;
        userInputHandler(el, this.handleInteraction);
    }

    addShape = (type, name) => {
        let shape = new Shape(type, name);
        this._el.insertAdjacentHTML("beforeend", shape.img);
        this._shapes.set(this._el.lastElementChild, shape);
        shape.setEl(this._el.lastElementChild);
        shape.position = {
            x: 20,
            y: 0,
            rotate: 0,
        };
    };

    get size() {
        if(!this._size){ this._size = this._el.getBoundingClientRect(); }
        return this._size
    }

    handleInteraction = (e) => {
        if (
            e.target?.nodeName === "rect" &&
            e.type === "dragStart" &&
            this._shapes.get(e.target.parentElement)
        ) {
            const currentShape = this._shapes.get(e.target.parentElement);
            this.currentTarget = {
                el: e.target.parentElement,
                startPos: currentShape.position,
                currentShape: currentShape
            };
        }
        if (e.type === "dragEnd") {
            const snapped = snapPosition({
                shapePosition: this.currentTarget.currentShape.position,
                shapeDimensions: this.currentTarget.currentShape.dimensions,
                stageDimensions: this.size,
                snapUnits: 10
            });
            this._shapes.get(this.currentTarget.el).position = {
                x: snapped.x,
                y: snapped.y
            };
            this.currentTarget = undefined;
        }
        if (e.type === "dragMove" && this.currentTarget) {
            let pos = {
                x: this.currentTarget.startPos.x + e.offset.x,
                y: this.currentTarget.startPos.y + e.offset.y,
                rotate: this.currentTarget.startPos.rotate + e.rotate,
            };
            this._shapes.get(this.currentTarget.el).position = pos;
            const snapped = snapPosition({
                shapePosition: this.currentTarget.currentShape.position,
                shapeDimensions: this.currentTarget.currentShape.dimensions,
                stageDimensions: this.size,
                snapUnits: 10
            });
        }
    };
}
