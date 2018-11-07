var newElement = document.createElement('input');
var input = document.querySelector(".input");
var main = document.querySelector(".main");

newElement.className = "input input__new";

input.addEventListener("dblclick", function(event) {
  event.preventDefault;
  if (input.value != '') {
  main.appendChild(newElement);
  newElement.value = input.value;
  newElement.setAttribute("readonly", "readonly");
  }
});

input.addEventListener("keydown", function(event) {
  if (event.keyCode === 13) {
    if (input.value != '') {
      main.appendChild(newElement);
      newElement.value = input.value;
      newElement.setAttribute("readonly", "readonly");
    }
  }
});