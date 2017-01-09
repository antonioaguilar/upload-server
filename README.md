# Simple file upload server

Simple file server with multipart/form-data and large file support

## Install 

```bash
npm install -g upload-server
```

## Usage

```bash
upload-server
```

This starts the server on the current host ```0.0.0.0``` on port ```8090```. Files are uploaded to ```./uploads``` under the current folder.

#### Configure upload FOLDER

```bash
FOLDER=./downloads upload-server
```

#### Configure HOST and PORT

```bash
HOST=192.168.0.131 HTTP_PORT=8080 upload-server
```

### Configure server to use HTTPS

Generate private key (key.pem) and server certificate (cert.pem) and place the files in the folder from which the server is run. You can use the following command to generate both the key and certificate:

```bash
openssl req -new -newkey rsa:4096 -days 3650 -nodes -x509 -keyout key.pem -out cert.pem
```

Once you have the key and certificate, you can run the server using the following command:

```bash
upload-server --https
```

This starts the server on the current host ```0.0.0.0``` using HTTPS port ```8443```.


### Uploading files

This code snippet shows how to upload a file using AngularJS:

```javascript
function uploadFile(content, filename) {

  var form = new FormData();
  form.append('file', filename);
  form.append('data', content);

  $http({
    method: 'POST',
    url: '//localhost:8090/upload',
    data: form,
    headers: { 'Content-Type': undefined }
  }).then(function success(response) {}, function failure(error) {});

}
```
