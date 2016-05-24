'use strict';

const path = process.cwd();

const terrainFile = path + '/' + process.argv[2];
const numCols = Number(process.argv[3]);
const numRows = Number(process.argv[4]);

// const width & height will be proportional to the cols and rows

const imageToTerrainFile = require('node-image-terrain-array');
const imageToTerrain = imageToTerrainFile(terrainFile, numCols, numRows);

imageToTerrain.getTerrainArray()
.then(function(terrain) {
  console.log(terrain[33]); // land on map.png
});
