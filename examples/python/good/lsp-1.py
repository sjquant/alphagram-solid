import abc

class Shape(abc.ABC):
    @property
    @abc.abstractmethod
    def area(self):
      pass

class Rectangle(Shape):
    def __init__(self, w, h):
        self._width = w
        self._height = h

    @property
    def area(self):
      return self._width * self._height

class Square(Shape):
    def __init__(self, l):
        self._length = l

    @property
    def area(self):
        return self._length * self._length


rect1 = Square(4)
rect2 = Rectangle(4, 5)
print(rect1.area) # 16
print(rect2.area) # 20