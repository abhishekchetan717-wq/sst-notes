const body = document.body;
const themeToggle = document.getElementById("themeToggle");
const searchInput = document.getElementById("searchInput");
const chapterCards = [...document.querySelectorAll(".chapter-card")];
const noResults = document.getElementById("noResults");

function updateThemeButton() {
    const dark = body.classList.contains("dark");
    themeToggle.textContent = dark ? "☀️ Light Mode" : "🌙 Dark Mode";
}

themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark");
    localStorage.setItem(
        "sst-theme",
        body.classList.contains("dark") ? "dark" : "light"
    );
    updateThemeButton();
});

if (localStorage.getItem("sst-theme") === "dark") {
    body.classList.add("dark");
}
updateThemeButton();

function filterChapters() {
    const query = searchInput.value.trim().toLowerCase();
    let visible = 0;

    chapterCards.forEach(card => {
        const matches = card.textContent.toLowerCase().includes(query);
        card.style.display = matches ? "" : "none";
        if (matches) visible++;
    });

    noResults.hidden = visible !== 0;
}

searchInput.addEventListener("input", filterChapters);

document.querySelectorAll(".subject-card").forEach(button => {
    button.addEventListener("click", () => {
        const subject = button.dataset.subject.toLowerCase();
        searchInput.value = subject;
        filterChapters();
        document.querySelector(".chapter-grid").scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });
});

const modal = document.getElementById("notesModal");
const modalTitle = document.getElementById("modalTitle");
const modalNotes = document.getElementById("modalNotes");
const closeModal = document.getElementById("closeModal");

document.querySelectorAll(".notes-btn").forEach(button => {
    button.addEventListener("click", () => {
        modalTitle.textContent = button.dataset.title;
        modalNotes.textContent = button.dataset.notes;
        modal.classList.add("show");
        modal.setAttribute("aria-hidden", "false");
    });
});

function hideModal() {
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
}

closeModal.addEventListener("click", hideModal);

modal.addEventListener("click", event => {
    if (event.target === modal) hideModal();
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape") hideModal();
});
