var Event = require('geval');
var EventSource = require('event-source');

module.exports = Essey;

function Essey (url, options) {
  if (options === true) {
    options = {
      withCredentials: true
    };
  }

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

  return essey;
}
