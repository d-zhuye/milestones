import deleteIcon from "../assets/delete-icon.svg";

export function appendProjects() {
  const projectsLibrary = JSON.parse(localStorage.getItem("projects-library"));
  const projectsList = document.getElementById("projects-list");
  projectsList.innerHTML = "";
  const projectSelect = document.getElementById("project-select");
  projectSelect.innerHTML = "";

  // Append each project to projects-list 
  projectsLibrary.library.forEach((project) => {
    const newLi = document.createElement("li");
    newLi.textContent = project.name;
    newLi.classList.add("project");
    projectsList.appendChild(newLi);

    // Append each project as an option to project-select 
    const option = document.createElement("option");
    option.value = project.name;
    option.textContent = project.name;
    projectSelect.appendChild(option);

  });

  
  appendTasks();
}

function newParagraph(content, classList, parentContainer) {
  const p = document.createElement("p");
  p.classList.add(classList);
  p.innerHTML = content;
  parentContainer.appendChild(p);
}

function appendTasks() {
  const projectsLibrary = JSON.parse(localStorage.getItem("projects-library"));
  const listDisplay = document.getElementById("list-display");
  listDisplay.innerHTML = "";
  projectsLibrary.library.forEach((project) => {
    project.tasks.forEach((task) => {
      const taskContainer = document.createElement("div");
      taskContainer.classList.add("task-container");
      listDisplay.appendChild(taskContainer);

      // Adds a checkbox. If isChecked property is true, then checkbox spawns as
      // true. Adds event listener to toggle between isChecked and Strikethrough
      const checkBox = document.createElement("input");
      checkBox.type = "checkbox";
      checkBox.classList.add("checkbox");
      if (task.isChecked) {
        checkBox.checked = true;
        taskContainer.classList.add("strike-through");
      }
      taskContainer.appendChild(checkBox);
      checkBox.addEventListener("click", (event) => {
        event.stopPropagation();
        if (checkBox.checked) {
          task.isChecked = true;
          taskContainer.classList.add("strike-through");
        } else {
          task.isChecked = false;
          taskContainer.classList.remove("strike-through");
        }
      });

      // Call on function factory to create new P
      newParagraph(task.title, "task-title", taskContainer);
      newParagraph(task.deadline, "task-deadline", taskContainer);

      // Add a deleteIconIMG
      const deleteIconIMG = document.createElement("img");
      deleteIconIMG.src = deleteIcon;
      deleteIconIMG.classList.add("delete-icon");
      taskContainer.appendChild(deleteIconIMG);

      taskContainer.addEventListener("click", (event) => {
        event.stopPropagation();
      });
    });
  });
}

appendProjects();