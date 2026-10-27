import { useSelector } from "react-redux";
import { FaChartLine, FaCheckCircle } from "react-icons/fa";

function Progress() {
  const tasks = useSelector((state) => state.tasks);
  const subjects = useSelector((state) => state.subjects);

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const pendingTasks = tasks.length - completedTasks;

  const overallProgress = tasks.length
    ? Math.round((completedTasks / tasks.length) * 100)
    : 0;

  const completedMinutes = tasks
    .filter((task) => task.completed)
    .reduce(
      (total, task) => total + Number(task.duration || 0),
      0
    );

  const completedHours = (completedMinutes / 60).toFixed(1);

  return (
    <div>
      <div className="page-heading mb-4">
        <h2>Progress Tracker</h2>

        <p>
          Review your study task completion and subject-wise progress.
        </p>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-12 col-md-4">
          <div className="content-card h-100">
            <FaChartLine className="text-primary mb-3" size={25} />

            <p className="text-secondary">Overall Progress</p>

            <h2 className="fw-bold">{overallProgress}%</h2>

            <div className="progress">
              <div
                className="progress-bar"
                style={{ width: `${overallProgress}%` }}
              />
            </div>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div className="content-card h-100">
            <FaCheckCircle className="text-success mb-3" size={25} />

            <p className="text-secondary">Completed Tasks</p>

            <h2 className="fw-bold">{completedTasks}</h2>

            <p className="small text-secondary mb-0">
              Out of {tasks.length} total tasks
            </p>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div className="content-card h-100">
            <FaChartLine className="text-info mb-3" size={25} />

            <p className="text-secondary">Study Time Completed</p>

            <h2 className="fw-bold">{completedHours} hours</h2>

            <p className="small text-secondary mb-0">
              Estimated time from completed tasks
            </p>
          </div>
        </div>
      </div>

      <div className="content-card mb-4">
        <h5 className="fw-bold mb-3">Subject-wise Progress</h5>

        {subjects.length === 0 ? (
          <p className="text-secondary">
            Add subjects to view your progress.
          </p>
        ) : (
          subjects.map((subject) => {
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
              <div className="mb-4" key={subject.id}>
                <div className="d-flex justify-content-between mb-2">
                  <strong>{subject.name}</strong>

                  <span className="text-secondary small">
                    {completed}/{subjectTasks.length} tasks ·{" "}
                    {percentage}%
                  </span>
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
            );
          })
        )}
      </div>

      <div className="content-card">
        <h5 className="fw-bold mb-3">Task Summary</h5>

        <div className="row text-center g-3">
          <div className="col-6">
            <div className="summary-box">
              <h3 className="fw-bold">{tasks.length}</h3>
              <p className="mb-0">Total Tasks</p>
            </div>
          </div>

          <div className="col-6">
            <div className="summary-box">
              <h3 className="fw-bold text-success">
                {completedTasks}
              </h3>
              <p className="mb-0">Completed</p>
            </div>
          </div>

          <div className="col-6">
            <div className="summary-box">
              <h3 className="fw-bold text-warning">
                {pendingTasks}
              </h3>
              <p className="mb-0">Pending</p>
            </div>
          </div>

          <div className="col-6">
            <div className="summary-box">
              <h3 className="fw-bold text-primary">
                {overallProgress}%
              </h3>
              <p className="mb-0">Completion Rate</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Progress;