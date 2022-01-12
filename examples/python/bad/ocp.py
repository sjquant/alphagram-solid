class ReportSender:
    def __init__(self, report):
        self.report = report

    def send(self, send_type, receiver):
        if send_type == "email":
            print("email 전송")
        elif send_type == "printer":
            print("printer")
        elif send_type == "fax":
            print("fax 전송")


sender = ReportSender("report data")
sender.send("email", "john@test.com")
sender.send("printer", "http://localhost:9100")
sender.send("fax", "012-345-6789")