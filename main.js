const KEYCODE_ENTER = 13;
const KEYCODE_ESC = 27;
var input = document.querySelector(".add");
var active = document.querySelector(".active");
var addNew = document.querySelector(".add-new");
var cloneInput = input.cloneNode(true);

//добавление элемента
function addsItem(){
  event.preventDefault;
  var newElement = document.createElement('div');
  newElement.className = "task";
  if (input.value != '') {
    active.appendChild(newElement);
    newElement.innerHTML = input.value;
  }
}

//добавление и удаление обработчика
input.addEventListener("dblclick", addsItem);
input.removeEventListener("dbclick", addsItem);

input.addEventListener("keydown", function(event) {
  event.preventDefault;
  if (event.keyCode === KEYCODE_ENTER) {
    if (input.value != '') {
      var newElement = document.createElement('div');
      newElement.className = "task";
      active.appendChild(newElement);
      newElement.innerHTML = input.value;
      active.insertBefore(newElement, active.lastChild);
    }
  }
});

inputNew.addEventListener("keydown", function(event) {
  if (event.keyCode === KEYCODE_ESC) {
    active.removeChild(newElement);
  }
})