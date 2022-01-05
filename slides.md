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

# BAD

```py
class Employee:
    company_name = "스타커피"
    raise_percentage = 1.02

    def __init__(self, name, wage):
        self.name = name
        self._wage = wage

    def raise_pay(self):
        self._wage *= self.raise_percentage

class Cashier(Employee):
    coffee_price = 3000

    def raise_pay(self, raise_amount):
        self.wage += self.raise_amount
```

---

# Another Good



---

class Cashier(Employee):
    raise_percentage = 1.03

    def __init__(self, name, wage, number_sold=0):
        super().__init__(name, wage)
        self.number_sold = number_sold

    def raise_pay(self, raise_amount):
        self.wage += self.raise_amount
---

# Good

```py
class Cashier(Employee):
    raise_percentage = 1.03

    def __init__(self, name, wage, number_sold=0):
        super().__init__(name, wage)
        self.number_sold = number_sold

    def raise_pay(self, raise_amount):
        self.wage += self.raise_amount
```

---

## 인터페이스 분리 원칙 

---

<style>
h3 {
  opacity: 1 !important;
}
</style>

# <span class="text-red-500">D</span>ependency Inversion

<div></div>

## 의존성 역전 원칙