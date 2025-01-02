import { projectsLibrary, Project, Task } from "./task-manager";
import { populateStorage } from "./local-storage";


// Creates a few projects and tasks if projectsLibrary is empty at start.
// For demonstration purposes only.
function createProjects(name) {
    const project = new Project(name);
    projectsLibrary.library.push(project);
    return project;
}

function createTask(name, deadline, priority, description, assignedProject) {
    if (name && deadline && priority && deadline && assignedProject) {
        const task = new Task(name);
        task.addDeadline(deadline);
        task.addPriority(priority);
        task.addDescription(description);
        task.assignToProject(assignedProject.name);
        assignedProject.pushToProjectTasks(task);
    }
}

if (projectsLibrary.library.length <= 1) {

    // Creates Generic Project Names && Tasks
    const personal = createProjects("Personal");
    createTask("Schedule Dentist Appointment", "2025-01-06", "Medium", "Annual teeth cleaning and check up", personal);
    createTask("Grocery Shopping", "2024-12-24", "Medium", "Apples and Oranges", personal);
    createTask("X-Mas: 50lbs of coal", "2024-12-23", "High", "For the naughty ones", personal);
    const education = createProjects("Education");
    createTask("Learn Web Storage API", "2024-12-11", "Low", "A cool feature to store data in localStorage", education);
    createTask("Finish Meditations by Marcus Aurelius", "2024-12-28", "Low", "Journey into stoicism and philosophy", education);
    createTask("Watch next module for Learn How To Learn", "2024-12-20", "Low", "", education);
   
}
populateStorage(projectsLibrary);
