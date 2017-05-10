var Loader = require('./loader');
var ChartLoader = require('./chartLoader');
var ArtistLoader = require('./artistLoader');
var AlbumLoader = require('./albumLoader');

let toPrint = function(data) {
  console.log(data);
}
let chart = new ChartLoader();
console.log(chart.getTopArtists(toPrint));
let artist = new ArtistLoader();
console.log(artist.search(toPrint, 'cher'));
console.log(artist.getInfo(toPrint, 'cher'));
let album = new AlbumLoader();
console.log(album.getInfo(toPrint, 'cher', 'believe'));
console.log("End");
