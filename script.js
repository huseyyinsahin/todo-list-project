const input = document.querySelector("#input");
const add = document.querySelector("#add");
const list = document.querySelector("#list");
const select = document.querySelector("#select");

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

input.focus();

function saveLocalStorage() {
  const data = {
    list: list.innerHTML,
  };
  localStorage.setItem("listData", JSON.stringify(data));
}

function loadLocalStorage() {
  const listD = localStorage.getItem("listData");
  if (listD) {
    const data = JSON.parse(listD);
    list.innerHTML = data.list;
  }
}

document.addEventListener("DOMContentLoaded", loadLocalStorage);

function newTask() {
  if (input.value == "") {
    Toast.fire({
      icon: "error",
      title: "Adding task failed",
    });
  } else {
    const newLi = document.createElement("li");
    const newP = document.createElement("p");
    newP.textContent = input.value;

    const importance = document.createElement("span");
    importance.textContent = select.value;
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
    input.value = "";
    input.focus();
    saveLocalStorage();

    Toast.fire({
      icon: "success",
      title: "New task added successfully",
    });
  }
}

add.addEventListener("click", () => {
  newTask();
});

document.body.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    newTask();
  }
});

list.addEventListener("click", (e) => {
  if (e.target.tagName === "I") {
    const selectedLi = e.target.parentElement;
    selectedLi.remove();
    saveLocalStorage();

    Toast.fire({
      icon: "warning",
      title: "Task deleted",
    });
  }
});

document.body.addEventListener("keydown", (e) => {
  if (e.key == "Delete") {
    list.firstElementChild.remove();
    saveLocalStorage();

    Toast.fire({
      icon: "warning",
      title: "Task deleted",
    });
  }
});

list.addEventListener("click", (e) => {
  if (e.target.tagName === "P") {
    e.target.classList.toggle("line-through");
    saveLocalStorage();
  }
});

list.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    const selectedP = e.target.previousElementSibling.previousElementSibling;
    const editInput = document.createElement("input");
    editInput.style.padding = "5px 10px";
    editInput.style.fontSize = "1rem";
    editInput.style.outline = "none";
    editInput.style.borderRadius = "0.5rem";
    editInput.style.border = "none";
    editInput.value = selectedP.textContent;

    selectedP.parentElement.replaceChild(editInput, selectedP);

    editInput.addEventListener("blur", () => {
      if (editInput.value == "") {
        Toast.fire({
          icon: "error",
          title: "Task edit failed",
        });
      } else {
        selectedP.textContent = editInput.value;
        editInput.parentElement.replaceChild(selectedP, editInput);
        saveLocalStorage();
      }
    });
    editInput.focus();
  }
});
