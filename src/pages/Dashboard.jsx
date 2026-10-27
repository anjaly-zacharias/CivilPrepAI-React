import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  FaTasks,
  FaCheckCircle,
  FaClock,
  FaBookOpen,
  FaRobot,
} from "react-icons/fa";

import StatCard from "../components/StatCard";
import TaskItem from "../components/TaskItem";

function Dashboard() {
  const tasks = useSelector((state) => state.tasks);
  const subjects = useSelector((state) => state.subjects);

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const pendingTasks = tasks.filter(
    (task) => !task.completed
  ).length;

  const totalMinutes = tasks
    .filter((task) => !task.completed)
    .reduce((total, task) => total + Number(task.duration || 0), 0);

  const progress = tasks.length
    ? Math.round((completedTasks / tasks.length) * 100)
    : 0;

  const today = new Date().toLocaleDateString("en-CA");

  const todayTasks = tasks.filter(
    (task) => task.deadline === today
  );

  const displayTasks = todayTasks.length
    ? todayTasks
    : tasks.filter((task) => !task.completed).slice(0, 5);

  return (
    <div>
      <div className="welcome-banner mb-4">
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
          <div>
            <p className="mb-2">YOUR UPSC PREPARATION JOURNEY</p>

            <h2 className="fw-bold">
              Welcome to CivilPrep AI!
            </h2>

            <p className="mb-0">
              Plan your day, complete your goals, and keep moving forward.
            </p>
          </div>

          <Link to="/planner" className="btn btn-light fw-semibold">
            <FaRobot className="me-2" />
            Create Study Plan
          </Link>
        </div>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-12 col-sm-6 col-xl-3">
          <StatCard
            title="Total Tasks"
            value={tasks.length}
            subtitle="All study tasks"
            icon={<FaTasks />}
            color="#4f46e5"
          />
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <StatCard
            title="Completed"
            value={completedTasks}
            subtitle="Tasks completed"
            icon={<FaCheckCircle />}
            color="#16a34a"
          />
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <StatCard
            title="Pending"
            value={pendingTasks}
            subtitle="Tasks remaining"
            icon={<FaClock />}
            color="#ea580c"
          />
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <StatCard
            title="Study Subjects"
            value={subjects.length}
            subtitle="Subjects in your plan"
            icon={<FaBookOpen />}
            color="#0891b2"
          />
        </div>
      </div>

      <div className="row g-4">
        <div className="col-12 col-lg-7">
          <div className="content-card h-100">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="fw-bold mb-0">
                Today's Study Tasks
              </h5>

              <Link to="/tasks" className="small">
                Manage tasks
              </Link>
            </div>

            {displayTasks.length > 0 ? (
              displayTasks.map((task) => (
                <TaskItem key={task.id} task={task} />
              ))
            ) : (
              <div className="empty-state">
                <FaTasks size={30} />

                <p className="mt-3 mb-2">
                  No study tasks yet.
                </p>

                <Link to="/tasks" className="btn btn-primary btn-sm">
                  Create your first task
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className="col-12 col-lg-5">
          <div className="content-card mb-4">
            <h5 className="fw-bold mb-3">
              Overall Progress
            </h5>

            <div className="d-flex justify-content-between mb-2">
              <span className="text-secondary">
                Task completion
              </span>

              <strong>{progress}%</strong>
            </div>

            <div
              className="progress"
              role="progressbar"
              aria-label="Overall task completion"
              aria-valuenow={progress}
              aria-valuemin="0"
              aria-valuemax="100"
            >
              <div
                className="progress-bar"
                style={{ width: `${progress}%` }}
              />
            </div>

            <p className="small text-secondary mt-3 mb-0">
              {completedTasks} of {tasks.length} tasks completed.
            </p>
          </div>

          <div className="content-card mb-4">
            <h5 className="fw-bold mb-3">
              Remaining Study Time
            </h5>

            <h2 className="fw-bold">
              {Math.floor(totalMinutes / 60)}h {totalMinutes % 60}m
            </h2>

            <p className="text-secondary small mb-0">
              Estimated duration of all pending tasks.
            </p>
          </div>

          <div className="content-card">
            <h5 className="fw-bold mb-3">
              Your Subjects
            </h5>

            {subjects.length ? (
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
                  <div key={subject.id} className="mb-3">
                    <div className="d-flex justify-content-between mb-2">
                      <span>{subject.name}</span>
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
                );
              })
            ) : (
              <p className="text-secondary">
                Add subjects to start tracking your preparation.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;