import { projectsLibrary, Project, Task } from "./task-manager.js";
import { populateStorage} from "./local-storage.js";

function activateProjectForm() {
  const newProjectForm = document.getElementById("new-project-form");
  newProjectForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const newProjectName = document.getElementById("new-project-name").value;
    const newProject = new Project(newProjectName);
    projectsLibrary.push(newProject);
    populateStorage(projectsLibrary);
    newProjectForm.reset();
  });
}
console.log(typeof projectsLibrary.library);
console.log(projectsLibrary.library);



function activateTaskForm() {
  const newTaskForm = document.getElementById("form-modal");
  newTaskForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const newTaskTitle = document.getElementById("new-title").value;
    const newTask = new Task(newTaskTitle);
    newTask.deadline = document.getElementById("new-deadline").value;
    newTask.priority = document.getElementById("new-priority").value;
    newTask.description = document.getElementById("new-description").value;

    // Get selectedOption & storedProject. Update projectsLibrary with local 
    // storage. Find project with matching name to selected Option. Push to 
    // selectedProject.
    const selectedOption = document.getElementById("project-select").value;
    const storedProjects = JSON.parse(localStorage.getItem("projects-library"));
    projectsLibrary.library = storedProjects.library;
    const selectedProject = projectsLibrary.library.find( (project) => {
      return project.name === selectedOption;
    })

    selectedProject.tasks.push(newTask);
    populateStorage();
    newTaskForm.reset();
  });
}

activateProjectForm();
activateTaskForm();
populateStorage(projectsLibrary);