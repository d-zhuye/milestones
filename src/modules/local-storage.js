import { projectsLibrary } from "./task-manager";
import { appendProjects } from "./DOM";

function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      e.name === "QuotaExceededError" &&
      storage &&
      storage.length !== 0
    );
  }
}

export function populateStorage() {
  if (storageAvailable("localStorage")) {
    localStorage.setItem("projects-library", JSON.stringify(projectsLibrary));
  }

  appendProjects();
}
