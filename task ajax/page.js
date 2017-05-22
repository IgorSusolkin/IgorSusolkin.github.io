"use strict"

let ArtistLoader = require('./artistLoader');
let AlbumLoader = require('./albumLoader');
let Elements = require('./elements');

function Page() {
  this.elements = new Elements();
  this.limit = 8;
}

Page.prototype.showSearchBar = function() {
  let artist = new ArtistLoader();
  let placeHolder = 'Music search',
      buttonText = 'Search';
  page.elements.addSearchBar(placeHolder, buttonText, function(searchName) {
    artist.search(page.showFoundArtists, searchName, page.limit);
  });
  page.elements.do();
}

Page.prototype.showFoundArtists = function(data) {
  let artist = new ArtistLoader();
  let result = JSON.parse(data).results;
  let artists = result.artistmatches.artist;
  let searchArtist = result['@attr']['for'];
  let parent = page._createAndClearDiv('content-wrapper');

  for (let i = 0; i < artists.length; i++) {
    let nameArtist = artists[i].name;
    if (nameArtist && artists[i].image[3]['#text']) {
      page.elements.addContent(artists[i].image[3]['#text'], nameArtist, function(searchAlbum) {
        artist.getInfo(page.showArtistInfo, nameArtist);
      }, parent);
    }
  }

  page.showPagination(result);
  page.elements.do();
}

Page.prototype.showPagination = function(result) {
  let totalResult = result['opensearch:totalResults'];
  let itemsPerPage = result['opensearch:itemsPerPage'];
  let numPages = Math.ceil(totalResult / itemsPerPage);
  let currentPage = result['opensearch:startIndex'] / itemsPerPage  + 1;
  let parent = page._createAndClearDiv('pagination');
  let searchArtist = result['@attr']['for'];
  let artistLoader = new ArtistLoader();
  let startPage;
  if (currentPage < 4) {
      startPage = 1;
  } else {
    startPage = currentPage - 2;
  }
  let endPage;
  if (numPages >= 10) {
      endPage = startPage + 10 - 1;
  } else {
    endPage = numPages;
  }

  for (var value = startPage; value <= endPage; value++) {
    page.elements.addPagination(value, function(searchName) {
      artistLoader.search(page.showFoundArtists, searchArtist, page.limit, value);
    }, parent);
  }
}

Page.prototype._createAndClearDiv = function(name) {
  let div;
  let search = page.elements.getElement(name);
  if (search.length > 0) {
    page.elements.clear(search[0]);
    div = search[0];
  } else {
    div = page.elements.addDiv(name);
  }
  return div;
}

Page.prototype._getRating = function() {
  return Math.round(Math.random() * 5);
}

Page.prototype.showArtistInfo = function(data) {
  page.elements.clear();
  let artist = JSON.parse(data).artist;
  page.elements.addBasicInfo({
    name : artist.name,
    info : artist.bio.content,
    image : artist.image[2]['#text'],
    rating : page._getRating()
  });
  let artistLoader = new ArtistLoader();
  artistLoader.getArtistTopAlbums(page.showArtistAlbums, artist.name);
  page.elements.do();
}

Page.prototype.showArtistAlbums = function(data) {
  let albums = JSON.parse(data).topalbums.album;
  let album = new AlbumLoader();

  for (let i = 0; i < albums.length; i++) {
    let nameAlbums = albums[i].name,
        nameArtist = albums[i].artist.name;
    if (nameAlbums && albums[i].image[3]['#text']) {
      page.elements.addContent(albums[i].image[3]['#text'], nameAlbums, function(searchAlbum) {
        album.getInfo(page.showAlbumInfo, nameArtist, nameAlbums);
      });
    }
  }
  page.elements.do();
}

Page.prototype.showAlbumInfo = function(data) {
  let album = JSON.parse(data).album;
  console.dir(album);
  page.elements.clear();
  let releaseDate = album.releasedate || 'unknown';
  page.elements.addBasicInfo({
    name : album.name,
    info : album.artist + '<br/><br/>' + releaseDate,
    image : album.image[2]['#text'],
    rating : page._getRating()
  });
  page.elements.addTitle('Tracks');
  let tracks = album.tracks.track;
  page.showAlbumTracks(tracks);
  page.elements.do();
}

Page.prototype.showAlbumTracks = function(data) {
  for (let track in data) {
    page.elements.addTrack(data[track]);
  }
  page.elements.do();
}

module.exports = Page;
