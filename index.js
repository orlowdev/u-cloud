const { copyFile, stat } = require("fs");
const { prop } = require("ramda");
const { pipe, divideBy, callbackErrorHandler } = require("./src/utils");

const [sourceFilePath, outputFilePath] = process.argv.slice(2);

copyFile(sourceFilePath, outputFilePath, callbackErrorHandler);

if (!process.argv.includes("--verbose")) {
  process.exit(0);
}

stat(sourceFilePath, (error, stat) => {
  callbackErrorHandler(error);

  const getFileSize = pipe(prop("size"), divideBy(1024), Math.round);

  console.log(
    `Copied ${getFileSize(stat)}KB from ${sourceFilePath} to ${outputFilePath}`
  );
});
