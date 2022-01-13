abstract class BaseReportSender {
  private report: string;
  constructor(report: string) {
    this.report = report;
  }
  abstract send(to: string): void;
}

class EmailSender extends BaseReportSender {
  private from: string;
  constructor(report: string, from: string) {
    super(report);
    this.from = from;
  }
  send(to: string): void {
    console.log(`send email from: ${this.from} to: ${to}`);
  }
}

class MSTeamsSender extends BaseReportSender {
  private apikey: string;
  constructor(report: string, apikey: string) {
    super(report);
    this.apikey = apikey;
  }
  send(to: string): void {
    console.log(`send email from: ${this.apikey} to: ${to}`);
  }
}

function get_sender(sender_type: string): BaseReportSender {
  switch (sender_type) {
    case "email":
      return new EmailSender("report data", "admin@test.com");
    case "msteams":
      return new MSTeamsSender("report data", "key-xxxxx");
    default:
      throw Error("Invalid Sender type");
  }
}

(function () {
  const sender1 = get_sender("email");
  sender1.send("john@test.com");
  const sender2 = get_sender("msteams");
  sender2.send("jane");
})();
