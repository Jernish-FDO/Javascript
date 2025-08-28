// Selecting Input Box
var box1 = document.getElementById("num1");
var box2 = document.getElementById("num2");
// Selecting Result
var result = document.getElementById("result");

// Converting Text to Number
var value1 = Number(box1.value);
var value2 = Number(box2.value);

// Adding Two Numbers and Print The values
function add() {
  // Converting Text to Number
  var value1 = Number(box1.value);
  var value2 = Number(box2.value);
  // Add The Two Values and Store
  result.textContent = value1 + value2;
}

// Subtracting Two Numbers and Print The values
function sub() {
  // Converting Text to Number
  var value1 = Number(box1.value);
  var value2 = Number(box2.value);
  // Add The Two Values and Store
  result.textContent = value1 - value2,"Result is";
}

// Multipliying Two Numbers and Print The values
function mul() {
  // Converting Text to Number
  var value1 = Number(box1.value);
  var value2 = Number(box2.value);
  // Add The Two Values and Store
  result.textContent = value1 * value2;
}

// Dividing Two Numbers and Print The values
function div() {
  // Converting Text to Number
  var value1 = Number(box1.value);
  var value2 = Number(box2.value);
  // Add The Two Values and Store
  result.textContent = Math.floor(value1 / value2);
}

