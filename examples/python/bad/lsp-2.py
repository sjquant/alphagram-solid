class Bird:
    def eat(self, food):
        print(f"I can eat {food}")

    def fly(self):
        print("Fly, Fly!!")

class Duck(Bird):
    def fly(self):
        print("I quack, quack while flying!!")

class Chicken(Bird):
    def fly(self):
        raise Exception("I cannot fly!!")


birds = [Duck(), Chicken()]
for bird in birds:
    bird.fly()