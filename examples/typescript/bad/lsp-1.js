"use strict";
class Rectangle {
    constructor() {
        this.width = 0;
        this.height = 0;
    }
    setWidth(w) {
        this.width = w;
    }
    setHeight(h) {
        this.height = h;
    }
    get area() {
        return this.width * this.height;
    }
}
class Square extends Rectangle {
    setWidth(w) {
        this.width = w;
        this.height = w;
    }
    setHeight(h) {
        this.width = h;
        this.height = h;
    }
}
(function () {
    const square = new Square();
    square.setWidth(4);
    square.setHeight(5);
    console.log(square.area); // It prints 25 instead of 20
})();
