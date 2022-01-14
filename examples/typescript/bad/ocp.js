"use strict";
class ReportSender {
    constructor(report) {
        this.report = report;
    }
    send(send_type, receiver) {
        switch (send_type) {
            case "email":
                console.log("email 전송", receiver);
                break;
            case "printer":
                console.log("printer", receiver);
                break;
            case "fax":
                console.log("Fax 전송", receiver);
        }
    }
}
(function () {
    const sender = new ReportSender("SOME_REPORT_DATA");
    sender.send("email", "john@test.com");
    sender.send("printer", "http://localhost:9100");
    sender.send("fax", "012-345-6789");
})();
