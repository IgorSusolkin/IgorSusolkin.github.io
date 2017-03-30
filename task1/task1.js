function add(a, b) {
  return a + b;
}
function sub(a, b) {
  return a - b;
}
function mul(a, b) {
  return a * b;
}
function div(a, b) {
  return a / b;
}
function intDiv(a, b) {
  return parseInt(a / b);
}

console.log("add");
console.log(add(5, 5));
console.log(add(5, -4));
console.log(add(5, "4"));
console.log(add("-5", "-4"));
console.log(add(5, {}));
console.log(add(5, true));
console.log("sub");
console.log(sub(5, 3));
console.log(sub(5, "-3"));
console.log(sub("5", true));
console.log(sub(5, {}));
console.log("mul");
console.log(mul("2", "6"));
console.log(mul(2, "-6"));
console.log(mul(2, ""));
console.log("div");
console.log(div(5, 0));
console.log(div(5, "4"));
console.log(div(5, ""));
console.log("intDiv");
console.log(intDiv(-2.2, 1));
console.log(intDiv(2.2, 1));
console.log(intDiv(-1, true));
