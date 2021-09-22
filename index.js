const { createReadStream, createWriteStream, stat } = require("fs");
const { SingleBar, Presets } = require("cli-progress");
const { callbackErrorHandler } = require("./src/utils");

const bar = new SingleBar({}, Presets.shades_classic);

const [sourceFilePath, outputFilePath] = process.argv.slice(2);

const readStream = createReadStream(sourceFilePath);
const writeStream = createWriteStream(outputFilePath);

stat(sourceFilePath, (error, stat) => {
  if (error !== null) {
    console.log(error.message);
    process.exit(1);
  }

  bar.start(stat.size, 0);

  readStream.on("data", (chunk) => {
    writeStream.write(chunk);

    bar.increment(chunk.length);
  });

  readStream.on("close", () => {
    bar.stop();
  });
});
