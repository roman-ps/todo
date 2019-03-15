const KEYCODE_ENTER = 13;
var input = document.querySelector(".add");
var active = document.querySelector(".active");

function createElem() {
  if (input.value != '') {
    var newElement = document.createElement('div');
    newElement.className = "task";
    newElement.addEventListener("click", deleteItem);
    active.appendChild(newElement);
    newElement.innerHTML = input.value;
  }
  input.value = '';
}

// добавление по клику
function addsItemByClick(evt){
  evt.preventDefault;
    createElem();
}

// добавление по клавише
function addsItemByBtn(evt){
  evt.preventDefault;
  if (event.keyCode === KEYCODE_ENTER) {
    createElem();
  }
}

// удаление элемента
function deleteItem(evt) {
  evt.preventDefault();
  var target = evt.target;
  target.remove();
  target.removeEventListener("click", deleteItem);
}

input.addEventListener("dblclick", addsItemByClick);
input.addEventListener("keydown", addsItemByBtn);
