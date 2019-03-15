const KEYCODE_ENTER = 13;
var input = document.querySelector(".add");
var active = document.querySelector(".active");

// добавление элемента
function addsItem(){
  event.preventDefault;
  var newElement = document.createElement('div');
  newElement.className = "task";
  newElement.addEventListener("click", deleteItem);
  if (input.value != '') {
    active.appendChild(newElement);
    newElement.innerHTML = input.value;
  }
  input.value = '';
}

// удаление элемента
function deleteItem(evt) {
  evt.preventDefault();
  var target = evt.target;
  target.remove();
}

input.addEventListener("dblclick", addsItem);

input.addEventListener("keydown", function(event) {
  event.preventDefault;
  if (event.keyCode === KEYCODE_ENTER) {
    if (input.value != '') {
      var newElement = document.createElement('div');
      newElement.className = "task";
      newElement.addEventListener("click", deleteItem);
      active.appendChild(newElement);
      newElement.innerHTML = input.value;
    }
    console.log(newElement);
    input.value = '';
  }
});
