interface MessageSender {
  send(message: string): void;
}

class GoodTeamsBot implements MessageSender {
  send(message: string): void {
    console.log(`send '${message}' to teams`);
  }
}

class GoodSlackBot implements MessageSender {
  channel: string;
  constructor(channel: string) {
    this.channel = channel;
  }

  send(message: string): void {
    console.log(`send '${message}' to teams`);
  }
}

class GoodAlertService {
  sender: MessageSender;
  constructor(sender: MessageSender) {
    this.sender = sender;
  }

  alert(message: string): void {
    this.sender.send(message);
  }
}

(function () {
  const slackBot = new GoodSlackBot("HAPPY_CHANNEL");
  const alert_service = new GoodAlertService(slackBot);
  alert_service.alert("Hello, World");
})();
