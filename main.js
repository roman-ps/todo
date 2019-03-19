const KEYCODE_ENTER = 13;
var tmpl = document.querySelector("#tmpl");
var task = tmpl.content.querySelector(".task");
var taskText = tmpl.content.querySelector(".task__main");
var input = document.querySelector(".add");
var active = document.querySelector(".active");
var tasksAll = document.querySelector(".tasks__all span");
var tasksComplete = document.querySelector(".tasks__complete span");

// создание нового элемента
function createElem() {
  if (input.value != '') {
    var newElement = task.cloneNode(true);
    newElement.addEventListener("click", deleteItem);
    active.appendChild(newElement);
    var taskTextNew = newElement.querySelector(".task__main");
    taskTextNew.innerText = input.value;
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

function AllToComplete(evt) {
  evt.target.classList.add("complete");
  evt.target.classList.add("linethrough");
}

function CompleteToAll(evt) {
  evt.target.classList.remove("complete");
  evt.target.classList.remove("linethrough");
}

// счетчик задач
function updCount(evt, number) {
  evt.innerHTML = parseInt(evt.innerHTML) + number;
}

// удаление элемента
function deleteItem(evt) {
  evt.preventDefault();
  if (evt.target != evt.currentTarget) {
    if (evt.currentTarget.classList.contains("complete")) {
      updCount(tasksComplete, -1);
      evt.target.removeEventListener("click", deleteItem);
      evt.currentTarget.remove();
    } else {
      evt.target.removeEventListener("click", deleteItem);
      evt.currentTarget.remove();
      updCount(tasksAll, -1);
    }
  }
  if (evt.target === evt.currentTarget) {
    if (evt.target.classList.contains("complete")) {
      CompleteToAll(evt);
      updCount(tasksComplete, -1);
      updCount(tasksAll, 1);
    } else {
      AllToComplete(evt);
      updCount(tasksComplete, +1);
      updCount(tasksAll, -1);
    }
  }
}

input.addEventListener("dblclick", addsItemByClick);
input.addEventListener("keydown", addsItemByBtn);
