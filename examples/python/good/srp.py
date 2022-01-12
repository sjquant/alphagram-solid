class Reader:
    def read(self):
        # reading data...
        print("read data...")


class Parser:
    def parse(self, data):
        # parsing data...
        print("parsing data...")


class Writer:
    def save(self, data):
        # saving data...
        print("save data...")


reader = Reader()
parser = Praser()
writer = Writer()

data = reader.read()
parsed_data = parser.parse(data)
writer.save(parsed_data)