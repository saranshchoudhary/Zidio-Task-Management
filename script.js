const taskForm = document.getElementById("taskForm");
const toDoList = document.getElementById("toDoList");
const inProgressList = document.getElementById("inProgressList");
const inReviewList = document.getElementById("inReviewList");
const completedList = document.getElementById("completedList");

// Add Task
taskForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // Get form values
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const assignedTo = document.getElementById("assignedTo").value;
  const priority = document.getElementById("priority").value;
  const deadline = document.getElementById("deadline").value;

  // Create task element
  const taskItem = createTaskElement(title, description, assignedTo, priority, deadline);

  // Add to To Do List
  toDoList.appendChild(taskItem);

  // Clear form
  taskForm.reset();
});

// Create Task Element
function createTaskElement(title, description, assignedTo, priority, deadline) {
  const taskItem = document.createElement("div");
  taskItem.className = "task-item";

  taskItem.innerHTML = `
    <div>
      <h5 class="task-title">${title}</h5>
      <p class="task-desc">${description}</p>
      <small class="task-meta">Assigned to: ${assignedTo} | Priority: ${priority} | Deadline: ${deadline}</small>
    </div>
    <div>
      <button class="btn btn-secondary btn-sm edit-btn">Edit</button>
    </div>
  `;

  // Add Edit functionality
  taskItem.querySelector(".edit-btn").addEventListener("click", function () {
    const dropdown = document.createElement("select");
    dropdown.className = "form-select form-select-sm";
    dropdown.innerHTML = `
      <option value="" selected disabled>Move to...</option>
      <option value="toDo">To Do</option>
      <option value="inProgress">In Progress</option>
      <option value="inReview">In Review</option>
      <option value="completed">Completed</option>
    `;

    // Replace edit button with dropdown
    const editButtonContainer = this.parentElement;
    editButtonContainer.innerHTML = ""; // Clear existing button
    editButtonContainer.appendChild(dropdown);

    // Handle selection
    dropdown.addEventListener("change", function () {
      if (this.value === "toDo") {
        toDoList.appendChild(taskItem);
      } else if (this.value === "inProgress") {
        inProgressList.appendChild(taskItem);
      } else if (this.value === "inReview") {
        inReviewList.appendChild(taskItem);
      } else if (this.value === "completed") {
        completedList.appendChild(taskItem);
      }

      // Restore the Edit button after moving
      editButtonContainer.innerHTML = `
        <button class="btn btn-secondary btn-sm edit-btn">Edit</button>
      `;
      attachEditFunctionality(taskItem); // Reattach Edit functionality
    });
  });

  return taskItem;
}

// Attach Edit Functionality
function attachEditFunctionality(taskItem) {
  taskItem.querySelector(".edit-btn").addEventListener("click", function () {
    const dropdown = document.createElement("select");
    dropdown.className = "form-select form-select-sm";
    dropdown.innerHTML = `
      <option value="" selected disabled>Move to...</option>
      <option value="toDo">To Do</option>
      <option value="inProgress">In Progress</option>
      <option value="inReview">In Review</option>
      <option value="completed">Completed</option>
    `;

    const editButtonContainer = this.parentElement;
    editButtonContainer.innerHTML = "";
    editButtonContainer.appendChild(dropdown);

    dropdown.addEventListener("change", function () {
      if (this.value === "toDo") {
        toDoList.appendChild(taskItem);
      } else if (this.value === "inProgress") {
        inProgressList.appendChild(taskItem);
      } else if (this.value === "inReview") {
        inReviewList.appendChild(taskItem);
      } else if (this.value === "completed") {
        completedList.appendChild(taskItem);
      }

      editButtonContainer.innerHTML = `
        <button class="btn btn-secondary btn-sm edit-btn">Edit</button>
      `;
      attachEditFunctionality(taskItem);
    });
  });
}
