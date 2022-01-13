"use strict";
class BaseReportSender {
    constructor(report) {
        this.report = report;
    }
}
class EmailSender extends BaseReportSender {
    constructor(report, from) {
        super(report);
        this.from = from;
    }
    send(to) {
        console.log(`send email from: ${this.from} to: ${to}`);
    }
}
class MSTeamsSender extends BaseReportSender {
    constructor(report, apikey) {
        super(report);
        this.apikey = apikey;
    }
    send(to) {
        console.log(`send email from: ${this.apikey} to: ${to}`);
    }
}
function get_sender(sender_type) {
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
