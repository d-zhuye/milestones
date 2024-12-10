import "./reset.css";
import "./styles.css";

const openModalBtn = document.getElementById("open-modal");
const modal = document.getElementById("task-modal");
const overlay = document.querySelector(".overlay");

openModalBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
})

const closeModal = document.getElementById("close-modal");
closeModal.addEventListener("click", (event) => {
    event.stopPropagation();
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
})