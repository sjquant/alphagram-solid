class DataSaver {
  read(): void {
    console.log("Reading data...");
    console.log("Parsing data...");
  }

  save(): void {
    console.log("Saving data...");
  }
}

(function () {
  const saver = new DataSaver();
  saver.read();
  saver.save();
})();
