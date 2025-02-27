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
    return;
  } else {
    addList(data);
    Toast.fire({
      icon: "success",
      title: "Task added",
    });
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
    document.querySelectorAll("li").forEach((li) => li.remove());
    taskData.forEach((item) => addList(item));
    localStorage.setItem("todoList", JSON.stringify(taskData));
  }

  if (e.target.tagName == "I") {
    const id = e.target.parentElement.id;
    const taskData = data.filter((item) => item.id != id);
    document.querySelectorAll("li").forEach((li) => li.remove());
    taskData.forEach((item) => addList(item));
    localStorage.setItem("todoList", JSON.stringify(taskData));
    Toast.fire({
      icon: "success",
      title: "Task deleted!",
    });
  }

  if (e.target.tagName == "A") {
    const id = e.target.parentElement.id;
    let taskData = data.find((item) => item.id == id);

    const updateInput = document.createElement("input");
    updateInput.value = taskData.task;

    const p = e.target.previousElementSibling.previousElementSibling;
    p.replaceWith(updateInput);

    updateInput.addEventListener("blur", () => {
      if (!updateInput.value) {
        Toast.fire({
          icon: "error",
          title: "Task not updated!",
        });
        return;
      }

      const dataTask = data.map((item) =>
        item.id == id ? { ...item, task: updateInput.value } : item
      );
      localStorage.setItem("todoList", JSON.stringify(dataTask));

      const updatedP = document.createElement("p");
      updatedP.textContent = updateInput.value;

      updateInput.replaceWith(updatedP);

      Toast.fire({
        icon: "success",
        title: "Task updated!",
      });
    });

    updateInput.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        updateInput.blur();
      }
    });

    updateInput.focus();
  }
});
