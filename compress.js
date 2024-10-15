const fs = require("fs");
const csv = require("csv-parser");
const path = require("path");
const zlib = require("zlib");

const inputFile = path.join(__dirname, "data", "pincodes.csv");
const locatorOutputFile = path.join(__dirname, "compressed", "locator.json.gz");

const stateDistrictPincodes = [];

fs.createReadStream(inputFile)
  .pipe(csv())
  .on("data", (data) => {
    const stateDistrictPincode = {
      statename: data.statename,
      Districtname: data.Districtname,
      pincode: data.pincode,
    };

    stateDistrictPincodes.push(stateDistrictPincode);
  })
  .on("end", () => {
    fs.mkdirSync(path.dirname(locatorOutputFile), { recursive: true });

    const jsonString = JSON.stringify(stateDistrictPincodes).replace(
      /\s+/g,
      ""
    );
    const compressedData = zlib.gzipSync(jsonString);

    fs.writeFileSync(locatorOutputFile, compressedData);

    console.log(
      "Locator data extracted and compressed to locator.json.gz in compressed folder!"
    );
  })
  .on("error", (error) => {
    console.error("Error reading CSV file:", error);
  });
