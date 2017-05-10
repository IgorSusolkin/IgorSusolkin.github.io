"use strict"
module.exports = ChartLoader;
var Loader = require('./loader');
function ChartLoader() {
  Loader.apply(this, arguments);
}
ChartLoader.prototype.__proto__ = Loader.prototype;
ChartLoader.prototype.getTopArtists = function(callback, page, limit) {
  let url = this.preUrl + "chart.gettopartists";
  if (page) url += '&page=' + page;
  if (limit) url += '&limit=' + limit;
  return this.load(url, callback);
}
