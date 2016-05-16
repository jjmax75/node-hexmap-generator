'use strict';

const sizeOf = require('image-size');
const getPixels = require('get-pixels');

function imageWorker(pngFile) {
  let image = new Object();
  image.file = pngFile;
  let dimensions = sizeOf(image.file);

  image.width = dimensions.width;
  image.height = dimensions.height;

  // https://medium.com/@mackplevine/node-js-get-pixels-getting-pixels-at-specific-sectors-of-an-image-using-ndarray-e6d4cb285d36#.6av5oit45
  image.pixelGetter = function(cb) {
    getPixels(image.file, function(err, pixels) {
      if (err) console.error(err);
      console.log('Crunching Pixels Baby! Yeah!');
      cb(pixels.data);
    })
  };

  image.sampleGetter = function(pixels, radius) {
    

  };

  return image;

}

module.exports = imageWorker;
