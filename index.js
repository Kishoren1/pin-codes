const { exec } = require("child_process");
const path = require("path");

const convertScript = path.join(__dirname, "convert.js");
const compressScript = path.join(__dirname, "compress.js");

const runScript = (scriptPath) => {
  return new Promise((resolve, reject) => {
    exec(`node ${scriptPath}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing ${scriptPath}:`, error);
        reject(error);
      }
      if (stderr) {
        console.error(`Error output from ${scriptPath}:`, stderr);
      }
      console.log(`Output from ${scriptPath}: ${stdout}`);
      resolve();
    });
  });
};

(async () => {
  try {
    console.log("Running convert.js...");
    await runScript(convertScript);

    console.log("Running compress.js...");
    await runScript(compressScript);

    console.log("Both scripts executed successfully!");
  } catch (error) {
    console.error("Error running scripts:", error);
  }
})();
