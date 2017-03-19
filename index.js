#!/usr/bin/env node

var args = process.argv.slice(2);
var host = process.env.HOST || '0.0.0.0';
var http_port = process.env.HTTP_PORT || 8090;
var https_port = process.env.HTTPS_PORT || 8443;
var folder = process.env.FOLDER || process.cwd() + '/uploads';
var pem_folder = process.env.PEM_FOLDER || process.cwd() + '/';

var fs = require('fs');
var http = require('http');
var https = require('https');
var express = require('express');
var multer = require('multer');
var app = express();

fs.existsSync(folder) || fs.mkdirSync(folder);

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, folder);
  },
  filename: function(req, file, cb) {
    var fieldName = 'file';
    req.body[fieldName] ? cb(null, req.body[fieldName]) : cb(null, file.originalname);
  }
});

var upload = multer({ storage: storage });

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/', function(req, res) {
  res.send('<form action="/upload" method="POST" enctype="multipart/form-data">\n  <input type="file" name="file">\n  <input type="submit" value="Upload File">\n</form>\n');
});

app.post('/upload', upload.any(), function(req, res) {
  console.log('[' + new Date() + '] - File uploaded:', req.files[0].path);
  res.end();
});

if(args[0] === '--https') {
  try {
    var options = {
      key: fs.readFileSync(pem_folder + 'key.pem'),
      cert: fs.readFileSync(pem_folder + 'cert.pem')
    };
  } catch (e) {
    console.error('Coud not find cert/key *.pem files in current folder');
    return false;
  }
  https.createServer(options, app).listen(https_port, host, function() {
    console.log('[' + new Date() + '] - HTTPS File Upload Server started on ' + host + ':' + https_port);
  });
}
else {
  http.createServer(app).listen(http_port, host, function() {
    console.log('[' + new Date() + '] - HTTP File Upload Server started on ' + host + ':' + http_port);
  });
}
