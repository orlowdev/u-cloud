const { copyFileSync, statSync } = require('fs');
const { prop } = require('ramda');
const { pipe, divideBy } = require('./src/utils');

const [ sourceFilePath, outputFilePath ] = process.argv.slice(2);

copyFileSync(sourceFilePath, outputFilePath);

if (!process.argv.includes('--verbose')) {
    process.exit(0);
}

const getFileSize = pipe(
    statSync,
    prop('size'),
    divideBy(1024),
    Math.round,
);

console.log(
    `Copied ${getFileSize(sourceFilePath)}KB from ${sourceFilePath} to ${outputFilePath}`
);
