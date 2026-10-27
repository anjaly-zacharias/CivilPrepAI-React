import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="content-card text-center py-5">
      <h1 className="display-4 fw-bold">404</h1>

      <h4>Page Not Found</h4>

      <p className="text-secondary">
        The page you are looking for does not exist.
      </p>

      <Link to="/" className="btn btn-primary">
        Back to Dashboard
      </Link>
    </div>
  );
}

export default NotFound;