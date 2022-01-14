interface Eatable {
  eat(food: string): void;
}

interface Flyable {
  fly(): void;
}

class GoodDuck implements Eatable, Flyable {
  eat(food: string): void {
    console.log(`Duck eats ${food}`);
  }

  fly(): void {
    console.log("Fly!!!");
  }
}

class Plane implements Flyable {
  fly(): void {
    console.log("Plane is flying!!!");
  }
}

class GoodChicken implements Eatable {
  eat(food: string): void {
    console.log(`Chicken eats ${food}`);
  }
}

function go_flying(flyables: Flyable[]) {
  for (const each of flyables) {
    each.fly();
  }
}

(function () {
  const birds = [new GoodDuck(), new Plane()];
  go_flying(birds);
})();
