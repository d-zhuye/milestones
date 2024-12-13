import { projectsLibrary, Project, Task } from "./task-manager";
import { populateStorage } from "./local-storage";

// Creates a few projects and tasks if projectsLibrary is empty at start
function createProjects(name) {
    const project = new Project(name);
    projectsLibrary.library.push(project);
    return project;
}

function createTask(name, deadline, priority, description, parentContainer) {
    if (name && deadline && priority && deadline && parentContainer) {
        const task = new Task(name);
        task.addDeadline(deadline);
        task.addPriority(priority);
        task.addDescription(description);
        parentContainer.pushToProjectTasks(task);
    }
}

if (projectsLibrary.library.length === 0) {

    // Creates Generic Project Names && Tasks
    const personal = createProjects("Personal");
    createTask("Schedule Dentist Appointment", "04/08/2024", "Medium", "Annual teeth cleaning and check up", personal);
    createTask("Grocery Shopping", "12/14/2024", "Medium", "Apples and Oranges", personal);

    const education = createProjects("Education");
    createTask("Learn Web Storage API", "12/14/2024", "Low", "A cool feature to store data in localStorage", education);
    createTask("Finish Meditations by Marcus Aurelius", "12/20/2024", "Low", "Journey into stoicism and philosophy", education);
    createTask("Watch next module for Learn How To Learn", "12/19/2024", "Low", "", education);
    // console.log(projectsLibrary);
    
    // const education = new Project("Education");
    // const chores = new Project ("Chores");

    /*
const example = new Task("example");
example.addDeadline("04/05/2030");
example.addPriority("high");
example.addDescription("This is an example description");

projectsLibrary.library.push(personal);
projectsLibrary.library.push(school);

personal.pushToProjectTasks(example);
*/
}

// console.log(projectsLibrary);
// console.log(projectsLibrary.library);

populateStorage(projectsLibrary);
