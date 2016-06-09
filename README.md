# essey [![Build Status](https://travis-ci.org/chrisinajar/essey.svg?branch=master)](https://travis-ci.org/chrisinajar/essey) [![Dependency Status](https://david-dm.org/chrisinajar/essey.svg)](https://david-dm.org/chrisinajar/essey) [![devDependency Status](https://david-dm.org/chrisinajar/essey/dev-status.svg)](https://david-dm.org/chrisinajar/essey#info=devDependencies)
An EventSource that doesn't suck. Pronounced like cramming together the acronym `SSE`.

## Installation

`npm install essey`

## Usage

```js
var Essey = require('essey');

var eventSource = Essey(eventUrl);

eventSource.onData(handleData);
eventSource.onError(handleError);
```

# API

#### `Essey(url, [options])` -> `essey`
Returns an Essey instance, passing **options** directly to the underlying [eventsource](https://www.npmjs.com/package/eventsource).

##### url

*Required*  
Type: `string`  

The URL to connect to and read SSE data from.

##### options.headers

Type: `object`  

The headers to send with the request.

#### `essey.onData(listener)` -> `function`

##### listener

Type: `function`  
Arguments: `message`

Called when any messages are received, wrapping `eventsource.onmessage`. Returns an unlisten function.

#### `essey.onError(listener)` -> `function`

##### listener

Type: `function`  
Arguments: `err`

Called when any errors occur, wrapping `eventsource.onerror`. Returns an unlisten function.

#### `essey.onOpen(listener)` -> `function`

##### listener

Type: `function`  
Arguments: None

Called when the connection opens, wrapping `eventsource.onopen`. Returns an unlisten function.

#### `essey.onClose(listener)` -> `function`

##### listener

Type: `function`  
Arguments: None

Called when the connection closes, wrapping `eventsource.onclose`. Returns an unlisten function.


# How To Authenticate

SSE authentication sucks. By default, `EventSource`s do not let you pass custom headers. There are two basic techniques I recommend for getting around this problem...

#### Use The Polyfill
[eventsource](https://www.npmjs.com/package/eventsource) (which this library uses under the hood) is a fantastic implementation of `EventSource`s which adds a great deal of extra functionality, including custom headers for authentication. With this library you can simply authenticate like normal and continue on with your day.

```js
var eventSource = Essey(eventUrl, {
  headers: {
    Authorization: 'bearer ' + authToken
  }
});
```

#### Cookie Knocking
The other technique uses cookies and a knock post. Cookies are generally not recommended for auth since they leave your system more vulnerable to CSRF attacks. The nature of CSRF attacks dictates that they are always blind, and since event streams do not (and *should not*) modify data it's fine to use this technique *only* for the event stream endpoint.

The event stream endpoint should respond to properly authenticated `POST` requests with a `Set-Cookie` reply to set up the event stream authentication. Then, the client can simply request the auth and then begin reading the stream.

```js
request.post(eventUrl, function (err, data) {
  if (err) {
    // handle error
    return;
  }
  var eventSource = EventSource(eventUrl, {
    withCredentials: true
  });
})
```

It's important to note that [eventsource](https://www.npmjs.com/package/eventsource) does not share this `withCredentials` API that some browsers expose. This is largely the reason I recommend the polyfill method.

# License
MIT
