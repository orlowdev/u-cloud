const { readFileSync, writeFileSync, statSync } = require('fs');
const { prop } = require('ramda');
const { pipe, divideBy } = require('./src/utils');

const sourceFilePath = './my.html';
const outputFilePath = './выхлоп.html';

const content = readFileSync(sourceFilePath, { encoding: 'utf-8' });

const getFileSize = pipe(
    statSync,
    prop('size'),
    divideBy(1024),
    Math.round,
)

writeFileSync(outputFilePath, content);

console.log(
    `Copied ${getFileSize(sourceFilePath)}KB from ${sourceFilePath} to ${outputFilePath}`
);
