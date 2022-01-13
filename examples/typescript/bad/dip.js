"use strict";
class TeamsBot {
  sendMessageToTeams(message) {
    console.log(`send ${message} to teams`);
  }
}
class SlackBot {
  sendMesssageToSlack(channel, message) {
    console.log(`send ${message} to slack (${channel})`);
  }
}
class AlertService {
  constructor() {
    this.teamsbot = new TeamsBot();
  }
  alert(message) {
    this.teamsbot.sendMessageToTeams(message);
  }
}
(function () {
  const alert_service = new AlertService();
  alert_service.alert("Hello, World");
})();
