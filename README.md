# Node Hex Tile Map Generator by Box It Off

(uses https://github.com/jjmax75/node-image-terrain-array to generate input values from a PNG image)

Input - array of average hsv values for each hexagon, array of centre points of hexagons, hexagon radius

Output - svg code for map terrain

## Example

Start with this

![a physical map of part of the world][physicalmap]

Turn it into this -

[{ h: 91, s: 55, v: 21 }, {....}, .....], [[ 9.804061174918171, 16.9811320754717 ], [ ....... ], ......], 11.320754716981131

And then into this -

![An SVG representation built with hexagons of that part of the world][worldHexGrid]

## Usage
`npm hexMapGenerator.js <input-file.png> <output-file> <cols> <rows>`

## Further Development
- output code for rendering map
- command line inputs
- Browser gui

## Tasks
- [x] take array input
- [x] return svg code

[physicalmap]:  https://github.com/jjmax75/node-hexmap-generator/blob/master/test/resources/map.png "Physical Map"

[worldHexGrid]: https://github.com/jjmax75/node-hexmap-generator/blob/master/test/resources/example-output.png "World Hex Grid - Asia, Europe, North Africa"
