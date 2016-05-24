# Node Hex Tile Map Generator by Box It Off

Input - array of terrain types

Output - svg code for map terrain

## Example
Turn this -

["water","water","water","water","water","water", ...,"land"...,"desert"...,"mountain"]

Into this -

![An image of part of the world][worldHexGrid]

## Usage
`npm hexMapGenerator.js <input-file.png> <output-file> <cols> <rows>`

## Further Development
- output code for rendering map
- command line inputs
- Browser gui

## Tasks
- [ ] take array input
- [ ] return svg code

[worldHexGrid]: https://github.com/jjmax75/node-hexmap-generator/blob/master/test/resources/example-output.png "World Hex Grid - Asia, Europe, North Africa"
