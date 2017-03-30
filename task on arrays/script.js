function isArray(obj) {
  return typeof obj ==="object" &&
  Object.prototype.toString.call(obj) === "[object Array]";
}
function isArray2(obj) {
  return !!obj && obj.constructor === Array;
}
function range(a, /*необязательный*/ b ,
  /*необязательный*/ c) {
  let first, last,
    step = c || 1;
  if (b) {
    first = a;
    last = b;
  } else {
    first = 0;
    last = a;
  }
  let array = [];
  for (let value = first; (step > 0) ? value < last :  value > last; value += step) {
    array.push(value);
  }
  return array;
}
function compact(array) {
  return array.filter((function(x) { return x }));
}
function compact2(array) {
  let result = [];
  for (var i = 0; i < array.length; i++) {
    if (array[i]) result.push(array[i]);
  }
  return result;
}
function sum(array) {
  return array.reduce((function(x, y) { return x + y }));
}
function sum2(array) {
  let sum = 0;
  for (var i = 0; i < array.length; i++) {
    sum += array[i];
  }
  return sum;
}
function unique(array) {
  return array.filter(function(value, index, array) {
    return array.indexOf(value, index + 1) < 0 }
  );
}
function last(array) {
  return array[array.length - 1];
}
function excludeLast(array, delLength) {
  delLength = delLength || 1;
  if (delLength > 0) {
    if (delLength < array.length )
    array.length -= delLength;
    else array.length = 0;
  }
  return array;
}


console.log("isArray");
console.log(isArray({}));
console.log(isArray([]));
console.log(isArray(""));
console.log(isArray(5));
console.log(isArray(null));
console.log(isArray(undefined));
console.log("isArray2");
console.log(isArray2({}));
console.log(isArray2([]));
console.log(isArray2(""));
console.log(isArray2(5));
console.log(isArray2(null));
console.log(isArray2(undefined));
console.log("range");
console.log(range(5));
console.log(range(1, 5));
console.log(range(1, 10, 2));
console.log(range(10, 1, -1));
console.log(range(10, 5, -5));
console.log("compact");
console.log(compact([1, 2, 3, 4]));
console.log(compact([null, , 6, NaN]));
console.log("compact2");
console.log(compact2([1, 2, 3, 4]));
console.log(compact2([null, , 6, NaN]));
console.log("sum");
console.log(sum([1, 2, 3, 4]));
console.log(sum([null, , 6, NaN]));
console.log("sum2");
console.log(sum2([1, 2, 3, 4]));
console.log(sum2([null, , 6, NaN]));
console.log("unique");
console.log(unique([1, 2, 3, 4, 1 , 2]));
console.log("last");
console.log(last([1, 2, 3, 4, 5 , 6]));
console.log("excludeLast");
console.log(excludeLast([1, 2, 3, 4, 5 , 6], 2 ));
console.log(excludeLast([1, 2, 3, 4, 5 , 6], 0));
console.log(excludeLast([1, 2, 3, 4, 5 , 6], 10));
console.log(excludeLast([1, 2, 3, 4, 5 , 6], -5));
