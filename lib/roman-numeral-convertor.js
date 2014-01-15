var emailer = require('./emailer');
var characterMap = {
  "I": 1,
  "V": 5,
  "X": 10,
  "L": 50,
  "C": 100,
  "D": 500,
  "M": 1000
};

var toArabic = function(roman) {
  var result = 0;
  for(var i=0; i<roman.length; i++) {
    var currentVal = characterMap[roman[i]];
    var previousVal = characterMap[roman[i-1]];

    if (previousVal && previousVal < currentVal) {
      result = currentVal - previousVal;
    }
    else {
      result += currentVal;
    }
  }
  return result;
}

var toRoman = function(arabic) {
  var result = "";
  if (arabic == 2) {
    result = "II";
  }
  else {
    result = "I";
  }

  var emailResults =
    emailer.email("todd@testdouble.com", "Roman Conversion", "Converting " + arabic + " to roman is " + result);

  debugger;

  return result;
}

module.exports = {
  toArabic: toArabic,
  toRoman: toRoman
}