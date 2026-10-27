import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";

import { saveSchedule } from "../features/planner/plannerSlice";

function AIPlanner() {
  const dispatch = useDispatch();

  const subjects = useSelector((state) => state.subjects);

  const schedules = useSelector(
    (state) => state.planner.schedules
  );

  const [goal, setGoal] = useState("UPSC CSE Prelims revision");
  const [hours, setHours] = useState(5);
  const [days, setDays] = useState(30);
  const [selectedSubjects, setSelectedSubjects] = useState([]);

  const [generatedPlan, setGeneratedPlan] = useState(null);

  function toggleSubject(id) {
    setSelectedSubjects((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  }

  function generateSchedule(event) {
    event.preventDefault();

    if (selectedSubjects.length === 0) {
      alert("Please select at least one subject.");
      return;
    }

    const subjectList = subjects.filter((subject) =>
      selectedSubjects.includes(subject.id)
    );

    const totalMinutes = Number(hours) * 60;

    // Reserve 20% of study time for revision and practice.
    const revisionMinutes = Math.round(totalMinutes * 0.2);

    const subjectMinutes = totalMinutes - revisionMinutes;

    const baseMinutes = Math.floor(
      subjectMinutes / subjectList.length
    );

    const extraMinutes =
      subjectMinutes % subjectList.length;

    const dailySessions = subjectList.map(
      (subject, index) => ({
        subjectId: subject.id,
        subject: subject.name,
        minutes: baseMinutes + (index < extraMinutes ? 1 : 0),
      })
    );

    dailySessions.push({
      subjectId: "revision",
      subject: "Revision and Practice Questions",
      minutes: revisionMinutes,
    });

    const plan = {
      id: nanoid(),
      goal: goal.trim() || "UPSC preparation",
      hours: Number(hours),
      days: Number(days),
      subjects: subjectList.map((subject) => ({
        id: subject.id,
        name: subject.name,
      })),
      dailySessions,
      createdAt: new Date().toISOString(),
    };

    setGeneratedPlan(plan);
  }

  function handleSavePlan() {
    if (!generatedPlan) return;

    dispatch(saveSchedule(generatedPlan));

    alert("Your study schedule has been saved.");
  }

  function formatDuration(minutes) {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;

    if (h && m) return `${h}h ${m}m`;
    if (h) return `${h}h`;

    return `${m} minutes`;
  }

  return (
    <div>
      <div className="page-heading mb-4">
        <h2>AI Study Planner</h2>

        <p>
          Create a personalised study plan for your UPSC preparation.
        </p>
      </div>

      <div className="content-card mb-4">
        <h5 className="fw-bold mb-3">
          Tell us about your study goals
        </h5>

        <form onSubmit={generateSchedule}>
          <div className="mb-3">
            <label className="form-label">
              Preparation Goal
            </label>

            <input
              className="form-control"
              value={goal}
              onChange={(event) => setGoal(event.target.value)}
              placeholder="e.g. Revise the UPSC syllabus"
            />
          </div>

          <div className="row g-3 mb-3">
            <div className="col-12 col-md-6">
              <label className="form-label">
                Available Study Hours Per Day
              </label>

              <input
                className="form-control"
                type="number"
                min="1"
                max="16"
                value={hours}
                onChange={(event) =>
                  setHours(event.target.value)
                }
                required
              />
            </div>

            <div className="col-12 col-md-6">
              <label className="form-label">
                Preparation Period (Days)
              </label>

              <input
                className="form-control"
                type="number"
                min="1"
                max="365"
                value={days}
                onChange={(event) =>
                  setDays(event.target.value)
                }
                required
              />
            </div>
          </div>

          <label className="form-label fw-semibold">
            Select Your Subjects
          </label>

          <div className="row g-2 mb-4">
            {subjects.map((subject) => (
              <div
                className="col-12 col-sm-6 col-lg-4"
                key={subject.id}
              >
                <label className="subject-option w-100">
                  <input
                    type="checkbox"
                    className="form-check-input me-2"
                    checked={selectedSubjects.includes(subject.id)}
                    onChange={() => toggleSubject(subject.id)}
                  />

                  {subject.name}
                </label>
              </div>
            ))}
          </div>

          <button className="btn btn-primary" type="submit">
            Generate Study Schedule
          </button>
        </form>
      </div>

      {generatedPlan && (
        <div className="content-card mb-4">
          <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-3">
            <div>
              <h4 className="fw-bold">
                Your Suggested Study Schedule
              </h4>

              <p className="text-secondary mb-0">
                Goal: {generatedPlan.goal}
              </p>
            </div>

            <button
              className="btn btn-success"
              onClick={handleSavePlan}
            >
              Save Schedule
            </button>
          </div>

          <div className="alert alert-info">
            <strong>
              {generatedPlan.hours} hours daily ·{" "}
              {generatedPlan.days} days
            </strong>

            <p className="mb-0 mt-1">
              This is a rule-based suggested schedule. It is not
              AI-generated yet.
            </p>
          </div>

          <h6 className="fw-bold mt-4">
            Suggested Daily Allocation
          </h6>

          <div className="table-responsive">
            <table className="table align-middle">
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Suggested Duration</th>
                </tr>
              </thead>

              <tbody>
                {generatedPlan.dailySessions.map((session) => (
                  <tr key={session.subjectId}>
                    <td>{session.subject}</td>
                    <td>{formatDuration(session.minutes)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="small text-secondary">
            The same daily allocation is suggested for each day.
            Adjust it according to your syllabus, difficulty level,
            revision needs, and mock-test performance.
          </p>
        </div>
      )}

      <div className="content-card">
        <h5 className="fw-bold mb-3">Saved Study Schedules</h5>

        {schedules.length === 0 ? (
          <p className="text-secondary mb-0">
            Your saved schedules will appear here.
          </p>
        ) : (
          schedules.map((schedule) => (
            <div className="task-item" key={schedule.id}>
              <div className="d-flex justify-content-between gap-3">
                <div>
                  <h6 className="fw-semibold">
                    {schedule.goal}
                  </h6>

                  <small className="text-secondary">
                    {schedule.hours} hours/day · {schedule.days} days
                  </small>

                  <p className="small text-secondary mb-0 mt-1">
                    {schedule.subjects
                      .map((subject) => subject.name)
                      .join(", ")}
                  </p>
                </div>

                <button
                  className="btn btn-sm btn-outline-primary align-self-start"
                  onClick={() => setGeneratedPlan(schedule)}
                >
                  View
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AIPlanner;