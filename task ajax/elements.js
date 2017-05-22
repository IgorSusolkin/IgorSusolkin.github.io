"use strict"

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
