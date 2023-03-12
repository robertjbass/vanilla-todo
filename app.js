let todos = [];
let input = "";

const inputBox = document.querySelector("#input");
const saveButton = document.querySelector("#btn-save");
const todoDisplay = document.querySelector("#todos");

inputBox.addEventListener("input", (e) => (input = e.target.value));
saveButton.addEventListener("click", (e) => {
  e.preventDefault();
  addTodo();
  inputBox.value = "";
  input = "";
});
todos.forEach((todo) => appendTodo(todo));

const createDeleteButton = (id) => {
  const button = document.createElement("button");
  button.innerText = "Delete";
  button.classList.add("delete-btn");
  button.addEventListener("click", () => removeTodo(id));
  return button;
};

const appendTodo = (todo) => {
  const li = document.createElement("li");
  li.id = todo.id;
  li.classList.add("list-item");

  const span = document.createElement("span");
  li.appendChild(span);

  span.classList.add("todo-item");
  span.innerText = todo.task;
  span.addEventListener("click", () => toggleCompleted(todo.id));
  span.id = `todo-${todo.id}`;

  const deleteButton = createDeleteButton(todo.id);
  li.appendChild(deleteButton);

  todoDisplay.appendChild(li);

  todos.push(todo);
};

const addTodo = () => {
  if (!input) return;

  const newTodo = {
    id: todos.length + 1,
    task: input,
    completed: false,
  };

  appendTodo(newTodo);
};

const removeTodo = (id) => {
  todos = todos.filter((todo) => todo.id !== id);
  document.getElementById(id).remove();
};

const toggleCompleted = (id) => {
  todos = todos.map((todo) => {
    if (todo.id === id) {
      document.getElementById(`todo-${id}`).classList.toggle("completed");
      return {
        ...todo,
        completed: !todo.completed,
      };
    }
    return todo;
  });
};
