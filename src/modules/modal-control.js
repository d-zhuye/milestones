export default function () {
  const openForm = document.getElementById("open-form");
  const formModal = document.getElementById("form-modal");
  const overlay = document.querySelector(".overlay");
  const formSubmit = document.getElementById("submit-form");

  openForm.addEventListener("click", (event) => {
    event.stopPropagation();
    formModal.classList.remove("hidden");
    // overlay.classList.remove("hidden");
  });

  const closeModal = document.getElementById("close-form");
  closeModal.addEventListener("click", (event) => {
    event.stopPropagation();
    formModal.classList.add("hidden");
    // overlay.classList.add("hidden");
  });

  formSubmit.addEventListener("click", (event) => {
    event.stopPropagation();
    formModal.classList.add("hidden");
    // overlay.classList.add("hidden");
  });
}
