class Storage {
  constructor () {
    this.library = [];
  }
}

class Project {
  constructor(name) {
    this.name = name;
    this.tasks = [];
  }

  pushToProjectTasks(task) {
    this.tasks.push(task);
  }
}

class Task {
  constructor(title) {
    this.title = title;
    this.isChecked = false;
  }

  addDeadline(deadline) {
    this.deadline = deadline;
  }

  addPriority(priority) {
    this.priority = priority;
  }

  addDescription(description) {
    this.description = description;
  }

  assignToProject(assignedProject) {
    this.assignedProject = assignedProject;
  }
}

const projectsLibrary = new Storage("projectsLibrary")

const allTasks = new Project("Tasks")
projectsLibrary.library.push(allTasks);

export {projectsLibrary, Project, Task};