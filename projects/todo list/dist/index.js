(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('sortablejs')) :
  typeof define === 'function' && define.amd ? define(['sortablejs'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Sortable));
})(this, (function (Sortable) { 'use strict';

  var _a;
  const todoList = document.querySelector(".todo-list");
  const inputTodo = document.querySelector(".add-todo input");
  const addBtn = document.querySelector(".add-todo i");
  const darkMode = document.querySelector("#darkmode");
  function getLightModeIsEnabled() {
      var _a;
      return JSON.parse((_a = localStorage.lightMode) !== null && _a !== void 0 ? _a : "false");
  }
  function updateLightModeStorage() {
      localStorage.lightMode = JSON.stringify(!getLightModeIsEnabled());
  }
  function loadStorage() {
      return localStorage.todos ? JSON.parse(localStorage.todos) : undefined;
  }
  function updateStorage() {
      localStorage.todos = JSON.stringify(todos);
  }
  const todos = (_a = loadStorage()) !== null && _a !== void 0 ? _a : [
      { text: "Try light mode", checked: false },
      { text: "Try drag and drop", checked: false },
      { text: "Try pressing a todo to check it", checked: false },
      { text: "Try removing a todo", checked: false },
      { text: "Try editing a todo", checked: false },
      { text: "Make a cake: eggs, milk, sugar, chocolate", checked: true },
  ];
  function setEvents(todo) {
      todo.title.addEventListener("click", function () {
          if (!todo.title.getAttribute("readonly"))
              return;
          const index = todos.findIndex((e) => e === todo.todo);
          todos[index].checked = !todos[index].checked;
          todo.container.classList.toggle("checked");
          updateStorage();
      });
      todo.trash.addEventListener("click", function () {
          const index = todos.findIndex((e) => e === todo.todo);
          todos.splice(index, 1);
          todo.container.classList.remove("show");
          todo.container.addEventListener("transitionend", todo.container.remove);
          updateStorage();
      });
      todo.update.addEventListener("click", function () {
          if (todo.todo.checked)
              return;
          todo.title.removeAttribute("readonly");
          todo.title.focus();
          todo.title.setSelectionRange(todo.title.value.length, todo.title.value.length);
      });
      const updateFn = function () {
          var _a;
          const trimmed = (_a = todo.title.value) === null || _a === void 0 ? void 0 : _a.trim();
          if (trimmed === "") {
              todo.title.focus();
              return;
          }
          const index = todos.findIndex((e) => e === todo.todo);
          todo.title.setAttribute("readonly", "true");
          todos[index].text = trimmed;
          updateStorage();
      };
      todo.title.addEventListener("focusout", updateFn);
      todo.title.addEventListener("keydown", (event) => event.key === "Enter" && updateFn());
  }
  function addTodo(todo) {
      const container = document.createElement("div");
      container.classList.add("todo");
      if (todo.checked)
          container.classList.add("checked");
      const title = document.createElement("input");
      title.type = "text";
      title.setAttribute("readonly", "true");
      title.value = todo.text;
      const update = document.createElement("i");
      update.className = "fa-solid fa-pen";
      const trash = document.createElement("i");
      trash.className = "fa-solid fa-trash-can";
      container.appendChild(title);
      container.appendChild(update);
      container.appendChild(trash);
      setEvents({ todo, title, container, update, trash });
      todoList.appendChild(container);
      window.requestAnimationFrame(() => container.classList.add("show"));
      updateStorage();
  }
  for (const todo of todos) {
      addTodo(todo);
  }
  const addFn = function () {
      var _a;
      const trimmed = (_a = inputTodo.value) === null || _a === void 0 ? void 0 : _a.trim();
      if (trimmed === "")
          return;
      const todo = { checked: false, text: trimmed };
      todos.push(todo);
      addTodo(todo);
      inputTodo.value = "";
  };
  inputTodo.addEventListener("keydown", (event) => event.key === "Enter" && addFn());
  addBtn.addEventListener("click", addFn);
  darkMode.addEventListener("click", function () {
      document.documentElement.classList.toggle("light");
      updateLightModeStorage();
  });
  if (getLightModeIsEnabled() === true)
      document.documentElement.classList.add("light");
  Sortable.create(todoList, {
      onUpdate(event) {
          const oldIndex = event.oldIndex;
          const newIndex = event.newIndex;
          const temp = todos.splice(oldIndex, 1)[0];
          todos.splice(newIndex, 0, temp);
          updateStorage();
      },
  });

}));
//# sourceMappingURL=index.js.map
