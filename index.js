const { createReadStream, createWriteStream, stat } = require("fs");
const { SingleBar, Presets } = require("cli-progress");
const { createGzip } = require("zlib");

const bar = new SingleBar({}, Presets.shades_classic);

const [sourceFilePath, outputFilePath] = process.argv.slice(2);

const readStream = createReadStream(sourceFilePath);
const writeStream = createWriteStream(outputFilePath);
const gzipStream = createGzip();

stat(sourceFilePath, (error, stat) => {
  if (error !== null) {
    console.log(error.message);
    process.exit(1);
  }

  bar.start(stat.size, 0);

  readStream.pipe(
    gzipStream
      .on("data", (chunk) => {
        writeStream.write(chunk);

        bar.increment(chunk.length);
      })
      .on("close", () => {
        bar.stop();
      })
  );
});
