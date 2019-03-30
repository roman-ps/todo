const KEYCODE_ENTER = 13;
var tmpl = document.querySelector("#tmpl");
var task = tmpl.content.querySelector(".task");
var taskText = tmpl.content.querySelector(".task__main");
var input = document.querySelector(".add");
var active = document.querySelector(".active");
var tasksAll = document.querySelector(".tasks__all span");
var tasksComplete = document.querySelector(".tasks__complete span");
var count = 0;
var tasks = [];

// определение наибольшего id
function getId() {
  return tasks.reduce(function(a,b) {
    return (Math.max(a,b.id) + 1);
  },0);
}

// добавление id и текста в задание
function addTodo() {
  last = {id: getId(), todo: input.value, status: 0};
  tasks.push(last);
  return last;
}

// удаление задания по id
function removeTodo(evt) {
  var idNumber = evt.currentTarget.getAttribute("id");
  tasks = tasks.filter(function (number) {
    return number.id != idNumber;
  })
}

function whatIsComplete(evt) {
  var complete = evt.currentTarget.getAttribute("status");
  var a1 = tasks.filter(function (name) {
    return name.status = complete;
  })
  return a1.length;
}


// загрузка из localStorage 
function getStorage(evt){
  evt.preventDefault();
    var ofStorage = localStorage.getItem(1);
    count = localStorage.getItem("count");
    if (typeof ofStorage !== 'undefined' && ofStorage !== null) { 
      for (var i = 0; i < count; i++) { 
        var newElement = task.cloneNode(true);
        newElement.addEventListener("click", deleteItem);
        newElement.id = i+1;
        active.appendChild(newElement);
        var taskTextNew = newElement.querySelector(".task__main");
        taskTextNew.innerText = localStorage.getItem(i);
        tasksAll.innerHTML = parseInt(tasksAll.innerHTML) + 1;
      }
    }
    console.log(tasks);
}

// создание нового элемента
function createElem() {
  if (input.value != '') {
    var newElement = task.cloneNode(true);
    newElement.addEventListener("click", deleteItem);
    active.appendChild(newElement);
    var taskTextNew = newElement.querySelector(".task__main");
    const a = addTodo(input.value);
    taskTextNew.innerText = a.todo;
    newElement.setAttribute('id', a.id);
    tasksAll.innerHTML = tasks.length;
    localStorage.setItem("tasks", tasks);
  }
  input.value = '';
    //console.log(tasks);
}


// удаление элемента
function deleteItem(evt) {
  evt.preventDefault();
  var child = evt.target;
  var parent = evt.currentTarget;
  if (child != parent) {
    if (parent.classList.contains("complete")) {
      updCount(tasksComplete, -1);
      child.removeEventListener("click", deleteItem);
      parent.remove();
      removeTodo(evt);
      localStorage.setItem("tasks", tasks);
    } else {
      child.removeEventListener("click", deleteItem);
      parent.remove();
      removeTodo(evt);
      updCount(tasksAll, -1);
      localStorage.setItem("tasks", tasks);
      //console.log('tasks: ', tasks);
      //console.log('tasks length: ' + tasks.length);
    }
  }
  if (child === parent) {
    if (child.classList.contains("complete")) {
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

input.addEventListener("dblclick", addsItemByClick);
input.addEventListener("keydown", addsItemByBtn);
document.addEventListener("DOMContentLoaded", getStorage);
