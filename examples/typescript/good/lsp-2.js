"use strict";
class GoodDuck {
    eat(food) {
        console.log(`Duck eats ${food}`);
    }
    fly() {
        console.log("Fly!!!");
    }
}
class Plane {
    fly() {
        console.log("Plane is flying!!!");
    }
}
class GoodChicken {
    eat(food) {
        console.log(`Chicken eats ${food}`);
    }
}
function go_flying(flyables) {
    for (const each of flyables) {
        each.fly();
    }
}
(function () {
    const birds = [new GoodDuck(), new Plane()];
    go_flying(birds);
})();
