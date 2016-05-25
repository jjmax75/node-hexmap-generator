'use strict';

const ds = require('d3');

function buildSVG(terrain, cols, rows, cb) {
  const terrain = terrain;
  const mapColumns = cols;
  const mapRows = rows

  // arbritary numbers solely for hex radius calculation
  let width = 1200;
  let height = 900;

  const hexRadius = d3.min([width/((mapColumns + 0.5) * Math.sqrt(3)),
  			height/((mapRows + 1/3) * 1.5)]);
}

module.exports = buildSVG;
