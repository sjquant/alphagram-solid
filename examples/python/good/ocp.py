import abc


class BaseReportSender(abc.ABC):
    def __init__(self, report):
        self._report = report

    @abc.abstractmethod
    def send(self, to):
        pass


class EmailSender(BaseReportSender):
    def __init__(self, report):
        super().__init__(report, from_email)
        self._from = from_email

    def send(self, to):
        print(f"send email from: {self._from} to: {to}")


class MSTeamsSender(BaseReportSender):
    def __init__(self, report, api_key):
        super().__init__(report)
        self._api_key = api_key

    def send(self, to):
        print(f"send msteam to: {to} using apikey")



def get_sender(sender_type):
    if sender_type == "email":
        return EmailSender("report data", "admin@test.com")
    elif sender_type == "msteams":
        return MSTeamsSender("report data", "key-xxxxx")
    else:
        raise ValueError("Invalid Sender type")


sender = get_sender("email")
sender.send("john@test.com")
sender = get_sender("msteams")
sender.send("jane")