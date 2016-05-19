'use strict';

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
     return Math.min(gridPoints.imgWidth/((gridPoints.numCols + 0.5) * Math.sqrt(3)),
       gridPoints.imgHeight/((gridPoints.numRows + 1/3) * 1.5));
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

  return gridPoints;
}

module.exports = createGridPoints;
