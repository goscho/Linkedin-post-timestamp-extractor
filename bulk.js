const fs = require("fs");
const readline = require("readline");
const extractor = require("./extractor.js");

function unixTimestampToHumanDate(timestamp) {
  const dateObject = new Date(timestamp);
  const utcString = dateObject.toUTCString() + " (UTC)";
  const germanDate = dateObject.toLocaleString("de-DE");

  return {
    utcString,
    germanDate,
  };
}

function printCSVLine(link, germanDate, UtcDate) {
  console.log(link + ";" + germanDate + ";" + UtcDate);
}

async function processLineByLine(filePath) {
  const fileStream = fs.createReadStream(filePath);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  for await (const line of rl) {
    if (line) {
      // Each line in input.txt will be successively available here as `line`.
      const unixTime = extractor.extractUnixTimestampFromURL(line);
      const timeStrings = unixTimestampToHumanDate(unixTime);
      printCSVLine(line, timeStrings.germanDate, timeStrings.utcString);
    }
  }
}

function printCsvHeader() {
  console.log("link;german date/time;UTC date/time");
}

const filePath = process.argv[2];

printCsvHeader();
processLineByLine(filePath);
