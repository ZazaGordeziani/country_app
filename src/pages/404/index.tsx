import { NavLink } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div style={{ color: "red", fontSize: 40 }}>
      404
      <NavLink to="/">Return Back to Home</NavLink>
    </div>
  );
};

export default PageNotFound;
