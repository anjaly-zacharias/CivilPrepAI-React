function StatCard({ title, value, subtitle, icon, color }) {
  return (
    <div className="card stat-card h-100">
      <div className="card-body d-flex justify-content-between align-items-start">
        <div>
          <p className="text-secondary mb-2">{title}</p>

          <h3 className="fw-bold mb-2">{value}</h3>

          <small className="text-secondary">{subtitle}</small>
        </div>

        <div
          className="stat-icon"
          style={{
            backgroundColor: `${color}18`,
            color,
          }}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

export default StatCard;