const https = require("https");

function httpRequest(opts) {
  return new Promise((resolve, reject) => {
    const request = https.request(opts, (res) => {
      let data = "";

      res.setEncoding("utf8");

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => resolve(data));
    });

    request.on("error", (err) => {
      console.error(err);
      reject(err);
    });

    request.end();
  });
}

module.exports = httpRequest;
