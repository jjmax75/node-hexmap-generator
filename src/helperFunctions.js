'use strict';

const Promise = require('bluebird');
const fs = require('fs');

function generatorHelper() {
  let helper = new Object();

  helper.getPixels = function(imageObject) {
    return new Promise(function (resolve, reject) {
      imageObject.pixelGetter(function (err, result) {
        if (err) {
          reject(err);
        } else {
          var pixels = result;
          console.log('Crunched Yoh!');
          resolve(result);
        }
      });
    });
  };

  helper.getSamplePixelsColours = function(pixels, hexRadius, hexCentres, imageObject) {
    let sampleColours = [];
    const length = Math.floor(hexRadius);

    hexCentres.forEach(function(hexCentrePixel) {
      let roundedHexCentrePixelX = Math.round(hexCentrePixel[0]);
      let roundedHexCentrePixelY = Math.round(hexCentrePixel[1]);
      // send the pixelsArray, each centre pixelX&Y, length to sampleGetter
      sampleColours.push(imageObject.sampleGetter(pixels, roundedHexCentrePixelX, roundedHexCentrePixelY, length));
    });

    return sampleColours;
  }

  helper.getAverageColours = function(sampleColours, imageObject) {
    let averageColours = [];

    sampleColours.forEach(function(sample) {
      averageColours.push(imageObject.averageColour(sample));
    });

    return averageColours;
  }

  helper.convertToHSV = function(averageColours, imageObject) {
    let hsvValues = [];

    averageColours.forEach(function(rgb) {
      hsvValues.push(imageObject.rgbToHsv(rgb.r, rgb.g, rgb.b));
    });

    return hsvValues;
  }

  helper.mapColourToTileType = function(hsvValues) {
    let terrain = [];

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

    return terrain;
  }


  helper.writeToFile = function(terrain, outputFile) {

    fs.writeFile(outputFile, JSON.stringify(terrain), function(err) {
      if(err) {
          return console.log(err);
      }

      console.log("The file was saved!");
    });
  }

  return helper;
}

module.exports = generatorHelper;
