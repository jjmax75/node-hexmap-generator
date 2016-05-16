'use strict';

const test = require('tape');
const imageWorker = require('../src/imageWorker');
const path = process.cwd();
const imageFile = path + '/test/resources/map.png';
const testImage = imageWorker(imageFile);


test('imageWorker function returns tests', function(t) {
  t.plan(2);
  t.equal(testImage.width, 1465, 'should return width of 828 for testImage');
  t.equal(testImage.height, 600, 'should return height of 315 for testImage');
});
