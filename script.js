const input = document.querySelector("#input");
const select = document.querySelector("#select");
const btnAdd = document.querySelector("#add");
const list = document.querySelector("#list");

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 1000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});

const addList = (taskList) => {
  const newLi = document.createElement("li");
  newLi.id = taskList.id;

  const newP = document.createElement("p");
  newP.textContent = taskList.task;

  const importance = document.createElement("span");
  importance.textContent = taskList.taskSelect;
  importance.style.whiteSpace = "nowrap";
  importance.style.margin = "0px 10px";

  const edit = document.createElement("a");
  edit.classList.add("fa-solid", "fa-pen-to-square");
  edit.style.cursor = "pointer";
  edit.style.marginRight = "10px";

  const del = document.createElement("i");
  del.classList.add("fa-solid", "fa-trash");
  del.style.cursor = "pointer";
  del.style.marginRight = "10px";

  newLi.appendChild(newP);
  newLi.appendChild(importance);
  newLi.appendChild(edit);
  newLi.appendChild(del);
  list.appendChild(newLi);

  taskList.lineThrough && newP.classList.add("line-through");
};

const setLocalStorage = (data) => {
  const storageTasks = JSON.parse(localStorage.getItem("todoList")) || [];
  storageTasks.push(data);
  localStorage.setItem("todoList", JSON.stringify(storageTasks));
};

const getLocalStorage = () => {
  const data = JSON.parse(localStorage.getItem("todoList")) || [];
  data.forEach((taskList) => {
    addList(taskList);
  });
};

document.addEventListener("DOMContentLoaded", getLocalStorage);

btnAdd.addEventListener("click", () => {
  const data = {
    id: Date.now(),
    task: input.value,
    taskSelect: select.value,
    lineThrough: false,
  };

  if (input.value == "") {
    Toast.fire({
      icon: "error",
      title: "Adding task failed",
    });
  } else {
    addList(data);
  }
  setLocalStorage(data);
  input.value = "";
});

list.addEventListener("click", (e) => {
  const data = JSON.parse(localStorage.getItem("todoList")) || [];

  if (e.target.tagName == "P") {
    const id = e.target.parentElement.id;
    const taskData = data.map((item) => {
      if (item.id == id) {
        item.lineThrough = !item.lineThrough;
      }
      return item;
    });
    document.querySelectorAll("li")
    taskData.forEach((item) => addList(item));
    localStorage.setItem("todoList", JSON.stringify(taskData));
  }
});
