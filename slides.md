---
theme: apple-basic
# https://sli.dev/custom/highlighters.html
highlighter: shiki
lineNumbers: false
drawings:
  persist: false
layout: intro
fonts:
  sans: 'Apple SD Gothic Neo'
  provider: 'none'
---

# 개발자라면, SOLID 원칙

좋은 설계를 위한 5가지 프로그래밍 원칙

<div class="absolute bottom-10">
  <span class="font-700">
    &copy; sjquant
  </span>
</div>

---
layout: center
class: 'text-center'
---

# SOLID 원칙이란?

<v-click>

객체지향 프로그래밍(OOP) 설계의 5가지 '이상향'

</v-click>

<div v-click class="text-gray-500">객체지향 프로그래밍이 아니더라도 전반적으로 적용될 수 있는 원칙들!</div>

---
layout: bullets
---

# 객체지향 프로그래밍 맛보기


- 객체중심적 생각

- <span class="text-red-500">책임</span>을 가진다.

- 서로 다른 책임을 가진 객체들이 서로 <span class="text-red-500">협력</span>한다.

- 상상력 (이상한 나라의 앨리스)

<div v-click class="fixed right-4 top-20">
  <img src="http://image.yes24.com/momo/TopCate511/MidCate005/51040273.jpg" />
</div>

---
layout: center
class: 'text-center'
---

# 나쁜 설계?

<v-click>

모듈 간의 <span class="text-red-500">결합도가 높아서</span> 변경하기 어려움

</v-click>

---
layout: center
class: 'text-center'
---

# 나쁜 설계?

<span class="text-red-500">응집도가 낮아서</span> 하나의 객체가 하나의 책임을 온전히 이행하지 못함

---
layout: center
class: 'text-center'
---

# 좋은 설계?

<v-click>

<span class="text-red-500">결합도</span>가 낮고 <span class="text-red-500">응집도</span>가 높은 코드

</v-click>

---
layout: center
---

# S O L I D !

---
layout: center
---

# <span class="text-red-500">S</span>ingle Responsibility

<div></div>

## 단일 책임 원칙

모든 객체는 <span class="text-red-500">단 하나의 책임</span>을 가져야 한다.

= 해당 객체를 바꿔야 할 이유가 단 하나만 존재한다.

---

# BAD

```py
class FinancialReport:

  # ...

  def report(self):
    return {
      "date": self.date,
      "title": self.title,
      "content": self.content
    }

  def send_report(self, email):
    report = self.report
    # 이메일 전송

```

- FinancialReport의 책임이 두 개: report와 send_report
- 만약, MarketingReport가 생긴다면? → 같은 함수를 두번 구현 (중복 발생)
- 만약, Email이 아닌 다른 수단으로 send_report를 한다면? → 수정해야할 이유가 한가지 이상

---

# GOOD

```py
class ReportSender:
  def __init__(self, report):
    self.report = report

  def send(self, email):
    data = self.report.report()
    # 이메일 전송

class Report(abc.ABC):

  @abc.abstractmethod
  def report(self):
    pass

class FinancialReport(Report):
  # ...

# ...
report_sender = ReportSender(marketing_report)
report_sender.send("somebody@help.me")
```

---
layout: center
---


# <span class="text-red-500">O</span>pen Closed

<div></div>

## 개방 폐쇄 원칙

확장에는 열려있고, 변경에는 닫혀있어야 한다.

= 기존 객체의 구현을 수정하는 것이 아니라, 새로운 객체를 추가함으로써 기능을 추가한다.

---

# BAD

```py
class ReportSender:
  def __init__(self, report):
    self.report = report

  def send(self, send_type, receiver):
    if send_type == "email":
      # 이메일 전송
    if send_type == "printer":
      # 프린터 출력
    if send_type == "fax":
      # 팩스 출력
```

- 만약 다른 유형의 sender가 추가 된다면? (e.g, MS팀즈)
  
  → send 함수의 수정이 필요함
  
  → 기존에 잘 동작하던 함수를 깨뜨릴 위험성

---

# GOOD

```py
class ReportSender(abc.ABC):
  
  @abc.abstractmethod
  def send(self):
    pass

class EmailReportSender(ReportSender):
  
  def send(self):
    # 이메일 전송

class MSTeamsReportSender(ReportSener):

  def send(self):
    # MSTeams 알림 전송
```

새로운 Sender가 추가된다면, ReportSender를 구현한 새로운 클래스만 추가해주면 된다!

---
layout: center
---

# <span class="text-red-500">L</span>iskov Substitution

<div></div>

## 리스코프 치환 원칙

자식 클래스가 부모 클래스를 대체하여도 프로그램이 의도한대로 동작하여야 한다.

---
layout: two-cols
---

# BAD

```py
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
  pass

rect = Square()
rect.set_width(4)
rect.set_height(5)
print(rect.area)  # It prints 25, instead of 20
```

::right::

<div class="fixed top-24">

- 논리적으로 정사각형은 직사각형이지만,

  상속관계를 두는 것은 적절치 않음

- 리스코프 원칙을 위반할 경우,

  Open-Closed 원칙을 위반할 확률이 높다.
  
  (if 구문등으로 다르게 처리해야하므로)

</div>
---
layout: two-cols
---


# GOOD

```py
class Shape(abc.ABC):
  @property
  @abc.abstractmethod
  def area(self):
    pass

class Rectangle(Shape):
  def __init__(self, w, h):
    self._width = w
    self._heiht = h

  @property
  def area(self):
    return self._width * self._height

class Square(Shape):
  def __init__(self, l):
    self._length = l

  def area(self):
    return self._length * self.__length
```

::right::

```py




rect1 = Square(4)
rect2 = Rectangle(4, 5)
print(rect1.area) # 16
print(rect2.area) # 20
```

- 정사각형-직사각형 관계보다 더 포괄적인 도형을 상속하도록 변경하고 코드를 리팩토링

---
layout: center
---

# Another Example

---

# BAD

```py
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
```

- Chicken Object의 경우 fly 메소드가 있어선 안된다.
- Chicken도 분명히 Bird이지만 리스코프 원칙 위배
  
  → <span class="text-red-500">is-a</span> 관계라고 해서 모두 상속이 바람직한 것은 아님

---
layout: two-cols
---

# GOOD

```py
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
```

- Mixin을 활용 (다른 언어에서는 interface 활용 가능)
  <div class="text-xs -mt-4">*Mixin: 클래스를 최소한의 행동(책임)으로 정의하여 상속받는 형태로 구현하는 설계방식</div>

- 요즘에는 상속보다 Interface (Trait)등을 활용하는 쪽으로 언어가 발전하고 있다. (e.g. `golang`, `rust`)

---
layout: center
---

# <span class="text-red-500">I</span>nterface Segregaton 

<div></div>

## 인터페이스 분리 원칙

클래스는 자신이 이용하지 않는 메서드에 의존해서는 안된다.

= 인터페이스계의 SRP

---



## 의존성 역전 원칙
