'use strict';

const path = process.cwd();

const imageFile = path + '/' + process.argv[2];
const outputFile = path + '/output/' + process.argv[3];
const numCols = process.argv[4];
const numRows = process.argv[5];

const createGridPoints = require('./src/createGridPoints');
const imageWorker = require('./src/imageWorker');

const image = imageWorker(imageFile);
const gridPoints = createGridPoints(image.width, image.height, numCols, numRows);

const hexRadius = gridPoints.calculateHexRadius();
const hexCentres = gridPoints.calculateEachHexCentre(hexRadius);

// get rgba samples values for each hexagon
let sampleColours = [];
image.pixelGetter(setImagePixels);
function setImagePixels(pixels) {
  getSamplePixelsColours(pixels);
}
function getSamplePixelsColours(pixels) {
  const radius = Math.floor(hexRadius);
  hexCentres.forEach(function(hexCentrePixel) {
    roundedHexCentrePixel = Math.round(hexCentrePixel);
    // send the pixelsArray, each centre pixel, radius to sampleGetter to get back sample
    // image.sampleGetter(pixels, centre pixel, radius)
  });
}
