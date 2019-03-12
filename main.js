const CODE_ENTER = 13;
const CODE_ESC = 27;
var newElement = document.createElement('div');
var input = document.querySelector(".add");
var active = document.querySelector(".active");
var addNew = document.querySelector(".add-new");
var cloneInput = input.cloneNode(true);
newElement.className = "task";

input.addEventListener("dblclick", function(event) {
  event.preventDefault;
  if (input.value != '') {
    active.appendChild(newElement);
    newElement.innerHTML = input.value;
    active.insertBefore(newElement, active.lastChild);
  }
});

input.addEventListener("keydown", function(event) {
  if (event.keyCode === CODE_ENTER) {
    if (input.value != '') {
      active.appendChild(newElement);
      newElement.innerHTML = input.value;
      active.insertBefore(newElement, active.lastChild);
    }
  }
});

inputNew.addEventListener("keydown", function(event) {
  if (event.keyCode === CODE_ESC) {
    active.removeChild(newElement);
  }
})