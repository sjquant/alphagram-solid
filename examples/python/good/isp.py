import abc

class Attackable(abc.ABC):
    def attack(self, other):
        print(f"I attack {other}")

class Talkable(abc.ABC):
    def talk(self, other):
        print(f"I talk to {other}")

class Movable(abc.ABC):
    def move(self, x, y):
        print(f"I move to ({x}, {y})")

class NPC(Talkable):
    def talk(self, other):
        print(f"NPC talk to {other}")

class Monster(Attackable, Movable):
    def attack(self, other):
        print(f"Monster attack {other}")
  
    def move(self, x, y):
        print(f"Monster move to ({x}, {y})")


monster = Monster()
monster.move(10, 15)
monster.attack("john")
npc = NPC()
npc.talk("jane")