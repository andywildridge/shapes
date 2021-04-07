import shapeDefinitions from './shapeDefinitions.js';
import getShapeImage from './getShapeImage.js';

export class Shape {
    constructor(type, name) {
        this._defn = shapeDefinitions[type];
        this._img = getShapeImage(this._defn);
        this._position = undefined;
        this._name = name;
    }

    get position() {
        return this._position;
    }

    set position({
        x = this.position?.x,
        y = this.position?.y,
        rotate = this.position?.rotate,
        flip = this.position?.flip,
    }) {
        this._position = {
            x,
            y,
            rotate,
            flip,
        };
    }

    get img() {
        return this._img;
    }

    get name() {
        return this._name;;
    }

    setEl(el) {
        this._el = el;
        console.log(el);
    }
}
