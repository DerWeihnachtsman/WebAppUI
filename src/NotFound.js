import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="not-found">
      <h2>Not found</h2>
      <p>That page cannot be found!</p>
      <Link to="/">Homepage</Link>
    </div>
  );
};

export default NotFound;
