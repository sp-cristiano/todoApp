// array of todo list
let todoList = [];

// get the length of the array;
let todoLength = todoList.length;

const showTask = document.querySelector("#tasks");

function saveData() {
  // convert the arrya of object to a JSON string for storage.
  let todoListJSON = JSON.stringify(todoList);

  // save the JSON string in local storage
  localStorage.setItem("todoList", todoListJSON);

  //convert the array length to a JSON string for storage
  let lenJSON = JSON.stringify(todoLength);

  // save the array length in local storage
  localStorage.setItem("todoLength", lenJSON);
}
function loadData() {
  // Retrieve the JSON string from localStorage
  let storedTodoListJSON = localStorage.getItem("todoList");

  // Convert the JSON string bacck to an array
  if (storedTodoListJSON) {
    todoList = JSON.parse(storedTodoListJSON) || {
      task: "No Task Yet",
      startingDate: "No Starting Date Yet",
      startingTime: "No Starting Time Yet",
    };
  }

  // Retrieve todo length JSON from local storage
  let storedTodoLengthJSON = localStorage.getItem("todoLength");

  // Convert the JSON string back to an array
  if (storedTodoLengthJSON) {
    todoLength = JSON.parse(storedTodoLengthJSON);
  }
}

// Load the data on windows load
// if (todoLength <= 0) {

// }
// loadData();

function showTodo() {
  // loadData();
  // const showTask = document.querySelector('#tasks');
  if (!showTask) {
    console.error("#task element not found.");
    return;
  }

  todoLength = todoList.length;
  let todoListHtml = "";

  if (todoLength <= 0) {
    todoLength = 0;
    showTask.innerHTML = "No task available";
  } else {
    for (let index = 0; index < todoLength; index++) {
      // const todo = todoList[index].task;
      // const startDate = todoList[index].startingDate;
      // const startTime = todoList[index].startingTime;
      const { task, startingDate, startingTime } = todoList[index];
      const html = `
        <div class="itemContainer">
          <diiv class="sno">
            <p title="Serial Numnber">${index + 1}</p>
          </diiv>
          <div class="itemSubContainer">
            <div class="todoTaskContainer">
              <h4 title="Task">
                ${task}
              </h4>
            </div>
            <div class="startDateContainer dual">
              <p title="Starting Date " >
                ${startingDate}
              </p>
            </div>
            <div class="startTimeContainer dual">
              <p title="Starting Time " >
                ${startingTime}
              </p>
            </div>
          </div>
          <div class="actionContainer">
            <button title="Delete" class="deleteWide sepe wide"  onclick="deleteTodo(${index});">Delete</button>

            <button title="Edit" class="editWide sepe wide" onclick="getTodo(${index});">Update</button>


            <button id="deleteMobile" title="Delete" class="deleteMobile sepe mobile" onclick="deleteTodo(${index});" onmouseover="hideUpdateButton(this);" onmouseout="showUpdateButton(this);">X</button>


            <button title="Edit" class="editMobile sepe mobile" onclick="getTodo(${index});" onmouseover="hideDeleteButton(this);" onmouseout="showDeleteButton(this);" >U</button>
          </div>
        </div>
        <hr class="horizLine">
      `;
      todoListHtml += html;
      showTask.innerHTML = todoListHtml;
    }
  }
}

function addTodo() {
  const textInput = document.querySelector("#inputTxt");
  const startDateInput = document.querySelector("#date");
  const startTimeInput = document.querySelector("#time");

  const todoValue = textInput.value;
  const startDateValue = startDateInput.value;
  const startTimeValue = startTimeInput.value;

  if (todoValue && startDateValue && startTimeValue) {
    todoList.push({
      task: todoValue,
      startingDate: startDateValue,
      startingTime: startTimeValue,
    });
    todoLength = todoList.length;
    saveData();
    // loadData();
    showTodo();
    textInput.value = "";
    startDateInput.value = "";
    startTimeInput.value = "";
  } else {
    if (!todoValue) alert("Enter a todo task name");
    else if (!startDateValue) alert("Enter the starting date.");
    else if (!startTimeValue) alert("Enter the starting time.");
    else alert("Please enter a todo task");
  }
}

function deleteTodo(index) {
  let toDelete = todoList[index];
  todoList.splice(index, 1);
  todoLength = todoList.length;
  saveData();
  alert(` Todo with name ${toDelete.task} has been successfully deleted.`);
  showTodo();
}
function updateTodo(index) {
  let toEdit = todoList[index];
  const textInput = document.querySelector("#inputTxt");
  const startDateInput = document.querySelector("#date");
  const startTimeInput = document.querySelector("#time");
  const addBtn = document.querySelector("#addTodoBtn");
  const updateBtn = document.querySelector("#updateTodoBtn");

  // const { task, startingDate, startingTime } = todoList[index];

  todoList[index].task = textInput.value;
  todoList[index].startingDate = startDateInput.value;
  todoList[index].startingTime = startTimeInput.value;

  saveData();
  loadData();
  showTodo();
  alert(` Todo with name ${toEdit.task} has been successfully updated.`);

  textInput.value = "";
  startDateInput.value = "";
  startTimeInput.value = "";

  addBtn.style.display = "flex";
  updateBtn.style.display = "none";
}

function getTodo(index) {
  const textInput = document.querySelector("#inputTxt");
  const startDateInput = document.querySelector("#date");
  const startTimeInput = document.querySelector("#time");
  const addBtn = document.querySelector("#addTodoBtn");
  const updateBtn = document.querySelector("#updateTodoBtn");

  const { task, startingDate, startingTime } = todoList[index];

  textInput.value = task;
  startDateInput.value = startingDate;
  startTimeInput.value = startingTime;

  addBtn.style.display = "none";
  updateBtn.style.display = "flex";

  updateBtn.onclick = function () {
    updateTodo(index);
  };
}

function hideUpdateButton(button) {
  // let tohide = todoList[index];
  const actionContainer = button.parentElement;
  actionContainer.querySelector(".editMobile");
  const editBtn = actionContainer.querySelector(".editMobile");
  if (editBtn) {
    editBtn.classList.add("hide");
  }
}
function showUpdateButton(button) {
  const actionContainer = button.parentElement;
  const editBtn = actionContainer.querySelector(".editMobile");
  if (editBtn) {
    editBtn.classList.remove("hide");
  }
}

function hideDeleteButton(button) {
  const actionContainer = button.parentElement;
  const deleteBtn = actionContainer.querySelector("#deleteMobile");
  if (deleteBtn) {
    deleteBtn.classList.add("hide");
  }
}

function showDeleteButton(button) {
  const actionContainer = button.parentElement;
  const deleteBtn = actionContainer.querySelector("#deleteMobile");
  // const deleteBtn = document.querySelectorAll('#deleteMobile');
  if (deleteBtn) {
    deleteBtn.classList.remove("hide");
  }
}
// Load data from localStorage and display it on page load
document.addEventListener("DOMContentLoaded", function () {
  loadData();
  showTodo();
});
