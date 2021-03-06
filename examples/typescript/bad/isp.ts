interface Character {
  attack(other: string): void;
  talk(other: string): void;
  move(x: number, y: number): void;
}

class Monster implements Character {
  attack(other: string): void {
    console.log(`Monster attacks ${other}`);
  }
  talk(other: string): void {
    console.error("Monster cannot talk!!!");
  }
  move(x: number, y: number): void {
    console.log(`Monster moves to (${x}, ${y})`);
  }
}

class NPC implements Character {
  attack(other: string): void {
    console.error(`NPC cannot attack`);
  }
  talk(other: string): void {
    console.log(`NPC talk to ${other}`);
  }
  move(x: number, y: number): void {
    console.log("NPC cannot move!!!");
  }
}

(function () {
  const monster = new Monster();
  const npc = new NPC();

  monster.talk("john"); // Shouldn't be possible
  npc.move(5, 10); // Shouldn't be possible
})();
