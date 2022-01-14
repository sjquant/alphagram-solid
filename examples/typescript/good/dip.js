"use strict";
class GoodTeamsBot {
    send(message) {
        console.log(`send '${message}' to teams`);
    }
}
class GoodSlackBot {
    constructor(channel) {
        this.channel = channel;
    }
    send(message) {
        console.log(`send '${message}' to teams`);
    }
}
class GoodAlertService {
    constructor(sender) {
        this.sender = sender;
    }
    alert(message) {
        this.sender.send(message);
    }
}
(function () {
    const slackBot = new GoodSlackBot("HAPPY_CHANNEL");
    const alert_service = new GoodAlertService(slackBot);
    alert_service.alert("Hello, World");
})();
