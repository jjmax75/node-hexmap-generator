'use strict';

const imageFile = process.argv[2];
const outputFile = process.argv[3];
const numCols = process.argv[4];
const numRows = process.argv[5];

const createGridPoints = require('src/createGridPoints.js');
const imageWorker = require('src/imageWorker.js');

const image = imageWorker(imageFile);
const gridPoints = createGridPoints(image.width, image.height, numCols, numRows);
