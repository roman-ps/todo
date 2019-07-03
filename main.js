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
function getNextId() {
  if (tasks != null) { 
    return tasks.reduce(function(a,b) {
      return (Math.max(a,b.id) + 1);
    },0);
  }
}

// добавление id и текста в задание
function addTodo() {
  last = {id: getNextId(), todo: input.value, status: false};
  if (tasks != null) {
    tasks.push(last);
  }
  return last;
}

// удаление задания по id
function removeTodo(evt) {
  var id = getTaskId(evt);
  tasks = tasks.filter(function (number) {
    return number.id != id;
  })
  toLocalStorage(tasks);
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

//считаем и выводим кол-во заданий
function countAllTasks() {
  tasksAll.innerHTML = tasks.length - getCompleteCount();
}

//выводим кол-во выполненных заданий
function renderCompleteCount() {
  tasksComplete.innerHTML = getCompleteCount(); 
}

// вычисление кол-во выполненных заданий
function getCompleteCount(evt) {
  return tasks.reduce(function (a, name) {
    return a + +(name.status > 0); 
  },0)
}

//сериализуем и выводим в localStorage
function toLocalStorage(tasks) {
  tasksJson = JSON.stringify(tasks);
  localStorage.setItem("tasks", tasksJson);
}

//забираем из localStorage
function fromLocalStorage() {
  return JSON.parse(localStorage.getItem("tasks"));
}

// загрузка из localStorage 
function getFromReboot(evt){
  evt.preventDefault();
  tasks = fromLocalStorage();
  if (tasks !== 'undefined' && tasks !== null) { 
    for (var i = 0; i < tasks.length; i++) { 
      var newElement = task.cloneNode(true);
      newElement.addEventListener("click", handleTaskClick);
      active.appendChild(newElement);
      var taskTextNew = newElement.querySelector(".task__main");
      taskTextNew.innerText = tasks[i].todo;
      newElement.setAttribute('id', tasks[i].id);
      if (tasks[i].status === true) {
        newElement.classList.add("complete"); 
      }
    }
  } else tasks = [];
    renderCompleteCount();
    countAllTasks();
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
    toLocalStorage(tasks);
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
      renderCompleteCount();
    } else {
      countAllTasks();      
    }
  }
  if (child === parent) {
    thisElement.status = !thisElement.status;
    child.classList.toggle("complete");
    toLocalStorage(tasks);
    countAllTasks();
    renderCompleteCount();
  }
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
document.addEventListener("DOMContentLoaded", getFromReboot);
