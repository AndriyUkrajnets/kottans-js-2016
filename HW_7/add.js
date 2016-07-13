module.exports = add

function add(string) {
  var delimiters = [",","\n"]
  var hasDelim = string.indexOf("//") === 0;
  var numbers = parseNumbers(string, delimiters);

  if (hasDelim) {
    delimiters = parseDelim(string);
    string = removeDelim(string);
  }

  return Sum(numbers);
}

function parseDelim(string) {
  var firstLine = string.indexOf("\n");
  var delimDefinition = string.substring(2, firstLine);
  var delimiters = string.reject(delimDefinition.split(/[\[\]]/), 
    function (d) {
    return d === "";
  });

  return delimiters;
}

function parseNumbers(string, delimiters) {
  var numbers = string.split(new RegExp("[" + delimiters.join("|") + "]"));

  return numbers;
}

function removeDelim(string) {
  return string.substring(string.indexOf("\n") + 1);
}

function Sum(numbers) {
  var sum = 0;

  numbers.forEach(function (number) {
    var num = parseInt(number);

    if (number == "") { return 0; }
   
    if (isNaN(num)) { throw "isNaN"; }

    if (num > 1000) { num = 0; return num; }

    if (num < 0) { throw "negative numbers not allowed"; }

    sum += num;
  });
  
  return sum;
}