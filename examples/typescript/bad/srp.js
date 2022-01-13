"use strict";
class DataSaver {
    read() {
        console.log("Reading data...");
    }
    parse() {
        console.log("Parsing data...");
    }
    save() {
        console.log("Saving data...");
    }
}
(function () {
    const saver = new DataSaver();
    saver.read();
    saver.parse();
    saver.save();
})();
