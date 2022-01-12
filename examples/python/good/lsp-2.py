class Eatable:
    def eat(self, food):
        print(f"I can eat {food}")

class Flyable:
    def fly(self):
        print("Fly, Fly!!")

class Duck(Eatable, Flyable):
    def fly(self):
        print("I quack, quack while flying!!")

class Chicken(Eatable):
  pass

class Plane(Flyable):
    pass

flyables = [Duck(), Plane()]
for each in flyables:
    each.fly()