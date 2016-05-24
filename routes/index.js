'use strict';

const path = process.cwd();

module.exports = function(app) {
  app.get('/', function(req, res) {
    res.render('pages/index.ejs', {
      pageTitle: 'Upload PNG'
    });
  });
}
