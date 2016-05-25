'use strict';

function mapColourToTileType(hsvValues) {
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

module.exports = mapColourToTileType;
