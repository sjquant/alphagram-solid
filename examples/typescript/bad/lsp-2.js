"use strict";
class Bird {
    eat(food) {
        console.log(`I can eat ${food}`);
    }
    fly() {
        console.log("Fly!! Fly!!");
    }
}
class Duck extends Bird {
    fly() {
        console.log("I quack, quack while flying!!");
    }
}
class Chicken extends Bird {
    fly() {
        console.error("I cannot fly!!");
    }
}
(function () {
    const birds = [new Duck(), new Chicken()];
    for (const bird of birds) {
        bird.fly();
    }
})();
