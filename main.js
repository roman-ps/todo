const KEYCODE_ENTER = 13;
var tmpl = document.querySelector("#tmpl");
var task = tmpl.content.querySelector(".task");
var taskText = tmpl.content.querySelector(".task__main");
var input = document.querySelector(".add");
var active = document.querySelector(".active");
var tasksAll = document.querySelector(".tasks__all span");
var tasksComplete = document.querySelector(".tasks__complete span");
var count = 0;
//var tasks = [{id: 1, todo: 'первый'}, {id: 2, todo: 'второй'}, {id: 3, todo: 'третий'}];
var tasks = [];

// определение id
function getId() {
  return tasks.reduce(function(a,b) {
    return (Math.max(a,b.id) + 1);
  },0);
}

function addTodo() {
  last = {id: getId(), todo: input.value};
  tasks.push(last);
  return last;
}

function removeTodo(evt) {
  var idNumber = evt.currentTarget.getAttribute("id");
  var a = tasks.filter(function (number) {
    console.log('number.id: ' + number.id);
    console.log('idNumber: ' + idNumber);
    return number.id != idNumber;
  })
  console.log('a: ', a);  
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
    const a = addTodo(input.value);
    var taskTextNew = newElement.querySelector(".task__main");
    newElement.setAttribute('id', a.id);
    taskTextNew.innerText = a.todo;
    tasksAll.innerHTML = parseInt(tasksAll.innerHTML) + 1;
    //arrayTasks.push(taskTextNew.innerText);
    //localStorage.setItem(count, input.value);
    //count++;
    //newElement.id = count;
    localStorage.setItem("count", count);
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
  var child = evt.target;
  var parent = evt.currentTarget;
  if (child != parent) {
    if (parent.classList.contains("complete")) {
      updCount(tasksComplete, -1);
      child.removeEventListener("click", deleteItem);
      parent.remove();
      count--;
      localStorage.setItem("count", count);
      //console.log(tasks);
      removeTodo(evt);
    } else {
      child.removeEventListener("click", deleteItem);
      parent.remove();
      updCount(tasksAll, -1);
      count--;
      localStorage.setItem("count", count);
      //console.log(tasks);
      removeTodo(evt);
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

input.addEventListener("dblclick", addsItemByClick);
input.addEventListener("keydown", addsItemByBtn);
document.addEventListener("DOMContentLoaded", getStorage);
