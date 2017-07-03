# Simple file upload server

Simple file server with multipart/form-data and large file support

### Install 

```bash
npm install -g upload-server
```

### Usage

```bash
upload-server --help

File upload server v1.1.5

usage: upload-server [options]

options:
  -p --port    Port number (default: 8090)
  -f --folder  Folder to upload files (default: files)
  -S --tls     Enable TLS / HTTPS
  -C --cert    Server certificate file
  -K --key     Private key file
  -h --help    Print this list and exit
  -v --version Print the current version
```

### Example

This code snippet shows how to upload a file using AngularJS:

```javascript
function uploadFile(content, filename) {

  var form = new FormData();
  form.append('file', filename);
  form.append('data', content);

  $http({
    method: 'POST',
    url: '//localhost:8090/',
    data: form,
    headers: { 'Content-Type': undefined }
  }).then(function success(response) {}, function failure(error) {});

}
```
