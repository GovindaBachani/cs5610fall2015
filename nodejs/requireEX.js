var otherFile = require("./Node1.js");

console.log("Hello from requireEX.js");

console.log(otherFile.a);

console.log(otherFile.b);

console.log(otherFile.a + otherFile.b);

console.log(otherFile.add(otherFile.a, otherFile.b));

var square1 = require('./square.js');

var s1 = square1("square1", 12, 23);

console.log(s1.getName());