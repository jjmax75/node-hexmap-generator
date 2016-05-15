var test = require('tape');
var createGridPoints = require('../src/createGridPoints');
var testGrid = createGridPoints(1000, 900, 70, 35);

test('createGridPoints function return value', function(t) {
  t.plan(1);
  t.equal(testGrid.numTiles(), 2450, 'should return 2450');
});
