var app = require('express')();

var port = process.env.PORT || 8000;

app.use(function (req, res, next) {
  res.set('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.set('Access-Control-Allow-Headers', 'Cache-Control');
  next();
});

app.options('/', function (req, res, next) {
  res.end();
});

app.get('/', function (req, res) {
  res.set('Content-Type', 'text/event-stream');
  res.writeHead(200);

  setTimeout(sendData, 200);
  return;

  function sendData () {
    res.write('data: Hey!');
    res.write('\n');
    res.write('\n');

    res.end();
  }
});

module.exports = app.listen(port, function () {
  console.log('Started!');
});
