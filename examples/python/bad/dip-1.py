class TeamsBot:
    def send_message_to_teams(self, message):
        print("send message to teams")

class SlackBot:
    def send_alert_to_slack(self, channel, message):
        print("send message to slack")

class AlertService:
    def __init__(self):
        self.teams_bot = TeamsBot()

    def alert(self, message):
        self.teams_bot.send_message_to_teams(message)

alert_service = AlertService()
alert_service.alert()