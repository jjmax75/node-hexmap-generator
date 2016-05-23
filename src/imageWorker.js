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
      if (err) return cb(err, null);
      console.log('Crunching Pixels Baby! Yeah!');
      return cb(null, pixels);
    })
  };

  image.sampleGetter = function(pixels, xPos, yPos, length) {
    let sampleArray = [];
    let xLength = length;
    let yLength = length;

    if (xPos > 0) {
      xPos = Math.round(xPos - length/2);
    }

    if (yPos > 0) {
      yPos = Math.round(yPos - length/2);
    }

    if (xPos <= 0) {
      xLength = Math.round(length/2);
    }

    if (yPos <= 0) {
      yLength = Math.round(length/2);
    }

    // loop through pixel ndarray and push rgb values to samples
    for (let y = yPos; y < yPos + yLength; y++) {
      for (let x = xPos; x < xPos + xLength; x++) {
        for (var z = 0; z < 4; z++) {
          sampleArray.push(pixels.get(x, y, z));
        }
      }
    }

    return sampleArray;
  };

  image.averageColour = function(data) {
    var rgb = {r:0,g:0,b:0};
    var length = data.length;
    var count = 0;

    for (var i = 0; i < length; i += 4) {
      rgb.r += data[i];
      rgb.g += data[i + 1];
      rgb.b += data[i + 2];
      count ++;
    }

    rgb.r = Math.round(rgb.r / count);
    rgb.g = Math.round(rgb.g / count);
    rgb.b = Math.round(rgb.b / count);

    return rgb;
  }

  image.rgbToHsv = function(r, g, b) {
    // http://stackoverflow.com/questions/8022885/rgb-to-hsv-color-in-javascript
    var rr, gg, bb,
        r = r / 255,
        g = g / 255,
        b = b / 255,
        h, s,
        v = Math.max(r, g, b),
        diff = v - Math.min(r, g, b),
        diffc = function(c){
            return (v - c) / 6 / diff + 1 / 2;
        };

    if (diff == 0) {
        h = s = 0;
    } else {
        s = diff / v;
        rr = diffc(r);
        gg = diffc(g);
        bb = diffc(b);

        if (r === v) {
            h = bb - gg;
        }else if (g === v) {
            h = (1 / 3) + rr - bb;
        }else if (b === v) {
            h = (2 / 3) + gg - rr;
        }
        if (h < 0) {
            h += 1;
        }else if (h > 1) {
            h -= 1;
        }
    }
    return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        v: Math.round(v * 100)
    };
  }

  return image;

}

module.exports = imageWorker;
