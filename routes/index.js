'use strict';

const path = process.cwd();

const imageHandler = require(path + '/controllers/handleImage');

const multer = require('multer');
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path + '/uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + '_' + file.originalname);
  }
});
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5242880 // 5MB
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
        const image = imageHandler(req.file.path, req.body.numCols, req.body.numRows, setTerrain);
        function setTerrain(terrain, points, hexRadius) {
          console.log(terrain[33], points[0], hexRadius);
        }
        res.end('Uploaded');
      }
    });
  });
}
