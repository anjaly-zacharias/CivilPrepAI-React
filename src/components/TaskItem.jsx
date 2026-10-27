import { useDispatch, useSelector } from "react-redux";
import {
  toggleTask,
  deleteTask,
} from "../features/tasks/taskSlice";
import { FaTrash } from "react-icons/fa";

function TaskItem({ task }) {
  const dispatch = useDispatch();

  const subjects = useSelector((state) => state.subjects);

  const subject = subjects.find(
    (item) => item.id === task.subjectId
  );

  return (
    <div className="task-item d-flex align-items-center gap-3">
      <input
        type="checkbox"
        className="form-check-input"
        checked={task.completed}
        onChange={() => dispatch(toggleTask(task.id))}
        aria-label={`Mark ${task.title} as ${
          task.completed ? "incomplete" : "complete"
        }`}
      />

      <div className="flex-grow-1">
        <p
          className={`mb-1 fw-semibold ${
            task.completed ? "task-completed" : ""
          }`}
        >
          {task.title}
        </p>

        <small className="text-secondary">
          {subject?.name || "Unknown subject"} ·{" "}
          {task.duration} minutes
        </small>

        {task.deadline && (
          <div className="small text-secondary">
            Deadline: {task.deadline}
          </div>
        )}
      </div>

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
        className="btn btn-sm btn-outline-danger"
        onClick={() => dispatch(deleteTask(task.id))}
        aria-label={`Delete ${task.title}`}
      >
        <FaTrash />
      </button>
    </div>
  );
}

export default TaskItem;