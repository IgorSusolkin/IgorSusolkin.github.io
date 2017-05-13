"use strict"

let Loader = require('./loader');

function ArtistLoader() {
  Loader.apply(this, arguments);
}
ArtistLoader.prototype = Object.create(Loader.prototype);
ArtistLoader.prototype.search = function(callback, artist, limit, page) {
  let url = this.preUrl + "artist.search" + '&artist=' + artist;
  if (limit) url += '&limit=' + limit;
  if (page) url += '&page=' + page;
  return this.load(url, callback);
}
ArtistLoader.prototype.getInfo = function(callback, artist, mbid, lang, autoCorrect, userName) {
  let url = this.preUrl + "artist.getinfo" + '&artist=' + artist;
  if (mbid) url += '&mbid=' + mbid;
  if (lang) url += '&lang=' + lang;
  if (autoCorrect) url += '&autocorrect=' + autoCorrect;
  if (userName) url += '&username=' + userName;
  return this.load(url, callback);
}

module.exports = ArtistLoader;
