var vertx = require('vertx')

var sent302 = false;
vertx.createHttpServer().requestHandler(function(req) {
  if (req.uri().indexOf("..") !== -1) {
    req.response.statusCode(403).end();
  } else {
    // Maven can send redirects so we test this by sending one first
    if (!sent302) {
      req.response.statusCode(302);
      req.response.putHeader('location', 'http://localhost:9193' + req.uri());
      req.response.end();
      sent302 = true;
    } else {
      var file = '.' + req.uri();
      req.response.sendFile(file)
    }
  }
}).listen(9193)