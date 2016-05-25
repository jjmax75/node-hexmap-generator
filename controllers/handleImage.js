'use strict';

function imageHandler(file, rows, cols, cb) {
  const terrainFile = file;
  const numCols = Number(rows);
  const numRows = Number(cols);

  // const width & height will be proportional to the cols and rows

  const imageToTerrainFile = require('node-image-terrain-array');
  const imageToTerrain = imageToTerrainFile(terrainFile, numCols, numRows);

  imageToTerrain.getTerrainArray()
  .then(function(terrain) {
    cb(terrain, imageToTerrain.points, imageToTerrain.hexRadius);
  });
}

module.exports = imageHandler;
