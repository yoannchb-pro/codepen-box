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
  const todos = (_a = loadStorage()) !== null && _a !== void 0 ? _a : [
      { text: "Try light mode", checked: false },
      { text: "Try drag and drop", checked: false },
      { text: "Try pressing a todo to check it", checked: false },
      { text: "Try removing a todo", checked: false },
      { text: "Try editing a todo", checked: false },
      { text: "Make a cake: eggs, milk, sugar, chocolate", checked: true },
  ];
  /**
   * Get if the lightmode is enabled or not from localstorage
   * @returns
   */
  function getLightModeIsEnabled() {
      var _a;
      return JSON.parse((_a = localStorage.lightMode) !== null && _a !== void 0 ? _a : "false");
  }
  /**
   * Update the actual localstorage lightmode value
   */
  function updateLightModeStorage() {
      localStorage.lightMode = JSON.stringify(!getLightModeIsEnabled());
  }
  /**
   * Load the todos list from the storage
   * @returns
   */
  function loadStorage() {
      return localStorage.todos ? JSON.parse(localStorage.todos) : undefined;
  }
  /**
   * Update the todos list in the storage
   */
  function updateStorage() {
      localStorage.todos = JSON.stringify(todos);
  }
  /**
   * Setup events on a todo
   * Check, trash, update
   * @param param0
   */
  function setEvents({ todo, title, container, update, trash, }) {
      title.addEventListener("click", function () {
          if (!title.getAttribute("readonly"))
              return;
          const index = todos.findIndex((e) => e === todo);
          todos[index].checked = !todos[index].checked;
          container.classList.toggle("checked");
          updateStorage();
      });
      trash.addEventListener("click", function () {
          const index = todos.findIndex((e) => e === todo);
          todos.splice(index, 1);
          container.classList.remove("show");
          container.addEventListener("transitionend", container.remove);
          updateStorage();
      });
      update.addEventListener("click", function () {
          if (todo.checked)
              return;
          const titleSize = title.value.length;
          title.removeAttribute("readonly");
          title.focus();
          title.setSelectionRange(titleSize, titleSize);
      });
      const updateFn = function () {
          var _a;
          const trimmed = (_a = title.value) === null || _a === void 0 ? void 0 : _a.trim();
          if (trimmed === "") {
              title.focus();
              return;
          }
          const index = todos.findIndex((e) => e === todo);
          title.setAttribute("readonly", "true");
          todos[index].text = trimmed;
          updateStorage();
      };
      title.addEventListener("focusout", updateFn);
      title.addEventListener("keydown", (event) => event.key === "Enter" && updateFn());
  }
  /**
   * Create the todo element and set up events on it
   * @param todo
   */
  function addTodo(todo) {
      const container = document.createElement("div");
      container.classList.add("todo");
      container.classList.add("show");
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
      updateStorage();
  }
  /**
   * Function to add a new todo and reset the add input
   * @returns
   */
  function addFn() {
      var _a;
      const trimmed = (_a = inputTodo.value) === null || _a === void 0 ? void 0 : _a.trim();
      if (trimmed === "")
          return;
      const todo = { checked: false, text: trimmed };
      todos.push(todo);
      addTodo(todo);
      inputTodo.value = "";
  }
  //allow drag and drop
  Sortable.create(todoList, {
      onUpdate(event) {
          const oldIndex = event.oldIndex;
          const newIndex = event.newIndex;
          const temp = todos.splice(oldIndex, 1)[0];
          todos.splice(newIndex, 0, temp);
          updateStorage();
      },
  });
  //handle key "Enter" pressed to add a new todo
  inputTodo.addEventListener("keydown", (event) => event.key === "Enter" && addFn());
  addBtn.addEventListener("click", addFn);
  //event listener to toggle light mode/dark mode
  darkMode.addEventListener("click", function () {
      document.documentElement.classList.toggle("light");
      updateLightModeStorage();
  });
  //at start if the light mode is enabled in the localstorage we set it as true
  if (getLightModeIsEnabled() === true)
      document.documentElement.classList.add("light");
  //we create all the template todos or loaded from the localstorage at start
  for (const todo of todos) {
      addTodo(todo);
  }

}));
//# sourceMappingURL=index.js.map
