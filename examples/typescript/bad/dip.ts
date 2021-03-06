class TeamsBot {
  sendMessageToTeams(message: string): void {
    console.log(`send ${message} to teams`);
  }
}

class SlackBot {
  sendMesssageToSlack(channel: string, message: string) {
    console.log(`send ${message} to slack (${channel})`);
  }
}

class AlertService {
  teamsbot: TeamsBot;
  constructor() {
    this.teamsbot = new TeamsBot();
  }

  alert(message: string): void {
    this.teamsbot.sendMessageToTeams(message);
  }
}

(function () {
  const alert_service = new AlertService();
  alert_service.alert("Hello, World");
})();
