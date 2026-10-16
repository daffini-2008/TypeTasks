
export type TaskStatus = "todo" | "in-progress" | "done";

export interface Task {
  id: number;
  title: string;
  status: TaskStatus;
}

// Adds a new task without modifying the original array.
export function addTask(tasks: Task[], title: string): Task[] {
  const nextId =
    tasks.length === 0
      ? 1
      : Math.max(...tasks.map((task) => task.id)) + 1;

  const newTask: Task = {
    id: nextId,
    title: title,
    status: "todo",
  };

  return [...tasks, newTask];
}

// Marks the matching task as done.
export function completeTask(tasks: Task[], id: number): Task[] {
  return tasks.map((task) =>
    task.id === id ? { ...task, status: "done" } : task
  );
}

// Returns tasks with the requested status.
export function filterByStatus(
  tasks: Task[],
  status: TaskStatus
): Task[] {
  return tasks.filter((task) => task.status === status);
}

// Extra operation: advances a task to its next status.
export function advanceTask(tasks: Task[], id: number): Task[] {
  return tasks.map((task) => {
    if (task.id !== id) {
      return task;
    }

    let nextStatus: TaskStatus;

    if (task.status === "todo") {
      nextStatus = "in-progress";
    } else {
      nextStatus = "done";
    }

    return { ...task, status: nextStatus };
  });
}
