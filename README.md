# Simple file upload server

Simple file server with multipart/form-data and large file support

## Install 

```bash
$ npm install -g upload-server
```

## Usage

```bash
$ upload-server
```

This starts the server on the current host ```0.0.0.0``` on port ```8090```. Files are uploaded to ```./uploads``` under the current folder.

#### Configure upload FOLDER

```bash
$ FOLDER=./downloads upload-server
```

#### Configure HOST and PORT

```bash
$ HOST=192.168.0.131 PORT=8080 upload-server
```

## AngularJS example

```javascript
function uploadFile(content, filename) {

  var form = new FormData();
  form.append('file', filename);
  form.append('data', content);

  $http({
    method: 'POST',
    url: 'localhost:8090/upload',
    data: form,
    headers: { 'Content-Type': undefined }
  }).then(function success(response) {}, function failure(error) {});

}
```
