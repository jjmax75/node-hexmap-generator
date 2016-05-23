'use strict';

const test = require('tape');
const path = process.cwd();
const imageWorker = require(path + '/src/imageWorker');
const helperFunctions = require(path + '/src/helperFunctions');
const imageFile = path + '/test/resources/map.png';
const testImage = imageWorker(imageFile);
const helper = helperFunctions();
let testImagePixels = '';
let testImageSample = [28,40,18,255,31,43,21,255,31,43,21,255,30,42,18,255,28,40,16,255,28,40,16,255,28,40,16,255,29,41,17,255,30,42,18,255,31,45,20,255,33,47,21,255,27,39,17,255,29,41,19,255,30,42,20,255,30,42,18,255,30,42,18,255,29,41,17,255,29,41,17,255,30,42,18,255,32,44,20,255,34,48,23,255,37,51,25,255,27,39,17,255,28,40,18,255,30,42,20,255,32,44,20,255,33,45,21,255,33,45,21,255,32,44,20,255,32,44,20,255,35,47,23,255,37,51,26,255,41,55,29,255,27,39,17,255,28,40,18,255,31,43,21,255,35,47,23,255,37,49,25,255,37,49,25,255,36,48,24,255,34,46,22,255,36,48,24,255,39,53,28,255,41,55,29,255,27,39,17,255,28,40,18,255,31,43,21,255,35,47,23,255,37,49,25,255,38,50,26,255,38,50,26,255,35,47,23,255,36,48,24,255,37,51,26,255,39,53,27,255,26,38,16,255,27,39,17,255,29,41,19,255,32,44,20,255,35,47,23,255,36,48,24,255,37,49,25,255,36,48,24,255,36,48,24,255,36,50,25,255,36,50,24,255];

test('setup', function(t) {
  helper.getPixels(testImage)
  .then(function(pixels) {
    testImagePixels = pixels;
    t.end();
  });
});

test('imageWorker function returns tests', function(t) {
  t.plan(2);
  t.equal(testImage.width, 1465, 'should return width of 828 for testImage');
  t.equal(testImage.height, 600, 'should return height of 315 for testImage');
});

test('sampleGetter functions', function(t) {
  t.plan(5);
  t.equal(testImagePixels.data.length, 3516000, 'should be a lot of pixels in there fool');
  t.deepEqual(testImage.sampleGetter(testImagePixels, 0, 0, 1), [9, 29, 40, 255], 'rgba of the centre pixel of the first hexagon');
  t.deepEqual(testImage.sampleGetter(testImagePixels, 27, 12, 1), [10, 30, 41, 255], 'rgba of the centre pixel of the 500th hexagon');
  t.deepEqual(testImage.sampleGetter(testImagePixels, 1059, 475, 1), [9, 40, 61, 255], 'rgba of the centre pixel of the 2000th hexagon');
  t.equal(testImage.sampleGetter(testImagePixels, 27, 12, 10).length, 400, 'sample should be an array with 10*10*4 elements');
});

test('averageColour function', function(t) {
  t.plan(1);
  t.deepEqual(testImage.averageColour(testImageSample), {r: 33, g: 45, b: 21}, 'Should return an average rgb value of {r: 21, g: 45, b: 33}');
});

test('rgbToHsv function', function(t) {
  t.plan(1);
  t.deepEqual(testImage.rgbToHsv(33, 45, 21), {h: 90, s: 53, v: 18}, 'Should return an hsv value of {h: 90, s: 53, v: 18}');
});

test('rgbToHsv function', function(t) {
  t.plan(1);
  t.deepEqual(testImage.rgbToHsv(33, 45, 21), {h: 90, s: 53, v: 18}, 'Should return an hsv value of {h: 90, s: 53, v: 18}');
});
