'use strict';

const path = process.cwd();

const terrainFile = path + '/' + process.argv[2];
const outputFile = path + '/output/' + process.argv[3];
const numCols = Number(process.argv[4]);
const numRows = Number(process.argv[5]);

// const width & height will be proportional to the cols and rows

const imageToTerrainFile = require('node-image-terrain-array');
const imageToTerrain = imageToTerrainFile(path + '/test/resources/map.png', path + '/output/themap', 70, 35);

imageToTerrain.getTerrainArray()
.then(function(terrain) {
  console.log(terrain[33]);
});
