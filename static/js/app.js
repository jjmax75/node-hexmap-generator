var MAXROWSCOLS = 256;

function checkNumberInput(event) {
  event.preventDefault();
  var currentValue = event.target.value;

  if (event.charCode === 0 && event.keyCode === 8) currentValue = currentValue.slice(0, -1);
  if (event.charCode >= 48 && event.charCode <= 57) currentValue += event.key;

  if (currentValue > MAXROWSCOLS) currentValue = MAXROWSCOLS;

  event.target.value = currentValue;
}
