"use strict"

function Loader() {
  this.apiKey = '?api_key=405145a079442dd8d2b3c645a0a6f2c7';
  this.resource = 'http://ws.audioscrobbler.com/2.0/';
  this.method = '&method=';
  this.format = '&format=json';
  this.preUrl = this.resource + this.apiKey + this.format + this.method;
}
Loader.prototype.load = function(url, callback) {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.send();
  xhr.onreadystatechange = function() {
    if (xhr.readyState != 4) return;
    if (xhr.status != 200) {
      return callback(console.log(xhr.status + ': ' + xhr.statusText));
    } else {
      return callback(xhr.responseText);
    }
  };
}

module.exports = Loader;
