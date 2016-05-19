# Node Hex Tile Map Generator by Box It Off

Input - png

Output - array of map terrain to file

## Example
Turn this -

![An image of part of the world][world]

[world]: https://github.com/jjmax75/node-hexmap-generator/blob/master/test/resources/map.png "World - Asia, Europe, North Africa"

## Usage
`npm hexMapGenerator.js <input-file.png> <output-file> <cols> <rows>`

## Further Development
- output code for rendering map
- command line inputs
- Browser gui

## Tasks
- [x] get image width and height
- [x] get hex radius
- [x] get center point of each hex
- [x] get pixel sample (array->rgba values) function
- [x] get average colour(array->rgb) of each sample
- [x] get hsv(array) values from rgb averages
- [x] convert hsv to terrain type (array)
- [x] output array to file
- [ ] clean up code :)
- [ ] interface for viewing array as image and finetuning
