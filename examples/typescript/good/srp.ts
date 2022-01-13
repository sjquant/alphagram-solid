class Reader {
    read(): object[] {
        console.log("Reading data...")
        return [{"a": 1, "b": 2}]
    }
}

class Parser {
    parse(data: object[]): object[] {
        // Using data...
        console.log("Parsing data...")
        return data
    }
}

class Saver {
    save(data: object[]): void {
        console.log(`Saving data... ${data}`)
    }
}

(function () {
    const reader = new Reader()
    const parser = new Parser()
    const saver = new Saver()

    let data = reader.read()
    data = parser.parse(data)
    saver.save(data)
 })();