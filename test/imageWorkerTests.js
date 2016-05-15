var test = require('tape');
var imageWorker = require('../src/imageWorker');
var path = process.cwd();
var testImage = imageWorker(path + '/test/resources/hi-my-name-is-free-code-camp-cm.png');

test('imageWorker function returns tests', function(t) {
  t.plan(2);
  t.equal(testImage.width(), 828, 'should return width of 828 for testImage');
  t.equal(testImage.height(), 315, 'should return height of 315 for testImage');
});
