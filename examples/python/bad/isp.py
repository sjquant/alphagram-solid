import abc
class Character(abc.ABC):
    def attack(self, other):
        print(f"I attack {other}")
  
    def talk(self, other):
        print(f"I talk to {other}")

    def move(self, x, y):
        print(f"I move to ({x}, {y})")

class Monster(Character):
    def attack(self, other):
        print(f"Monster attack {other}")
  
    def move(self, x, y):
        print(f"Monster move to ({x}, {y})")

class NPC(Character):
    def talk(self, other):
        print(f"NPC talk to {other}")


monster = Monster()
monster.talk("john") # Shouldn't be possible
npc = NPC()
npc.move(5, 10) # Shouldn't be possible