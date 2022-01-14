class Rectangle:
    def __init__(self):
        self._width = 0
        self._height = 0

    def set_width(self, w):
        self._width = w
  
    def set_height(self, h):
        self._height = h

    @property
    def area(self):
         return self._width * self._height

class Square(Rectangle):
    def set_width(self, w):
        self._width = w
        self._height = w

    def set_height(self, h):
        self._width = h
        self._height = h

rect = Square()
rect.set_width(4)
rect.set_height(5)
print(rect.area)  # It prints 25, instead of 20