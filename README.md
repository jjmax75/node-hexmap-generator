# Node Hex Tile Map Generator by Box It Off

Input - png

Output - array of map terrain to file -

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
- [ ] get pixel sample (array->rgba values) function
- [ ] get average colour(array->rgb) of each sample
- [ ] get hsv(array) values from rgb averages
- [ ] convert hsv to terrain type (array)
- [ ] output array to file
