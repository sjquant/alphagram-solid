abstract class Shape {
  abstract get area(): number;
}

class GoodRectangle extends Shape {
  private width: number;
  private height: number;

  constructor(w: number, h: number) {
    super();
    this.width = w;
    this.height = h;
  }

  get area(): number {
    return this.width * this.height;
  }
}
class GoodSquare extends Shape {
  private length: number;

  constructor(l: number) {
    super();
    this.length = l;
  }

  get area(): number {
    return this.length * this.length;
  }
}

(function () {
  const square = new GoodSquare(5);
  console.log(square.area);
})();
