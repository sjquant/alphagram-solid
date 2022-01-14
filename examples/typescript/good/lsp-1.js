"use strict";
class Shape {
}
class GoodRectangle extends Shape {
    constructor(w, h) {
        super();
        this.width = w;
        this.height = h;
    }
    get area() {
        return this.width * this.height;
    }
}
class GoodSquare extends Shape {
    constructor(l) {
        super();
        this.length = l;
    }
    get area() {
        return this.length * this.length;
    }
}
(function () {
    const square = new GoodSquare(5);
    console.log(square.area);
})();
