'use strict';

var imageFile = process.argv[2];
var outputFile = process.argv[3];
var maxWidth = process.argv[4];
var maxHeight = process.argv[5];
var numCols = process.argv[6];
var numRows = process.argv[7];

var createGridPoints = require('src/createGridPoints.js');
var imageWorker = require('src/imageWorker.js');

var gridPoints = createGridPoints(maxWidth, maxHeight, numCols, numRows);
