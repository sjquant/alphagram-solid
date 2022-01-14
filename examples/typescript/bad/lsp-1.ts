class Rectangle {
  protected width: number;
  protected height: number;

  constructor() {
    this.width = 0;
    this.height = 0;
  }

  setWidth(w: number): void {
    this.width = w;
  }

  setHeight(h: number): void {
    this.height = h;
  }

  get area(): number {
    return this.width * this.height;
  }
}

class Square extends Rectangle {
  setWidth(w: number): void {
    this.width = w;
    this.height = w;
  }

  setHeight(h: number): void {
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
