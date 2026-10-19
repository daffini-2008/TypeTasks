
import {
    addTask,
    advanceTask,
    filterByStatus
} from "./model.js";

import type { Task, TaskStatus } from "./model.js";

let tasks: Task[] = [];
let activeFilter: "all" | TaskStatus = "all";

const form = document.getElementById("task-form") as HTMLFormElement;
const titleInput = document.getElementById("title") as HTMLInputElement;
const taskList = document.getElementById("task-list") as HTMLUListElement;
const emptyMessage = document.getElementById("empty-message") as HTMLParagraphElement;
const filterButtons = document.querySelectorAll<HTMLButtonElement>("[data-filter]");

function renderTasks(): void {
    taskList.replaceChildren();

    const visibleTasks: Task[] =
        activeFilter === "all"
            ? tasks
            : filterByStatus(tasks, activeFilter);

    emptyMessage.hidden = visibleTasks.length > 0;

    visibleTasks.forEach((task: Task) => {
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

form.addEventListener("submit", (event: SubmitEvent) => {
    event.preventDefault();

    const title = titleInput.value.trim();

    if (title === "") {
        return;
    }

    tasks = addTask(tasks, title);
    titleInput.value = "";
    renderTasks();
});

filterButtons.forEach((button: HTMLButtonElement) => {
    button.addEventListener("click", () => {
        const selectedFilter = button.dataset.filter;

        if (
            selectedFilter === "all" ||
            selectedFilter === "todo" ||
            selectedFilter === "in-progress" ||
            selectedFilter === "done"
        ) {
            activeFilter = selectedFilter;
        }

        filterButtons.forEach((filterButton: HTMLButtonElement) => {
            filterButton.classList.toggle(
                "active",
                filterButton === button
            );
        });

        renderTasks();
    });
});

renderTasks();
