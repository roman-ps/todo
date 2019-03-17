const KEYCODE_ENTER = 13;
var tmpl = document.querySelector("#tmpl");
var task = tmpl.content.querySelector(".task");
var taskText = tmpl.content.querySelector(".task__main");
var input = document.querySelector(".add");
var active = document.querySelector(".active");
var tasksAll = document.querySelector(".tasks__all span");
var tasksActive = document.querySelector(".tasks__active span");

// создание нового элемента
function createElem() {
  if (input.value != '') {
    var newElement = task.cloneNode(true);
    console.log(task);
    console.log(newElement);
    newElement.addEventListener("click", deleteItem);
    active.appendChild(newElement);
    taskText.innerHTML = input.value;
    tasksAll.innerHTML = parseInt(tasksAll.innerHTML) + 1;
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
  if (evt.target != evt.currentTarget) {
    evt.target.removeEventListener("click", deleteItem);
    evt.currentTarget.remove();
    tasksAll.innerHTML = parseInt(tasksAll.innerHTML) - 1;
  }
}

input.addEventListener("dblclick", addsItemByClick);
input.addEventListener("keydown", addsItemByBtn);
