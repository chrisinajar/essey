var Event = require('geval');
var EventSource = require('eventsource');

module.exports = Essey;

function Essey (url, options) {
  var es = new EventSource(url, options);
  var essey = {
    onData: Event(function (broadcast) {
      es.onmessage = broadcast;
    }),
    onClose: Event(function (broadcast) {
      es.onclose = broadcast;
    }),
    onError: Event(function (broadcast) {
      es.onerror = broadcast;
    }),
    onOpen: Event(function (broadcast) {
      es.onopen = broadcast;
    }),
    close: es.close.bind(es)
  };

  essey.onMessage = Event(function (broadcast) {
    essey.onData(parseMessage(broadcast));
  });

  return essey;
}

function parseMessage (cb) {
  return function (message) {
    console.log(message);
    // do stuff
    cb(message);
  };
}
