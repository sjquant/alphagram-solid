"use strict";
class Monster {
    attack(other) {
        console.log(`Monster attacks ${other}`);
    }
    talk(other) {
        console.error("Monster cannot talk!!!");
    }
    move(x, y) {
        console.log(`Monster moves to (${x}, ${y})`);
    }
}
class NPC {
    attack(other) {
        console.error(`NPC cannot attack`);
    }
    talk(other) {
        console.log(`NPC talk to ${other}`);
    }
    move(x, y) {
        console.log("NPC cannot move!!!");
    }
}
(function () {
    const monster = new Monster();
    const npc = new NPC();
    monster.talk("john"); // Shouldn't be possible
    npc.move(5, 10); // Shouldn't be possible
})();
