'use strict';

const path = process.cwd();

const imageHandler = require(path + '/controllers/handleImage');
const hsvToTerrain = require(path + '/controllers/hueToTerrain');

const multer = require('multer');
// const storage = multer.diskStorage({
//   destination: function(req, file, cb) {
//     cb(null, path + '/uploads/');
//   },
//   filename: function(req, file, cb) {
//     cb(null, Date.now() + '_' + file.originalname);
//   }
// });
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1048576
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + '.png');
  },
  fileFilter: function(req, file, cb) {
    if (file.mimetype !== 'image/png') {
      cb(true, null);
    } else {
      cb(null, true);
    }
  }
}).single('pngFile');


module.exports = function(app) {

  app.locals.mapData = {
    terrain: [],
    cols: 0,
    rows: 0,
    hexRadius: 0,
    points: []
  };

  app.get('/', function(req, res) {
    res.render('pages/index.ejs', {
      pageTitle: 'Upload PNG'
    });
  });

  app.post('/process-image', function(req, res) {
    upload(req, res, function(err) {
      if (err) {
        res.send('Error - File must be a PNG');
      } else {
        const image = imageHandler(req.file.buffer, req.body.numCols, setTerrain);
        function setTerrain(hsvValues, points, hexRadius, rows) {
          const terrain = hsvToTerrain(hsvValues);
          req.app.locals.mapData.terrain = JSON.stringify(terrain);
          req.app.locals.mapData.cols = req.body.numCols;
          req.app.locals.mapData.rows = rows;
          req.app.locals.mapData.hexRadius = hexRadius;
          req.app.locals.mapData.points = JSON.stringify(points);

          res.redirect('/map');
        }
      }
    });
  });

  app.get('/map', function(req, res) {
    res.render('pages/hexMap.ejs', {
      pageTitle: 'Your map, Sir',
      terrain: req.app.locals.mapData.terrain,
      cols: req.app.locals.mapData.cols,
      rows: req.app.locals.mapData.rows,
      hexRadius: req.app.locals.mapData.hexRadius,
      points: req.app.locals.mapData.points
    });
  })
}
