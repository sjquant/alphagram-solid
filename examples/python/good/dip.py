import abc

class MessageSender(abc.ABC):
  @abc.abstractmethod
  def send(self, message):
      pass

class TeamsBot(MessageSender):
    def send(self, message):
        print(f"send '{message}' to teams")

class SlackBot(MessageSender):
    def __init__(self, channel):
        self.channel = channel

    def send(self, message):
        print(f"send '{message}' to slack")

class AlertService:
  def __init__(self, sender):
    self.sender = sender

  def alert(self, message):
    sender.send(message)

sender = TeamsBot()
alert_service = AlertService(sender)
alert_service.alert("HELLO, WORLD")