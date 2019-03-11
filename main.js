const keyEnter = 13;
const keyESC = 27;
var newElement = document.createElement('input');
newElement.className = "input input__new";
var input = document.querySelector(".input");
var main = document.querySelector(".main");
var inputNew = document.querySelector(".input input__new");

input.addEventListener("dblclick", function(event) {
  event.preventDefault;
  if (input.value != '') {
    main.appendChild(newElement);
    newElement.value = input.value;
    newElement.setAttribute("", "");
  }
});

input.addEventListener("keydown", function(event) {
  if (event.keyCode === keyEnter) {
    if (input.value != '') {
      main.appendChild(newElement);
      newElement.value = input.value;
      newElement.setAttribute("", "");
    }
  }
});

inputNew.addEventListener("keydown", function(event) {
  if (event.keyCode === keyESC) {
    main.removeChild(inputNew);
  }
})