'use strict';

function createGridPoints(maxWidth, maxHeight, numCols, numRows) {
  let gridPoints = new Object();

  gridPoints.maxWidth = maxWidth;
  gridPoints.maxHeight = maxHeight;
  gridPoints.numCols = numCols;
  gridPoints.numRows = numRows;

  gridPoints.numTiles = function() {
    return this.numCols * this.numRows;
  };

  return gridPoints;
}

module.exports = createGridPoints;
