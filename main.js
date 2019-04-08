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
var ActiveTasks;

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
}

// вычисление кол-во выполненных заданий
function whatIsComplete(evt) {
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
    newElement.addEventListener("click", handleTaskClick);
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

// обработка нажатия по задаче
function handleTaskClick(evt) {
  evt.preventDefault();
  var child = evt.target;
  var parent = evt.currentTarget;
  const thisElement = getTaskById(getTaskId(evt));
  if (child != parent) {
    if (thisElement.status) {
      child.removeEventListener("click", handleTaskClick);
      parent.remove();
      removeTodo(evt);
      tasksComplete.innerHTML = whatIsComplete();
    } else {
      child.removeEventListener("click", handleTaskClick);
      parent.remove();
      removeTodo(evt);
      tasksAll.innerHTML = tasks.length - whatIsComplete();        
    }
  }
  if (child === parent) {
    thisElement.status = !thisElement.status;
    child.classList.toggle("complete");
    tasksAll.innerHTML = tasks.length - whatIsComplete();
    tasksComplete.innerHTML = whatIsComplete(); 
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

// счетчик задач
function updCount(evt, number) {
  evt.innerHTML = parseInt(evt.innerHTML) + number;
}

input.addEventListener("dblclick", addsItemByClick);
input.addEventListener("keydown", addsItemByBtn);
document.addEventListener("DOMContentLoaded", getStorage);
