"use strict";

// Global variables
let isDark = true;
let data = [];
let addTemplate = (
  content
) => `<div class="todo-item bgcolor box flex draggable" draggable="true">
          <div class="circle">
            <img src="images/icon-check.svg" alt="" />
          </div>
          <div class="content self ">${content}</div>
          <img src="images/icon-cross.svg" alt="" class="cross" />
        </div>`;

// Selection
let theme = document.querySelector(".theme");
let btnDarkMode = document.querySelector(".dark-mode");
let addTodo = document.querySelector(".add");
let btnAll = document.querySelector(".btn-all");
let btnActive = document.querySelector(".btn-active");
let btnComplete = document.querySelector(".btn-completed");
let btnClear = document.querySelector(".btn-clear");
let liveCounter = document.querySelector(".counter");
let tdItems = document.getElementsByClassName("todo-item");
let tdList = document.querySelector(".todo-list");
let tdItemsCroosed = document.getElementsByClassName("crossed");

// event listerners
btnDarkMode.addEventListener("click", darkMode);
addTodo.addEventListener("keydown", addNewTd);
btnAll.addEventListener("click", showAll);
btnActive.addEventListener("click", showActive);
btnComplete.addEventListener("click", showCompleted);
btnClear.addEventListener("click", clearTds);
tdList.addEventListener("click", checkRemove);
tdList.addEventListener("dragstart", dragstart);
tdList.addEventListener("dragenter", dragenter);
tdList.addEventListener("dragover", dragover);
tdList.addEventListener("dragleave", dragleave);
tdList.addEventListener("drop", drop);

// functions
// Dark mode
function darkMode() {
  if (isDark) {
    theme.classList.toggle("dark");
    theme.classList.toggle("light");
    btnDarkMode.src = "images/icon-moon.svg";
    isDark = false;
  } else {
    theme.classList.toggle("dark");
    theme.classList.toggle("light");
    btnDarkMode.src = "images/icon-sun.svg";
    isDark = true;
  }
}

// Add new todo
function addNewTd(k) {
  if (k.key == "Enter") {
    if (addTodo.value) {
      tdList.insertAdjacentHTML("afterbegin", addTemplate(addTodo.value));
      itemsLeft();
      addTodo.value = "";
    }
  }
}

// Check and Remove
function checkRemove(k) {
  let todo = k.target.parentElement;
  if (k.target.matches(".cross")) {
    todo.remove();
    itemsLeft();
  } else if (k.target.matches(".circle")) {
    todo.classList.toggle("crossed");
    itemsLeft();
  }
}

// Counter
function itemsLeft() {
  liveCounter = `${tdItems.length - tdItemsCroosed.length} items left`;
}

// show all todos
function showAll() {
  for (let i = 0; i < tdItems.length; i++) {
    tdItems[i].classList.remove("hidden");
  }
  btnComplete.classList.remove("active");
  btnActive.classList.remove("active");
  btnAll.classList.toggle("active");
}

// show active
function showActive() {
  for (let i = 0; i < tdItems.length; i++) {
    if (tdItems[i].matches(".crossed")) {
      tdItems[i].classList.add("hidden");
    } else {
      tdItems[i].classList.remove("hidden");
    }
  }
  btnComplete.classList.remove("active");
  btnActive.classList.add("active");
  btnAll.classList.remove("active");
}

// show completed
function showCompleted() {
  for (let i = 0; i < tdItems.length; i++) {
    if (tdItems[i].matches(".crossed")) {
      tdItems[i].classList.remove("hidden");
    } else {
      tdItems[i].classList.add("hidden");
    }
  }
  btnComplete.classList.add("active");
  btnActive.classList.remove("active");
  btnAll.classList.remove("active");
}

// clear completed
function clearTds() {
  let index = 0;
  while (tdItemsCroosed.length) {
    index = tdItemsCroosed.length - 1;
    tdItemsCroosed[index].remove();
  }
}

// Drag and drop
function dragstart(e) {
  data[0] = e.target;
}

function dragenter(e) {
  e.target.classList.add("over");
}

function dragleave(e) {
  e.target.classList.remove("over");
}

function dragover(e) {
  e.preventDefault();
}

function drop(e) {
  console.log("drop");
  e.target.classList.remove("over");
  data[1] = e.target;
  [data[0].children[1].textContent, data[1].children[1].textContent] = [
    data[1].children[1].textContent,
    data[0].children[1].textContent,
  ];
}
