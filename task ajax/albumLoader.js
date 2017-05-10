"use strict"
module.exports = AlbumLoader;
var Loader = require('./loader');
function AlbumLoader() {
  Loader.apply(this, arguments);
}
AlbumLoader.prototype.__proto__ = Loader.prototype;
AlbumLoader.prototype.getInfo = function(callback, artist, album, mbid, autoCorrect, userName, lang) {
  let url = this.preUrl + "album.getInfo" + '&artist=' +  artist + '&album=' + album;
  if (mbid) url += '&mbid=' + mbid;
  if (autoCorrect) url += '&autocorrect=' + autoCorrect;
  if (userName) url += '&username=' + userName;
  if (lang) url += '&lang=' + lang;
  return this.load(url, callback);
}
