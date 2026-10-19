// Adds a new task without modifying the original array.
export function addTask(tasks, title) {
    const nextId = tasks.length === 0
        ? 1
        : Math.max(...tasks.map((task) => task.id)) + 1;
    const newTask = {
        id: nextId,
        title: title,
        status: "todo",
    };
    return [...tasks, newTask];
}
// Marks the matching task as done.
export function completeTask(tasks, id) {
    return tasks.map((task) => task.id === id ? { ...task, status: "done" } : task);
}
// Returns tasks with the requested status.
export function filterByStatus(tasks, status) {
    return tasks.filter((task) => task.status === status);
}
// Extra operation: advances a task to its next status.
export function advanceTask(tasks, id) {
    return tasks.map((task) => {
        if (task.id !== id) {
            return task;
        }
        let nextStatus;
        if (task.status === "todo") {
            nextStatus = "in-progress";
        }
        else {
            nextStatus = "done";
        }
        return { ...task, status: nextStatus };
    });
}
//# sourceMappingURL=model.js.map