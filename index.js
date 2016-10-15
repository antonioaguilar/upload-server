#!/usr/bin/env node

var host = process.env.HOST || '0.0.0.0';
var port = process.env.PORT || 8090;
var folder = process.env.FOLDER || process.cwd() + '/uploads';

var fs = require('fs');
var express = require('express');
var multer = require('multer');
var app = express();

fs.existsSync(folder) || fs.mkdirSync(folder);

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, folder);
  },
  filename: function (req, file, cb) {
    var fieldName = 'file';
    req.body[fieldName] ? cb(null, req.body[fieldName]) : cb(null, file.originalname);
  }
});

var upload = multer({ storage: storage });

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/', function (req, res) {
  res.send('<form action="/upload" method="POST" enctype="multipart/form-data">\n  <input type="file" name="file">\n  <input type="submit" value="Upload File">\n</form>\n');
});

app.post('/upload', upload.any(), function (req, res) {
  console.log('[' + new Date() + '] - File uploaded:', req.files[0].path);
  res.end();
});

app.listen(port, host, function () {
  console.log('[' + new Date() + '] - File Upload Server started on ' + host + ':' + port);
});
