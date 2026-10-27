import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  addTask,
  updateTask,
  toggleTask,
  deleteTask,
} from "../features/tasks/taskSlice";

function Tasks() {
  const dispatch = useDispatch();

  const tasks = useSelector((state) => state.tasks);
  const subjects = useSelector((state) => state.subjects);

  const [title, setTitle] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [deadline, setDeadline] = useState("");
  const [duration, setDuration] = useState(60);
  const [priority, setPriority] = useState("Medium");
  const [editingId, setEditingId] = useState(null);
  const [filter, setFilter] = useState("All");

  function resetForm() {
    setTitle("");
    setSubjectId("");
    setDeadline("");
    setDuration(60);
    setPriority("Medium");
    setEditingId(null);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!title.trim() || !subjectId) return;

    const taskData = {
      title: title.trim(),
      subjectId,
      deadline,
      duration: Number(duration),
      priority,
    };

    if (editingId) {
      dispatch(updateTask({ id: editingId, ...taskData }));
    } else {
      dispatch(addTask(taskData));
    }

    resetForm();
  }

  function handleEdit(task) {
    setEditingId(task.id);
    setTitle(task.title);
    setSubjectId(task.subjectId);
    setDeadline(task.deadline || "");
    setDuration(task.duration);
    setPriority(task.priority);
  }

  const visibleTasks = tasks.filter((task) => {
    if (filter === "Completed") return task.completed;
    if (filter === "Pending") return !task.completed;

    return true;
  });

  return (
    <div>
      <div className="page-heading mb-4">
        <h2>Task Manager</h2>

        <p>
          Create your study tasks and keep track of your deadlines.
        </p>
      </div>

      <div className="content-card mb-4">
        <h5 className="fw-bold mb-3">
          {editingId ? "Edit Study Task" : "Create a Study Task"}
        </h5>

        {subjects.length === 0 ? (
          <p className="text-secondary mb-0">
            Please add a subject in Subject Manager before creating tasks.
          </p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-12 col-md-6">
                <label className="form-label">Task Title</label>

                <input
                  className="form-control"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder="e.g. Fundamental Rights"
                  required
                />
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label">Subject</label>

                <select
                  className="form-select"
                  value={subjectId}
                  onChange={(event) =>
                    setSubjectId(event.target.value)
                  }
                  required
                >
                  <option value="">Select subject</option>

                  {subjects.map((subject) => (
                    <option key={subject.id} value={subject.id}>
                      {subject.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-12 col-md-4">
                <label className="form-label">Deadline</label>

                <input
                  className="form-control"
                  type="date"
                  value={deadline}
                  onChange={(event) =>
                    setDeadline(event.target.value)
                  }
                />
              </div>

              <div className="col-12 col-md-4">
                <label className="form-label">
                  Duration (minutes)
                </label>

                <input
                  className="form-control"
                  type="number"
                  min="1"
                  max="1440"
                  value={duration}
                  onChange={(event) =>
                    setDuration(event.target.value)
                  }
                  required
                />
              </div>

              <div className="col-12 col-md-4">
                <label className="form-label">Priority</label>

                <select
                  className="form-select"
                  value={priority}
                  onChange={(event) =>
                    setPriority(event.target.value)
                  }
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </div>

              <div className="col-12 d-flex gap-2">
                <button className="btn btn-primary" type="submit">
                  {editingId ? "Update Task" : "Add Task"}
                </button>

                {editingId && (
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={resetForm}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </form>
        )}
      </div>

      <div className="content-card">
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-3">
          <h5 className="fw-bold mb-0">
            Your Study Tasks ({visibleTasks.length})
          </h5>

          <select
            className="form-select filter-select"
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
            aria-label="Filter tasks"
          >
            <option>All</option>
            <option>Pending</option>
            <option>Completed</option>
          </select>
        </div>

        {visibleTasks.length === 0 ? (
          <p className="text-secondary py-4 text-center">
            No tasks found. Add a task or change the filter.
          </p>
        ) : (
          visibleTasks.map((task) => {
            const subject = subjects.find(
              (item) => item.id === task.subjectId
            );

            return (
              <div className="task-item" key={task.id}>
                <div className="d-flex align-items-start gap-3">
                  <input
                    className="form-check-input mt-1"
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => dispatch(toggleTask(task.id))}
                    aria-label={`Complete ${task.title}`}
                  />

                  <div className="flex-grow-1">
                    <h6
                      className={
                        task.completed ? "task-completed" : ""
                      }
                    >
                      {task.title}
                    </h6>

                    <p className="small text-secondary mb-1">
                      {subject?.name || "Unknown subject"} ·{" "}
                      {task.duration} minutes
                    </p>

                    <p className="small text-secondary mb-0">
                      Deadline: {task.deadline || "Not set"}
                    </p>
                  </div>

                  <div className="d-flex flex-wrap gap-2">
                    <span
                      className={`badge ${
                        task.priority === "High"
                          ? "text-bg-danger"
                          : task.priority === "Low"
                          ? "text-bg-secondary"
                          : "text-bg-primary"
                      }`}
                    >
                      {task.priority}
                    </span>

                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => handleEdit(task)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => {
                        if (
                          window.confirm("Delete this study task?")
                        ) {
                          dispatch(deleteTask(task.id));

                          if (editingId === task.id) {
                            resetForm();
                          }
                        }
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Tasks;