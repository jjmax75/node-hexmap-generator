'use strict';

const test = require('tape');
const imageWorker = require('../src/imageWorker');
const path = process.cwd();
const imageFile = path + '/test/resources/map.png';
const testImage = imageWorker(imageFile);
let testImagePixels = '';

test('setup', function(t) {
  testImage.pixelGetter(setImagePixels);
  function setImagePixels(pixels) {
    testImagePixels = pixels;
    t.end();
  }
});

test('imageWorker function returns tests', function(t) {
  t.plan(2);
  t.equal(testImage.width, 1465, 'should return width of 828 for testImage');
  t.equal(testImage.height, 600, 'should return height of 315 for testImage');
});

test('getting pixels functions', function(t) {
  t.plan(3);
  t.equal(testImagePixels.data.length, 3516000, 'should be a lot of pixels in there fool');
  t.deepEqual(testImage.sampleGetter(testImagePixels, 0, 0, 1), [9, 29, 40, 255], 'rgba of the centre pixel of the first hexagon');
  t.deepEqual(testImage.sampleGetter(testImagePixels, 27, 12, 1), [10, 30, 41, 255], 'rgba of the centre pixel of the 500th hexagon');
});
