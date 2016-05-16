'use strict';

var d3 = require('d3');

function createGridPoints(imgWidth, imgHeight, numCols, numRows) {
  let gridPoints = new Object();

  gridPoints.imgWidth = imgWidth;
  gridPoints.imgHeight = imgHeight;
  gridPoints.numCols = numCols;
  gridPoints.numRows = numRows;

  gridPoints.numTiles = function() {
    return this.numCols * this.numRows;
  };

  gridPoints.calculateHexRadius = function() {
     return d3.min([imgWidth/((numCols + 0.5) * Math.sqrt(3)),
       imgHeight/((numRows + 1/3) * 1.5)]);
  };

  gridPoints.calculateEachHexCentre = function(hexRadius) {
    var points = [];
    for (var i = 0; i < numRows; i++) {
      for (var j = 0; j < numCols; j++) {
        var a;
        var b = (3 * i) * hexRadius / 2;
        if (i % 2 == 0) {
          a = Math.sqrt(3) * j * hexRadius;
        } else {
          a = Math.sqrt(3) * (j - 0.5) * hexRadius;
        }
        // don't add if centre of hex is outside image
        if (a >= 0 && b >= 0) {
          points.push([a, b]);
        }
      }//for j
    }//for i

    return points;
  };

  // gridPoints.getSamples = function(image, points, hexRadius) {
  //   var samples = [];
  //
  //   function getPixels(x, y, sampleLength) {
  //     var topLeftX = x - sampleLength/2; // x coord of top left corner of sample
  // 		var topLeftY = y - sampleLength/2; // y coord of top left corner of sample
  //
  //     // if (topLeftX >= 0 && topLeftY >= 0){
  // 		// 	return context.getImageData(topLeftX, topLeftY, sampleLength, sampleLength);
  // 		// } else if (topLeftX < 0 && topLeftY < 0) {
  // 		// 	return context.getImageData(pointX, pointY, sampleLength/2, sampleLength/2);
  // 		// } else if (topLeftX < 0) {
  // 		// 	return context.getImageData(pointX, topLeftY, sampleLength/2, sampleLength);
  // 		// } else {
  // 		// 	return context.getImageData(topLeftX, pointY, sampleLength, sampleLength/2);
  // 		// }
  //   }
  //
  //   points.forEach(function(point) {
  //     samples.push(getPixels(point[0], point[1], hexRadius));
  //   });
  //   return samples;
  // };

  return gridPoints;
}

module.exports = createGridPoints;
