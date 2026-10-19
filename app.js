import { addTask, advanceTask, filterByStatus } from "./model.js";
let tasks = [];
let activeFilter = "all";
const form = document.getElementById("task-form");
const titleInput = document.getElementById("title");
const taskList = document.getElementById("task-list");
const emptyMessage = document.getElementById("empty-message");
const filterButtons = document.querySelectorAll("[data-filter]");
function renderTasks() {
    taskList.replaceChildren();
    const visibleTasks = activeFilter === "all"
        ? tasks
        : filterByStatus(tasks, activeFilter);
    emptyMessage.hidden = visibleTasks.length > 0;
    visibleTasks.forEach((task) => {
        const item = document.createElement("li");
        item.className = "task";
        const details = document.createElement("div");
        const title = document.createElement("span");
        title.className = "task-title";
        title.textContent = task.title;
        const status = document.createElement("span");
        status.className = "status";
        status.textContent = task.status;
        details.append(title, status);
        const button = document.createElement("button");
        button.className = "advance";
        button.type = "button";
        button.textContent =
            task.status === "todo"
                ? "Start →"
                : task.status === "in-progress"
                    ? "Complete ✓"
                    : "Done ✓";
        button.disabled = task.status === "done";
        button.addEventListener("click", () => {
            tasks = advanceTask(tasks, task.id);
            renderTasks();
        });
        item.append(details, button);
        taskList.append(item);
    });
}
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = titleInput.value.trim();
    if (title === "") {
        return;
    }
    tasks = addTask(tasks, title);
    titleInput.value = "";
    renderTasks();
});
filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const selectedFilter = button.dataset.filter;
        if (selectedFilter === "all" ||
            selectedFilter === "todo" ||
            selectedFilter === "in-progress" ||
            selectedFilter === "done") {
            activeFilter = selectedFilter;
        }
        filterButtons.forEach((filterButton) => {
            filterButton.classList.toggle("active", filterButton === button);
        });
        renderTasks();
    });
});
renderTasks();
//# sourceMappingURL=app.js.map