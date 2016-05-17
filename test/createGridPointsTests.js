'use strict';

const test = require('tape');
const createGridPoints = require('../src/createGridPoints');
const testGrid = createGridPoints(1465, 600, 70, 35);
const testHexRadius = 11.320754716981131;
const testHexCentreArray = testGrid.calculateEachHexCentre(testHexRadius);

test('createGridPoints helper functions return values', function(t) {
  t.plan(2);
  t.equal(testGrid.numTiles(), 2450, 'should have total cells of 2450');
  t.equal(testGrid.calculateHexRadius(), 11.320754716981131, 'should have radius of 8.189365520420225');
});

test('createGridPoints points functions return values', function(t) {
  t.plan(8);
  t.ok(Array.isArray(testHexCentreArray), 'should be an array');
  t.equal(testHexCentreArray.length, 2433, 'should have 2433 elements in array');
  t.ok(Array.isArray(testHexCentreArray[0]), 'should be an array');
  t.deepEqual(testHexCentreArray[0], [0, 0], 'centre point of first hex should be [0, 0]');
  t.deepEqual(testHexCentreArray[139], [0, 33.9622641509434], 'centre point of hex 139 should be [0, 33.9622641509434]');
  t.deepEqual(testHexCentreArray[1067], [480.39899757099045, 254.71698113207546], 'centre point of hex 1067 should be [480.39899757099045, 254.71698113207546]');
  t.deepEqual(testHexCentreArray[2432], [1352.9604421387078, 577.3584905660377], 'centre point of hex 2432 should be [1352.9604421387078, 577.3584905660377]');
  t.equal(testHexCentreArray[2433], undefined, 'centre point of hex 2433 should be undefined');
});
