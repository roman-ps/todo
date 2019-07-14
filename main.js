const KEYCODE_ENTER = 13;
const TMPL = document.querySelector("#tmpl");
const TASK = TMPL.content.querySelector(".task");
const ACTIVE = document.querySelector(".active");
const INPUT = document.querySelector(".add");
const TASKS_ALL = document.querySelector(".tasks__all span");
const TASKS_COMLETE = document.querySelector(".tasks__complete span");
let tasks = [];
let ActiveTasks;
let tasksJson = [];

// определение наибольшего id
function getNextId() {
    return tasks.reduce(function(a,b) {
      return (Math.max(a,b.id) + 1);
    },0);
}

// добавление id и текста в задание
function addTodo() {
  last = {id: getNextId(), todo: INPUT.value, status: false};
  tasks.push(last);
  toLocalStorage(tasks);
  return last;
}

// удаление задания по id
function removeTodo(evt) {
  let id = getTaskId(evt);
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
  let currentTask = tasks.find(function (number) {
    return number.id == id;
  })
  return currentTask;
}

//считаем и выводим кол-во заданий
function countAllTasks() {
  TASKS_ALL.innerHTML = tasks.length - getCompleteCount();
}

//выводим кол-во выполненных заданий
function renderCompleteCount() {
  TASKS_COMLETE.innerHTML = getCompleteCount(); 
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

// загрузка при обновлении страницы 
function fromReloadPage(evt){
  evt.preventDefault();
  tasks = fromLocalStorage();
  if (tasks !== 'undefined' && tasks !== null) { 
    for (let i = 0; i < tasks.length; i++) { 
      let newElement = TASK.cloneNode(true);
      newElement.addEventListener("click", handleTaskClick);
      ACTIVE.appendChild(newElement);
      let taskTextNew = newElement.querySelector(".task__main");
      taskTextNew.innerText = tasks[i].todo;
      newElement.setAttribute('id', tasks[i].id);
      if (tasks[i].status) {
        newElement.classList.add("complete"); 
      }
    }
  } else tasks = [];
    renderCompleteCount();
    countAllTasks();
}

// создание нового элемента
function createElem() {
  if (INPUT.value != '') {
    let newElement = TASK.cloneNode(true);
    newElement.addEventListener("click", handleTaskClick);
    ACTIVE.appendChild(newElement);
    let taskTextNew = newElement.querySelector(".task__main");
    const a = addTodo(INPUT.value);
    taskTextNew.innerText = a.todo;
    newElement.setAttribute('id', a.id);
    countAllTasks();
  }
  INPUT.value = '';
}

// обработка нажатия по задаче
function handleTaskClick(evt) {
  evt.preventDefault();
  let child = evt.target;
  let parent = evt.currentTarget;
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

INPUT.addEventListener("dblclick", addsItemByClick);
INPUT.addEventListener("keydown", addsItemByBtn);
document.addEventListener("DOMContentLoaded", fromReloadPage);
