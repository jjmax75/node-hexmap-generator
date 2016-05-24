'use strict';

const express = require('express');
const app = express();
const morgan = require('morgan');
const multer = require('multer'); // upload - https://www.npmjs.com/package/multer#readme

require('dotenv').config();
const port = process.env.PORT || 3000;
const path = process.cwd();

app.use(morgan('dev'));
app.set('view-engine', 'ejs');

app.use('/css', express.static(path + '/static/css'));
app.use('/js', express.static(path + '/static/js'));

require(path + '/routes/index.js')(app);

app.listen(port, function() {
  console.log('Hex Generator App listening on port ' + port + '......');
});
