var https = require("https");

module.exports = function httpRequest(opts, callback) {
  var request = https.request(opts, function (res) {
    var data = "";

    res.setEncoding("utf8");

    res.on("data", function (chunk) {
      data += chunk;
    });

    res.on("end", function () {
      callback(null, data);
    });
  });

  request.on("error", function (err) {
    console.error(err);
    callback(err, null);
  });

  request.end();
};
