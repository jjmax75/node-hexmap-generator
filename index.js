'use strict';

const path = process.cwd();

const imageFile = path + '/' + process.argv[2];
const outputFile = path + '/output/' + process.argv[3];
const numCols = Number(process.argv[4]);
const numRows = Number(process.argv[5]);

const createGridPoints = require(path + '/src/createGridPoints');
const imageWorker = require(path + '/src/imageWorker');
const generatorHelper = require(path + '/src/helperFunctions');

const image = imageWorker(imageFile);
const gridPoints = createGridPoints(image.width, image.height, numCols, numRows);
const helper = generatorHelper();

// get details for the hexes
const hexRadius = gridPoints.calculateHexRadius();
const hexCentres = gridPoints.calculateEachHexCentre(hexRadius);

// get rgba samples values for each hexagon
helper.getPixels(image)
.then(function(pixels) {
  return helper.getSamplePixelsColours(pixels, hexRadius, hexCentres, image);
})
.then(function(samples) {
  console.log(samples[55]);
  return helper.getAverageColours(samples, image);
})
.then(function(averageColours) {
  return helper.convertToHSV(averageColours, image);
})
.then(function(hsvValues) {
  return helper.mapColourToTileType(hsvValues);
})
.then(function(terrain) {
  helper.writeToFile(terrain, outputFile);
  // TODO refactor to return array
})
.catch(function(error) {
  console.log(error);
});
