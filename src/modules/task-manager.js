class Storage {
  constructor () {
    this.library = [];
  }
}

const projectsLibrary = new Storage("projectsLibrary")

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
}

export {projectsLibrary, Project, Task};