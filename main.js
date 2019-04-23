const KEYCODE_ENTER = 13;
var tmpl = document.querySelector("#tmpl");
var task = tmpl.content.querySelector(".task");
var taskText = tmpl.content.querySelector(".task__main");
var input = document.querySelector(".add");
var active = document.querySelector(".active");
var tasksAll = document.querySelector(".tasks__all span");
var tasksComplete = document.querySelector(".tasks__complete span");
var tasks = [];
var ActiveTasks;
var tasksJson = [];

// определение наибольшего id
function getId() {
  return tasks.reduce(function(a,b) {
    return (Math.max(a,b.id) + 1);
  },0);
}

// добавление id и текста в задание
function addTodo() {
  last = {id: getId(), todo: input.value, status: false};
  tasks.push(last);
  return last;
}

// удаление задания по id
function removeTodo(evt) {
  var idNumber = evt.currentTarget.getAttribute("id");
  tasks = tasks.filter(function (number) {
    return number.id != idNumber;
  })
  tasksJson = JSON.stringify(tasks);
  localStorage.setItem("tasks", tasksJson);
}

// вычисление кол-во выполненных заданий
function getCompleteCount(evt) {
  return tasks.reduce(function (a, name) {
    return a + +(name.status > 0); 
  },0)
}

// определяем id элемента
function getTaskId(evt) {
  return evt.currentTarget.getAttribute("id");
}

// возвращаем элемент по id
function getTaskById(id) {
  var currentTask = tasks.filter(function (number) {
    return number.id == id;
  })
  return currentTask.pop();
}

// загрузка из localStorage 
function getStorage(evt){
  evt.preventDefault();
  var tasks = localStorage.getItem("tasks");
  var tasksParse = JSON.parse(tasks);
  if (tasksParse !== 'undefined' && tasks !== null) { 
    for (var i = 0; i < tasksParse.length; i++) { 
      var newElement = task.cloneNode(true);
      newElement.addEventListener("click", handleTaskClick);
      active.appendChild(newElement);
      var taskTextNew = newElement.querySelector(".task__main");
      taskTextNew.innerText = tasksParse[i].todo;
      newElement.setAttribute('id', tasksParse[i].id);
      tasksAll.innerHTML = tasksParse.length;
      writeCompleteTasks();
    }
  }
}

// создание нового элемента
function createElem() {
  if (input.value != '') {
    var newElement = task.cloneNode(true);
    newElement.addEventListener("click", handleTaskClick);
    active.appendChild(newElement);
    var taskTextNew = newElement.querySelector(".task__main");
    const a = addTodo(input.value);
    taskTextNew.innerText = a.todo;
    newElement.setAttribute('id', a.id);
    tasksAll.innerHTML = tasks.length;
    tasksJson = JSON.stringify(tasks);
    localStorage.setItem("tasks", tasksJson);
  }
  input.value = '';
}

// обработка нажатия по задаче
function handleTaskClick(evt) {
  evt.preventDefault();
  var child = evt.target;
  var parent = evt.currentTarget;
  const thisElement = getTaskById(getTaskId(evt));
  if (child != parent) {
    removeEvt(evt);
    if (thisElement.status) {
      writeCompleteTasks();
    } else {
      countAllTasks();      
    }
  }
  if (child === parent) {
    thisElement.status = !thisElement.status;
    child.classList.toggle("complete");
    countAllTasks();
    writeCompleteTasks();
  }
}

//считаем и выводим кол-во заданий
function countAllTasks() {
  tasksAll.innerHTML = tasks.length - getCompleteCount();
}

//выводим кол-во выполненных заданий
function writeCompleteTasks() {
  tasksComplete.innerHTML = getCompleteCount(); 
}

// удаляем child и parent из handleTaskClick
function removeEvt(evt) {
  evt.target.removeEventListener("click", handleTaskClick);
  evt.currentTarget.remove();
  removeTodo(evt);
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

// счетчик задач
function updCount(evt, number) {
  evt.innerHTML = parseInt(evt.innerHTML) + number;
}

input.addEventListener("dblclick", addsItemByClick);
input.addEventListener("keydown", addsItemByBtn);
document.addEventListener("DOMContentLoaded", getStorage);
