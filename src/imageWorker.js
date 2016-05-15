'use strict';

var PNG = require('pngjs').PNG;
var fs = require('fs');

function imageWorker(pngFile) {
  let image = new Object();

  image.file = fs.createReadStream(pngFile)
    .pipe(new PNG({
      filterType: -1
    }));

  image.width = function() {
    return this.file.width;
  };

  image.height = function() {
    return this.file.height;
  };

  return image;
}

module.exports = imageWorker;
