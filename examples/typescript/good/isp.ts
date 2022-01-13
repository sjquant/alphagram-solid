interface Attakable {
  attack(other: string): void;
}

interface Talkable {
  talk(other: string): void;
}

interface Movable {
  move(x: number, y: number): void;
}

class GoodMonster implements Attakable, Movable {
  attack(other: string): void {
    console.log(`Monster attacks ${other}`);
  }

  move(x: number, y: number): void {
    console.log(`Monster moves to (${x}, ${y})`);
  }
}

class GoodNPC implements Talkable {
  talk(other: string): void {
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
