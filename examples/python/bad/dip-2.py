import abc
class MessageSender(abc.ABC):
  def send(self, message):
    if isinstance(self, TeamsBot):
        self.send_message_to_teams(message)
    elif isinstance(self, SlackBot):
        self.send_message_to_slack(message)
    else:
        raise ValueError("Something went wrong")

class TeamsBot(MessageSender):
    def send_message_to_teams(self, message):
        print("send message to teams")

class SlackBot(MessageSender):
    def __init__(self, channel):
        self.channel = channel

    def send_message_to_slack(self, message):
        print("send message to slack")

class AlertService:
  def __init__(self, sender):
    self.sender = sender

  def alert(message):
    sender.send(message)

sender = TeamsBot()
alert_service = AlertService(sender)
alert_service.alert()