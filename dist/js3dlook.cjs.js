'use strict';

require('whatwg-fetch');

function js3dlook(key) {
  function upload(file) {
    if (!file) {
      return new Promise(function () {
        throw "No file supplied";
      });
    } else {
      var formData = new FormData();
      formData.append("image", {
        uri: file.uri,
        name: "photo.jpg",
        type: "image/jpg"
      });

      var options = {
        method: "POST",
        headers: {
          "cache-control": "no-cache",
          authorization: "APIKey " + key,
          "content-type": "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW"
        },
        body: formData
      };

      return fetch("http://saia.3dlook.me/api/v1/uploads/", options).then(function (body) {
        return body.json();
      });
    }
  }

  function step(params) {
    if (!params) {
      return new Promise(function () {
        throw "No parameters supplied";
      });
    } else {
      var options = {
        method: "POST",
        headers: {
          "cache-control": "no-cache",
          authorization: "APIKey " + key,
          "content-type": "application/x-www-form-urlencoded"
        },
        body: JSON.stringify(params)
      };

      return fetch("http://saia.3dlook.me/api/v1/step/", options).then(function (body) {
        return body.json();
      });
    }
  }

  function complete(params) {
    if (!params) {
      return new Promise(function () {
        throw "No parameters supplied";
      });
    } else {
      var options = {
        method: "POST",
        url: "http://saia.3dlook.me/api/v1/complete/",
        headers: {
          "cache-control": "no-cache",
          authorization: "APIKey " + key,
          "content-type": "application/x-www-form-urlencoded"
        },
        body: JSON.stringify(params)
      };

      return fetch(options).then(function (body) {
        return body.json();
      });
    }
  }

  return {
    upload: upload,
    step: step,
    complete: complete
  };
}

module.exports = js3dlook;
