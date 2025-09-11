import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ padding: "10px", background: "#282c34" }}>
      <Link to="/" style={{ color: "white", marginRight: "20px" }}>
        Employees
      </Link>
      <Link to="/add" style={{ color: "white" }}>
        Add Employee
      </Link>
    </nav>
  );
}

export default Navbar;
