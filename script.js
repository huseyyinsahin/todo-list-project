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

    Toast.fire({
      icon: "warning",
      title: "Task deleted",
    });
  }
});

document.body.addEventListener("keydown", (e) => {
  if (e.key == "Delete") {
    list.firstElementChild.remove();

    Toast.fire({
      icon: "warning",
      title: "Task deleted",
    });
  }
});

list.addEventListener("click", (e) => {
  if (e.target.tagName === "P") {
    e.target.classList.toggle("line-through");
  }
});

list.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    const selectedP = e.target.previousElementSibling.previousElementSibling;
    const editInput = document.createElement("input");
    editInput.value = selectedP.textContent;
    selectedP.parentElement.replaceChild(editInput, selectedP);

    editInput.addEventListener("blur", () => {
      selectedP.textContent = editInput.value;
      editInput.parentElement.replaceChild(selectedP, editInput);
    });

    editInput.focus();
  }
});
