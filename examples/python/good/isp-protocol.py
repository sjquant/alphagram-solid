from typing import Protocol

class Attackable(Protocol):
    def attack(self, other):
        ...

class Talkable(Protocol):
    def talk(self, other):
        ...

class Movable(Protocol):
    def move(self, x, y):
        ...

class NPC:
    def talk(self, other: str):
        print(f"NPC talk to {other}")

class Monster:
    def attack(self, other: str):
        print(f"Monster attack {other}")
  
    def move(self, x: int, y: int):
        print(f"Monster move to ({x}, {y})")



def move_character(character: Movable, x, y):
    character.move(x, y)

def talk_character(character: Talkable, other: str):
    character.talk(other)


a_monster = Monster()
move_character(a_monster, 1, 2)

a_npc = NPC()
talk_character(a_npc, "jane")

talk_character(a_monster, "jane")  # It will show an error with type checking enabled before running
