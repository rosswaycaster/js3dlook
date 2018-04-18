(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('request-promise')) :
	typeof define === 'function' && define.amd ? define(['request-promise'], factory) :
	(global.js3dlook = factory(global['request-promise']));
}(this, (function (request) { 'use strict';

request = request && request.hasOwnProperty('default') ? request['default'] : request;

function js3dlook(key) {
  function upload(file) {
    if (!file) {
      return new Promise(function () {
        throw "No file supplied";
      });
    } else {
      var options = {
        method: "POST",
        url: "http://saia.3dlook.me/api/v1/uploads/",
        headers: {
          "cache-control": "no-cache",
          authorization: "APIKey " + key,
          "content-type": "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW"
        },
        formData: { image: file }
      };

      return request(options).then(function (body) {
        return JSON.parse(body);
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
        url: "http://saia.3dlook.me/api/v1/step/",
        headers: {
          "cache-control": "no-cache",
          authorization: "APIKey " + key,
          "content-type": "application/x-www-form-urlencoded"
        },
        form: params
      };

      return request(options).then(function (body) {
        return JSON.parse(body);
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
        form: params
      };

      return request(options).then(function (body) {
        return JSON.parse(body);
      });
    }
  }

  return {
    upload: upload,
    step: step,
    complete: complete
  };
}

return js3dlook;

})));
