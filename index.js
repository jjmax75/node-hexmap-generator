'use strict';

const fs = require('fs');
const path = process.cwd();

const imageFile = path + '/' + process.argv[2];
const outputFile = path + '/output/' + process.argv[3];
const numCols = Number(process.argv[4]);
const numRows = Number(process.argv[5]);

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
  console.log('Crunched Yoh!');
  getSamplePixelsColours(pixels);
}
function getSamplePixelsColours(pixels) {
  const length = Math.floor(hexRadius);
  hexCentres.forEach(function(hexCentrePixel) {
    let roundedHexCentrePixelX = Math.round(hexCentrePixel[0]);
    let roundedHexCentrePixelY = Math.round(hexCentrePixel[1]);
    // send the pixelsArray, each centre pixelX&Y, length to sampleGetter
    sampleColours.push(image.sampleGetter(pixels, roundedHexCentrePixelX, roundedHexCentrePixelY, length));
  });
  getAverageColours();
}

function getAverageColours() {
  let averageColours = [];
  sampleColours.forEach(function(sample) {
    averageColours.push(image.averageColour(sample));
  });
  convertToHSV(averageColours);
}

function convertToHSV(averageColours) {
  let hsvValues = [];

  averageColours.forEach(function(rgb) {
    hsvValues.push(image.rgbToHsv(rgb.r, rgb.g, rgb.b));
  });

  mapColourToTileType(hsvValues);
}

function mapColourToTileType(hsvValues) {
  var terrain = [];

  function getCellType(cellHue) {
    switch (true) {
      case (cellHue <= 35):
        return 'mountain';
        break;
      case (cellHue <= 59):
        return 'desert';
        break;
      case (cellHue <= 159):
        return 'land';
        break;
      case (cellHue <= 240):
        return 'water';
        break;
      default:
        return 'wtf';
    }
  }

  hsvValues.forEach(function(hsv) {
    terrain.push(getCellType(hsv.h));
  });

  writeToFile(terrain);
}

function writeToFile(terrain) {
  fs.writeFile(outputFile, JSON.stringify(terrain), function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
  });
}
