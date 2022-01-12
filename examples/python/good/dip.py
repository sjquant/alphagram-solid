class MessageSender(abc.ABC):
  @abc.abstractmehtod
  def send(self, message):
      pass

class TeamsBot:
    def send_message_to_teams(self, message):
        print("send message to teams")

class SlackBot:
    def __init__(self, channel):
        self.channel = channel

    def send_alert_to_slack(self, message):
        print("send message to slack")

class AlertService:
  def __init__(self, sender):
    self.sender = sender

  def alert(message):
    sender.send(message)

sender = TeamsBot()
alert_service = AlertService(sender)
alert_service.alert()