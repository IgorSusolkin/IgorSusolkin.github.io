function binarySearch(array, element, first, last) {
  first = first || 0;
  if (!Number.isInteger(last)) last = array.length - 1;
  let index;
  while (first <= last) {
    index = first + Math.floor((last - first) / 2);
    if (array[index] < element) {
      first = index + 1;
    } else if (array[index] > element) {
      last = index - 1;
    } else {
      return index;
    }
  }
  return (-first - 1);
}

function binarySearch2(array, element, first, last) {
  first = first || 0;
  if (!Number.isInteger(last)) last = array.length - 1;
  let index = first + Math.floor((last - first) / 2);
  if (array[index] < element) {
    first = index + 1;
  } else if (array[index] > element) {
    last = index - 1;
  } else {
    return index;
  }
  if (first <= last) {
    return binarySearch2(array, element, first, last);
  } else {
      return (-first - 1);
  }
}

console.log("binarySearch");
console.log(binarySearch([0, 2, 4], 4));
console.log(binarySearch([0, 2, 4], 1));
console.log(binarySearch([0, 2, 4], -1));
console.log(binarySearch([0, 2, 4], 5));
console.log(binarySearch([], 6));
console.log(binarySearch([5], 6));
console.log(binarySearch([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 6, 1, 1));
console.log(binarySearch([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 0));
console.log(binarySearch([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 10));
console.log(binarySearch([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], -1));
console.log(binarySearch([0, 2, 4, 6, 8], 7, 4));
console.log("binarySearch2");
console.log(binarySearch2([0, 2, 4], 4));
console.log(binarySearch2([0, 2, 4], 1));
console.log(binarySearch2([0, 2, 4], -1));
console.log(binarySearch2([0, 2, 4], 5));
console.log(binarySearch2([], 6));
console.log(binarySearch2([5], 6));
console.log(binarySearch2([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 6, 1, 1));
console.log(binarySearch2([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 0));
console.log(binarySearch2([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 10));
console.log(binarySearch2([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], -1));
console.log(binarySearch2([0, 2, 4, 6, 8], 7, 4));
