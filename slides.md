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

<!--
- 제목/부제목/자기 소개
- 프로그래밍 -> 설계 -> 설계 퀄리티
 -->

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

<!--
- 보드마카 활용하여 설명
 -->

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

결합도가 낮고 응집도가 높은 설계를 도와주는 5가지 원칙

<v-click>
<span> = <span class="text-red-500">수정하기 쉬운 코드</span>를 만들기 위한 5가지 원칙</span>
</v-click>

<!--
- 실무적으로 얘기하면 수정하기 쉬운 코드
- 여기서 부제목에 대한 설명까지 푼다.
 -->

---
layout: center
---

# <span class="text-red-500">S</span>ingle Responsibility

<div></div>

## 단일 책임 원칙

모든 객체는 <span class="text-red-500">단 하나의 책임</span>을 가져야 한다.

<v-click>

= 해당 객체를 변경해야 할 이유가 단 하나만 존재한다.

</v-click>

<!--
- 설명을 위해 극단적인 예시가 많다는 것 양해
- SOLID가 객체지향 프로그래밍과 관련하여 나온 개념이라 객체라고 표기 했는데, 객체 뿐만이 아니라 함수/클래스/모듈을 포괄적으로 생각하면 된다.
-->

---
layout: two-cols
---

# BAD

```py
class DataManager:
    #...
    def read(self):
        print("read data...")
        print("parsing data...")

    def save(self):
        print("save data...")

manager = DataManager()
manager.read()
manager.save()

```

<!--
- 코드 읽을 시간
- 책임이 몇개 인지?
- read라는 메소드에서의 책임
- 클래스에서의 책임
-->

::right::

<br/><br/>

<v-click>

- DataSaver 책임: 읽기, 파싱, 저장 (해당 객체에 대한 책임 파악이 어려움 → 가독성⬇️)
- 클래스 내 다른 역할을 수행하는 코드간의 의존성이 높아짐 > 코드 변경의 어려움/부작용
  
  💬 기존에는 csv에서 read를 하고 있었는데, json/yaml read도 지원해야한다면?

  💬 다양한 확장자(txt, csv, json, yaml 등)의 save를 지원해야한다면?

</v-click>


<!--
- 인터페이스를 고려하지 않고 설계했기 때문에 코드가 영향을 미칠 확률이 높다.
- json으로 읽은 것을 csv로 저장하거나 등의 상황을 생각해보면 해당 구조에서 어떻게 해야할지 감을 잡기 어렵다. (갈아엎어야 함)
- 해당 모듈을 사용하는 곳이 많을 수록 재앙
-->

---
layout: two-cols
---

# GOOD

```py
class Reader:
    def read(self):
        # reading data...
        print("read data...")

class Parser:
    def parse(self, data):
        # parsing data...
        print("parsing data...")

class Writer:
    def save(self, data):
        # saving data...
        print("save data...")

reader = Reader()
parser = Praser()
writer = Writer()

data = reader.read()
parsed_data = parser.parse(data)
writer.save(parsed_data)
```

::right::

<br/><br/>

- 각 책임별로 클래스 분리
- 결합도(의존도) ⬇️
  
  : 코드 변경이 영향을 줄 가능성 ⬇️

- 확장성 ⬆️ 
  
  : 인터페이스를 통일하여 다양한 모듈을 만들어서 사용할 수 있음 (즉, 조합하기 쉬워진다.)

  `CsvReader`, `JsonReader`, `JsonParser`, `YamlParser`, `CsvSaver`, `PickleSaver`

<!--
- 변경할 일이 없고 프로그램이 복잡해짖 않으면 괜찮겠지만, 소프트웨어 세계에서 변경할 일이 없다고 생각하는 것은 위험 (예측은 할 수 없지만 변화에 유연한 구조를 만들어둘 필요는 있음)
 - 다시 한 번 언급 : 100% 지킬 수 있는 것은 아니다. (시간/코드 복잡도 측면) 다만, 계속해서 리팩토링을 거치면서 그런 방향으로 코드를 변경해나가야 함
 -->

---
layout: center
---


# <span class="text-red-500">O</span>pen Closed

<div></div>

## 개방 폐쇄 원칙

확장에는 열려있고, 변경에는 닫혀있어야 한다.

= 기존 객체의 구현을 수정하는 것이 아니라, 새로운 객체를 추가함으로써 기능을 추가한다.

---
layout: two-cols
---

# BAD

```py
class ReportSender:
    def __init__(self, report: str):
        self.report = report

    def send(self, send_type: str, receiver: str):
        if send_type == "email":
            print("email 전송")
        elif send_type == "printer":
            print("printer")
        elif send_type == "fax":
            print("fax 전송")

sender = ReportSender("report data")
sender.send("email", "john@test.com")
sender.send("printer", "http://localhost:9100")
sender.send("fax", "012-345-6789")
```

::right::

<br/><br/>

<v-click>

- 새로운 기능을 추가하게 될 때, 기존 클래스의 함수 (send)를 건드리게 됨 → 다른 기능을 깨뜨릴 위험성 (결합도⬆️)

  💬 만약 다른 유형의 sender가 추가 된다면? (e.g, MS팀즈)
  
  💬 만약 추가적인 정보가 더 필요하다면? (e.g, API키)

</v-click>

<!--
- 마찬가지로 코드 읽을 시간 + 질문
 -->

---
layout: two-cols
---

# GOOD

```py
import abc
class BaseReportSender(abc.ABC):
    def __init__(self, report):
        self._report = report

    @abc.abstractmethod
    def send(self, to):
        pass

class EmailSender(BaseReportSender):
    def __init__(self, report, from_email):
        super().__init__(report)
        self._from = from_email

    def send(self, to):
        print(f"send email from: {self._from} to: {to}")

class MSTeamsSender(BaseReportSender):
    def __init__(self, report, api_key):
        super().__init__(report)
        self._api_key = api_key

    def send(self, to):
        print(f"send msteam to: {to} using apikey")
```

::right::

<br/><br/>

```py
def get_sender(sender_type: str) -> BaseReportSender:
    if sender_type == "email":
        return EmailSender("report data", "admin@test.com")
    elif sender_type == "msteams":
        return MSTeamsSender("report data", "key-xxxxx")
    else:
        raise ValueError("Invalid Sender type")

sender = get_sender("email")
sender.send("john@test.com")
sender = get_sender("msteams")
sender.send("jane")
```

- 추상화 클래스를 사용하여 `send` 메소드 강제 (다른 언어에서는 interface 또는 trait으로 구현)
- 해당 클래스를 상속하고, send메소드만 구현하면 기존 구현을 수정하지 않고, 다른 Sender를 쉽게 추가할 수 있음

<!--
- 추상화를 하면 된다!
- 위코드에서 get_sender로 원하는 instance를 선택 => 팩토리 패턴
- 추상화를 하여 메소드를 통일 => 전략패턴으로 사용할 수 있음
- 디자인 패턴들도 대부분 SOLID 기반/보완하기 위해 만들어짐
 -->

---
layout: center
---

# <span class="text-red-500">L</span>iskov Substitution

<div></div>

## 리스코프 치환 원칙

자식 클래스가 부모 클래스를 대체하여도 프로그램이 의도한대로 동작하여야 한다.

<v-click>

= 메소드의 오버라이딩이 부모 클래스 메소드의 본질을 바꿔선 안된다.

</v-click>

<!--
- 난 아직 어렵다.
 -->

---
layout: two-cols
---

# BAD

```py
class Rectangle:
    def __init__(self):
        self._width = 0
        self._height = 0

    def set_width(self, w: float):
        self._width = w
  
    def set_height(self, h: float):
        self._height = h

    @property
    def area(self) -> float:
         return self._width * self._height

class Square(Rectangle):
    def set_width(self, w: float):
        self._width = w
        self._height = w

    def set_height(self, h: float):
        self._width = h
        self._height = h
```

::right::

<br/><br/>

```py
rect = Square()
rect.set_width(4)
rect.set_height(5)
print(rect.area)  # It prints 25, instead of 20
```

<v-click>

- 논리적으로 정사각형은 직사각형이지만,

  상속관계를 두는 것은 적절치 않음

- 리스코프 원칙을 위반할 경우,

  Open-Closed 원칙을 위반할 확률이 높다.
  
  (if 구문등으로 분기해서 처리해야하므로)

</v-click>

<!--
- 뭐가 문제일까?
- 개발자의 예상을 벗어남 -> 사이드 이펙트
 -->

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
    def __init__(self, w: float, h: float):
        self._width = w
        self._height = h

    @property
    def area(self):
      return self._width * self._height

class Square(Shape):
    def __init__(self, l: float):
        self._length = l

    @property
    def area(self):
        return self._length * self._length
```

::right::

<br/><br/>

```py
rect1 = Square(4)
rect2 = Rectangle(4, 5)
print(rect1.area) # 16
print(rect2.area) # 20
```

- 정사각형-직사각형 관계보다 더 포괄적인 도형을 상속하도록 변경하고 코드를 리팩토링

<!--
- 개인적인 생각으로는 SOLID 중에 가장 이해하기 어려운 개념. 하지만 중요함

- 이 때문에 최근에 나오는 일부 언어들 (Golang, Rust)는 상속을 지원하지 않음 (오로지 인터페이스만 제공)

- 뒤에 또다른 예제 제공
-->

---
layout: center
---

# Another Example

---
layout: two-cols
---

# BAD

```py
class Bird:
    def eat(self, food: str):
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
```

::right::

<br/><br/>

<v-click>

- Chicken Object의 경우 fly 메소드가 있어선 안된다.
- Bird를 사용하는 함수가 있다고 했을 때, fly 함수에서를 발생하길 기대하지 않는다.

  → 사이드 이펙트
  
  → <span class="text-red-500">is-a</span> 관계라고 해서 모두 상속이 바람직한 것은 아님

  → 함수 오버라이딩을 할 때 주의하자!

</v-click>

<!--
- 오리 / 치킨은 모두 새
- 새를 사용하는 함수는 날거라고 기대하는데, 예외가 발생할거라고 기대하지 않는다 -> 사이드 이펙트
-->

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

class Plane(Flyable):
    pass

flyables = [Duck(), Plane()]
for each in flyables:
    each.fly()
```

::right::

<br/><br/>

- Mixin을 활용 (다른 언어에서는 interface 활용 가능)
  <div class="text-xs -mt-4">*Mixin: 클래스를 최소한의 행동(책임)으로 정의하여 상속받는 형태로 구현하는 설계방식</div>

- 요즘에는 상속보다 Interface (Trait)등을 활용하는 쪽으로 언어가 발전하고 있다. (e.g. `golang`, `rust`)

→ 조금 더 변경에 유연한 코드를 작성할 수 있다.

<!--
- Plane은 새가 아니다. 새일 필요가 없다.

- 유연한 코드 - 먹이주기 예제 설명 (충전도 먹이로?)

- 다음에 설명할 인터페이스 분리 원칙과도 이어지는 내용
-->

---
layout: center
---

# <span class="text-red-500">I</span>nterface Segregaton 

<div></div>

## 인터페이스 분리 원칙

클래스는 자신이 이용하지 않는 메서드에 의존해서는 안된다.

<v-click>

= 인터페이스가 한가지 책임을 하게 해야한다. (의존성 ⬇️)

</v-click>

---
layout: two-cols
---

# BAD

```py
class Character(abc.ABC):
    @abc.abstractmehtod
    def attack(self, other: str):
        print(f"I attack {other}")
  
    @abc.abstractmehtod
    def talk(self, other: str):
        print(f"I talk to {other}")

    @abc.abstractmehtod
    def move(self, x: int, y: int):
        print(f"I move to ({x}, {y})")

class Monster(Character):
    def attack(self, other: str):
        print(f"Monster attack {other}")
  
    def move(self, x: int, y: int):
        print(f"Monster move to ({x}, {y})")

class NPC(Character):
    def talk(self, other: str):
        print(f"NPC talk to {other}")
```

::right::

<br/><br/>

```py
monster = Monster()
monster.talk("someone") # Shouldn't be possible
npc = NPC()
npc.move(5, 10) # Shouldn't be possible
```

<v-click>

- 사용하지 않는 인터페이스(추상클래스)의 메소드에도 의존하고 있음 → 사이드이펙트
- 인터페이스 관점에서 SRP가 제대로 이루어지지 않고 있음

</v-click>

---
layout: two-cols
---

# GOOD

```py
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
```

::right::

<br/><br/>

```py
monster = Monster()
monster.move(10, 15)
monster.attack("john")
npc = NPC()
npc.talk("jane")
    
```

- 필요한 속성(역할)만 사용 - 사이드 이펙트  ⬇️
- 가독성 ⬆️ - 각 클래스가 어떤 역할을 하는지 쉽게 알 수 있음

<!--
- Able이라는 단어를 많이쓰는 것 언급 (자격 / 특성)
-->

---
layout: center
---

# <span class="text-red-500">D</span>ependcy Inversion

<div></div>

## 의존성 역전 원칙

- 상위 모듈은 하위 모듈에 의존해서는 안된다. **모두 추상 모듈에 의존**해야 한다.
- 추상 모듈은 구체화된 모듈에 의존해서는 안된다. **구체화된 모듈이 추상 모듈에 의존해야 한다.**

<!--
- 그림으로 설명 (상위 모듈 하위 모듈)
-->

---
layout: two-cols
---

# BAD

```py
class TeamsBot:
    def send_message_to_teams(self, message: str):
        print("send message to teams")

class SlackBot:
    def send_alert_to_slack(self, channel: str, message: str):
        print("send message to slack")

class AlertService:
    def __init__(self):
        self.teams_bot = TeamsBot()

    def alert(self, message: str):
        self.teams_bot.send_message_to_teams(message)

alert_service = AlertService()
alert_service.alert("Hello, World")
```

::right::

<br/><br/>

<v-click>

- 상위모듈 (`AlertService`)이 하위모듈 (`TeamsBot`)에 의존하고 있음
- Alert를 Teams가 아닌 Slack에 보내야한다면 상위 모듈 (AlertService) alert로직이 수정되어야 함 (OCP 위반)

</v-click>

---
layout: two-cols
---

# Another BAD

```py
class MessageSender(abc.ABC):
  def send(self, message):
    if isinstance(self, TeamsBot):
        self.send_message_to_teams(message)
    elif isinstance(self, SlackBot):
        self.send_message_to_slack(message)
    else:
        raise ValueError("Something went wrong")

class TeamsBot(MessageSender):
    def send_message_to_teams(self, message: str):
        print("send message to teams")

class SlackBot(MessageSender):
    def __init__(self, channel: str):
        self.channel = channel

    def send_message_to_slack(self, message: str):
        print("send message to slack")
```

::right::

<br/><br/>

```py
class AlertService:
  def __init__(self, sender: MessageSender):
    self.sender = sender

  def alert(message: str):
    sender.send(message)

sender = TeamsBot()
alert_service = AlertService(sender)
alert_service.alert()
```

- 추상 모듈(`MessageSender`)이 구체화된 모듈(`TeamsBot`, `SlackBot`)에 의존하고 있음 (역시 OCP 위반)

<!--
- 추상화된 객체 또는 추상화된 객체를 상속받은 객체를 다룰 때 `if isinstance`를 하고 있다면 다시 한 번 생각하자.
- 라이브러리로 분리해서 사용한다고 생각해보자. 추상모듈을 수정하러 가기조차 어려운 상황
-->

---
layout: two-cols
---

# Good

```py
class MessageSender(abc.ABC):
  @abc.abstractmethod
  def send(self, message: str):
      pass

class TeamsBot(MessageSender):
    def send(self, message: str):
        print(f"send '{message}' to teams")

class SlackBot(MessageSender):
    def __init__(self, channel: str):
        self.channel = channel

    def send(self, message: str):
        print(f"send '{message}' to slack")
```

::right::

<br/><br/>

```py
class AlertService:
  def __init__(self, sender: MessageSender):
    self.sender = sender

  def alert(message: str):
    sender.send(message)

sender = TeamsBot()
alert_service = AlertService(sender)
alert_service.alert()
```

- 하위 모듈과 상위 모듈이 모두 추상화된 모듈 `MessageSender`에 의존하게 함으로써 다른 모듈로 변경이 자유로움

---
layout: center
---

## 그럼 이제 우리 모두 SOLID를 완벽히 지켜서 프로그래밍 해야 할까요?

---
layout: center
---

# SOLID는 이상향이다.

<v-click>

항상 지킬 수 있는 것은 아니다. 그리고 항상 옳은 것도 아니다. (시간의 제약, 코드의 복잡도⬆️)

</v-click>

<v-click>

잘못된 추상화로 코드의 변경이 더 어려울 수도 있다.

</v-click>

<v-click>

하지만, 우리의 코드가 성장함에 따라 점차 도달해야 하는 <span class="text-red-500">지향점</span>이다.

</v-click>

<v-click>

우리에겐 <span class="text-red-500">'리팩터링'</span>이 있다.

</v-click>

---
layout: center
---

# 감사합니다.