import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addSubject,
  updateSubject,
  deleteSubject,
} from "../features/subjects/subjectSlice";

import { FaBook, FaEdit, FaTrash } from "react-icons/fa";

function Subjects() {
  const dispatch = useDispatch();

  const subjects = useSelector((state) => state.subjects);
  const tasks = useSelector((state) => state.tasks);

  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState(null);

  function handleSubmit(event) {
    event.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName) return;

    const duplicate = subjects.some(
      (subject) =>
        subject.name.toLowerCase() === trimmedName.toLowerCase() &&
        subject.id !== editingId
    );

    if (duplicate) {
      alert("This subject already exists.");
      return;
    }

    if (editingId) {
      dispatch(
        updateSubject({
          id: editingId,
          name: trimmedName,
        })
      );

      setEditingId(null);
    } else {
      dispatch(addSubject(trimmedName));
    }

    setName("");
  }

  function handleEdit(subject) {
    setEditingId(subject.id);
    setName(subject.name);
  }

  function handleDelete(subject) {
    const hasTasks = tasks.some(
      (task) => task.subjectId === subject.id
    );

    if (
      hasTasks &&
      !window.confirm(
        "This subject has tasks. Delete it anyway? Its tasks will remain but will no longer be linked to this subject."
      )
    ) {
      return;
    }

    if (
      !hasTasks &&
      !window.confirm(`Delete ${subject.name}?`)
    ) {
      return;
    }

    dispatch(deleteSubject(subject.id));

    if (editingId === subject.id) {
      setEditingId(null);
      setName("");
    }
  }

  return (
    <div>
      <div className="page-heading mb-4">
        <h2>Subject Manager</h2>

        <p>
          Organise your UPSC subjects and track your preparation.
        </p>
      </div>

      <div className="content-card mb-4">
        <h5 className="fw-bold mb-3">
          {editingId ? "Edit Subject" : "Add a New Subject"}
        </h5>

        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-12 col-md-8">
              <input
                className="form-control"
                type="text"
                placeholder="Enter subject name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
            </div>

            <div className="col-12 col-md-4 d-flex gap-2">
              <button className="btn btn-primary" type="submit">
                {editingId ? "Update Subject" : "Add Subject"}
              </button>

              {editingId && (
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={() => {
                    setEditingId(null);
                    setName("");
                  }}
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </form>
      </div>

      <div className="row g-3">
        {subjects.map((subject) => {
          const subjectTasks = tasks.filter(
            (task) => task.subjectId === subject.id
          );

          const completed = subjectTasks.filter(
            (task) => task.completed
          ).length;

          const percentage = subjectTasks.length
            ? Math.round(
                (completed / subjectTasks.length) * 100
              )
            : 0;

          return (
            <div
              className="col-12 col-md-6 col-xl-4"
              key={subject.id}
            >
              <div className="content-card h-100">
                <div className="d-flex justify-content-between align-items-start">
                  <div className="d-flex gap-3">
                    <div
                      className="subject-icon"
                      style={{
                        backgroundColor: `${subject.color}18`,
                        color: subject.color,
                      }}
                    >
                      <FaBook />
                    </div>

                    <div>
                      <h5 className="fw-bold">
                        {subject.name}
                      </h5>

                      <small className="text-secondary">
                        {subjectTasks.length} tasks
                      </small>
                    </div>
                  </div>

                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => handleEdit(subject)}
                      aria-label={`Edit ${subject.name}`}
                    >
                      <FaEdit />
                    </button>

                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(subject)}
                      aria-label={`Delete ${subject.name}`}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="d-flex justify-content-between mb-2">
                    <small>Progress</small>
                    <small>{percentage}%</small>
                  </div>

                  <div className="progress">
                    <div
                      className="progress-bar"
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: subject.color,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Subjects;