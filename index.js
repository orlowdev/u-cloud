const { copyFileSync, statSync } = require('fs');
const { prop } = require('ramda');
const { pipe, divideBy } = require('./src/utils');

const sourceFilePath = './my.html';
const outputFilePath = './выхлоп.html';

copyFileSync(sourceFilePath, outputFilePath);

const getFileSize = pipe(
    statSync,
    prop('size'),
    divideBy(1024),
    Math.round,
);

console.log(
    `Copied ${getFileSize(sourceFilePath)}KB from ${sourceFilePath} to ${outputFilePath}`
);
