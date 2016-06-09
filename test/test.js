var test = require('tape');
var Essey = require('../');

var port = process.env.PORT || 8000;

test('basic open and close', function (t) {
  t.plan(3);

  var essey = Essey('//localhost:' + port);

  essey.onOpen(function () {
    t.pass('receives open event');
  });
  essey.onClose(function () {
    t.pass('receives close event');
  });
  essey.onData(function (msg) {
    t.equal(msg.data, 'Hey!', 'receives data');
    essey.close();
    // t.end();
  });
});
