'use strict';

function imageHandler(file, cols, cb) {
  const terrainFile = file;
  const numCols = Number(cols);

  const imageToTerrainFile = require('node-image-terrain-array');
  const imageToTerrain = imageToTerrainFile(terrainFile, numCols);

  imageToTerrain.getTerrainArray()
  .then(function(terrain) {
    cb(terrain, imageToTerrain.points, imageToTerrain.hexRadius, imageToTerrain.rows);
  });
}

module.exports = imageHandler;
