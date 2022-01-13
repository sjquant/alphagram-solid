"use strict";
class GoodMonster {
    attack(other) {
        console.log(`Monster attacks ${other}`);
    }
    move(x, y) {
        console.log(`Monster moves to (${x}, ${y})`);
    }
}
class GoodNPC {
    talk(other) {
        console.log(`NPC talk to ${other}`);
    }
}
(function () {
    const monster = new GoodMonster();
    const npc = new GoodNPC();
    monster.move(10, 15);
    monster.attack("john");
    npc.talk("john");
})();
