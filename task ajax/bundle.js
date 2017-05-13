var test =
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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
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
      return callback(console.log(xhr.status + ': ' + xhr.statusText));
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
/* 2 */
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

module.exports = ArtistLoader;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let Loader = __webpack_require__(0);

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


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

let Loader = __webpack_require__(0);
let ChartLoader = __webpack_require__(3);
let ArtistLoader = __webpack_require__(2);
let AlbumLoader = __webpack_require__(1);

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


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map