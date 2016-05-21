'use strict';

const Promise = require('bluebird');

function generatorHelper() {
  let helper = new Object();

  helper.getPixels = function(imageObject) {
    return new Promise(function (resolve, reject) {
      imageObject.pixelGetter(function (err, result) {
        if (err) {
          reject(err);
        } else {
          var pixels = result;
          console.log('Crunched Yoh!');
          resolve(result);
        }
      });
    });
  };

  return helper;
}

module.exports = generatorHelper;
