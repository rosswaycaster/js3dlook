import request from "request-promise";

export default function js3dlook(key) {
  function upload(file) {
    if (!file) {
      return new Promise(() => {
        throw "No file supplied";
      });
    } else {
      var options = {
        method: "POST",
        url: "http://saia.3dlook.me/api/v1/uploads/",
        headers: {
          "cache-control": "no-cache",
          authorization: `APIKey ${key}`,
          "content-type":
            "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW"
        },
        formData: { image: file }
      };

      return request(options).then(body => JSON.parse(body));
    }
  }

  function step(params) {
    if (!params) {
      return new Promise(() => {
        throw "No parameters supplied";
      });
    } else {
      var options = {
        method: "POST",
        url: "http://saia.3dlook.me/api/v1/step/",
        headers: {
          "cache-control": "no-cache",
          authorization: `APIKey ${key}`,
          "content-type": "application/x-www-form-urlencoded"
        },
        form: params
      };

      return request(options).then(body => JSON.parse(body));
    }
  }

  function complete(params) {
    if (!params) {
      return new Promise(() => {
        throw "No parameters supplied";
      });
    } else {
      var options = {
        method: "POST",
        url: "http://saia.3dlook.me/api/v1/complete/",
        headers: {
          "cache-control": "no-cache",
          authorization: `APIKey ${key}`,
          "content-type": "application/x-www-form-urlencoded"
        },
        form: params
      };

      return request(options).then(body => JSON.parse(body));
    }
  }

  return {
    upload,
    step,
    complete
  };
}
