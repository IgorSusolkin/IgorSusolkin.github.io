var start =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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
      return callback(xhr.status + ': ' + xhr.statusText);
    } else {
      return callback(xhr.responseText);
    }
  };
}

module.exports = Loader;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let ArtistLoader = __webpack_require__(3);
let AlbumLoader = __webpack_require__(2);
let Elements = __webpack_require__(4);

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


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let Loader = __webpack_require__(0);

function AlbumLoader() {
  Loader.apply(this, arguments);
}
AlbumLoader.prototype = Object.create(Loader.prototype);

AlbumLoader.prototype.getInfo = function(callback, artist, album, mbid, autoCorrect, userName, lang) {
  let url = this.preUrl + "album.getInfo" + '&artist=' +  artist + '&album=' + album;
  if (mbid) url += '&mbid=' + mbid;
  if (autoCorrect) url += '&autocorrect=' + autoCorrect;
  if (userName) url += '&username=' + userName;
  if (lang) url += '&lang=' + lang;
  return this.load(url, callback);
}

module.exports = AlbumLoader;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let Loader = __webpack_require__(0);

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

ArtistLoader.prototype.getArtistTopAlbums = function(callback, artist, mbid, page, autoCorrect, limit) {
  let url = this.preUrl + "artist.getTopAlbums" + '&artist=' + artist;
  if (mbid) url += '&mbid=' + mbid;
  if (page) url += '&page=' + page;
  if (autoCorrect) url += '&autocorrect=' + autoCorrect;
  if (limit) url += '&limit=' + limit;
  return this.load(url, callback);
}

module.exports = ArtistLoader;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function Elements() {
  this.wrapper = 'wrapper';
  this.element = document.getElementById(this.wrapper);
  this.fragment = document.createDocumentFragment();
}

Elements.prototype.do = function() {
  this.element.appendChild(this.fragment);
}

Elements.prototype.clear = function(element) {
  let clearElement = element || this.element;
  while (clearElement.firstChild) {
    clearElement.removeChild(clearElement.firstChild);
  }
}

Elements.prototype.getElement = function(element) {
  return document.getElementsByClassName(element);
}

Elements.prototype.addRating = function(level, parent) {
  let url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIm7Oj6kaT3z2KVUaPhE8lZWtbSyYheWA2Bmr8biDgQH7So6Iy';
  let div = this.addDiv('rating-bar');

  for (var i = 0; i < level; i++) {
    let img = document.createElement("img");
    img.name = 'rating-img';
    img.src = url;
    div.appendChild(img);
  }
  if (parent) parent.appendChild(div);
}

Elements.prototype.addDiv = function(name, parent) {
  let div = document.createElement("div");
  div.className = name;
  if (parent) {
    parent.appendChild(div);
  } else {
    this.fragment.appendChild(div);
  }
  return div;
}

Elements.prototype.addSearchBar = function(placeHolder, buttonText, onclick) {
  let div = this.addDiv('search-bar');
  let input = document.createElement("input");
  input.name = 'searchInput';
  input.placeholder = placeHolder;
  div.appendChild(input);

  let button = document.createElement("button");
  button.name = 'search';
  button.innerHTML = buttonText;
  div.appendChild(button);
  button.addEventListener('click', function() {
    onclick(input.value);
  });
}

Elements.prototype.addContent = function(sourseImage, sourseText, callback, parent) {
  let div = this.addDiv('content', parent);

  let img = document.createElement("img");
  img.name = 'imgArtist';
  img.src = sourseImage;
  div.appendChild(img);
  img.addEventListener('click', callback);

  let a = document.createElement("a");
  a.name = 'aContent';
  a.innerHTML = sourseText;
  div.appendChild(a);
  a.addEventListener('click', callback);
}

Elements.prototype.addPagination = function(value, callback, parent) {
  let div = this.addDiv('bar-pagination', parent);

  let a = document.createElement("a");
  a.name = 'aContent';
  a.innerHTML = value;
  div.appendChild(a);
  a.addEventListener('click', callback);
}

Elements.prototype.addBasicInfo = function(data) {
  let div = this.addDiv('info-content');

  this.addRating(data.rating, div);

  let h3 = document.createElement("h3");
  h3.name = 'name';
  h3.innerHTML = data.name;
  div.appendChild(h3);

  let img = document.createElement("img");
  img.className = 'content-img';
  img.name = 'img-info';
  img.src = data.image;
  div.appendChild(img);

  let p = document.createElement("p");
  p.name = 'p-content';
  p.innerHTML = data.info;
  div.appendChild(p);
}

Elements.prototype.addTitle = function(name) {
  let div = this.addDiv('title');
  let p = document.createElement("p");
  p.name = 'p-title';
  p.innerHTML = name;
  div.appendChild(p);
}

Elements.prototype.addTrack = function(track) {
  let div = this.addDiv('track');

  let a = document.createElement("a");
  a.className = 'link-track';
  a.innerHTML = track['@attr'].rank + '.  ' + track.name;
  a.href = track.url;
  div.appendChild(a);
}

module.exports = Elements;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

let Page = __webpack_require__(1);

let start = (function() {
    window.page = new Page();
    page.showSearchBar();
})();


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map