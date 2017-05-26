"use strict"

let Loader = require('./loader');

function ChartLoader() {
  Loader.apply(this, arguments);
}
ChartLoader.prototype = Object.create(Loader.prototype);

ChartLoader.prototype.getTopArtists = function(callback, page, limit) {
  let url = this.preUrl + "chart.gettopartists";
  if (page) url += '&page=' + page;
  if (limit) url += '&limit=' + limit;
  return this.load(url, callback);
}

module.exports = ChartLoader;
