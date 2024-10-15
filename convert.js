const fs = require("fs");
const csv = require("csv-parser");
const path = require("path");

const inputFile = path.join(__dirname, "data", "pincodes.csv");
const pincodeOutputFile = path.join(
  __dirname,
  "converted_json",
  "pincodes.json"
);
const officeNameOutputFile = path.join(
  __dirname,
  "converted_json",
  "officenames.json"
);

const pincodes = [];
const officeNames = [];

fs.createReadStream(inputFile)
  .pipe(csv())
  .on("data", (data) => {
    pincodes.push(data.pincode);
    officeNames.push(data.officename);
  })
  .on("end", () => {
    fs.mkdirSync(path.dirname(pincodeOutputFile), { recursive: true });

    fs.writeFileSync(pincodeOutputFile, JSON.stringify(pincodes));
    fs.writeFileSync(officeNameOutputFile, JSON.stringify(officeNames));

    console.log("Pincodes extracted to pincodes.json!");
    console.log("Office names extracted to officenames.json!");
  })
  .on("error", (error) => {
    console.error("Error reading CSV file:", error);
  });
