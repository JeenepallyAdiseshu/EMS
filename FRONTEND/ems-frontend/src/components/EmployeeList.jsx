import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ENDPOINTS } from "../config";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios.get(ENDPOINTS.employees)
      .then(res => setEmployees(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleDelete = (id) => {
    axios.delete(ENDPOINTS.employeeById(id))
      .then(() => setEmployees(employees.filter(emp => emp.id !== id)))
      .catch(err => console.error(err));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Employee List</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.firstName}</td>
              <td>{emp.lastName}</td>
              <td>{emp.email}</td>
              <td>
                <Link to={`/edit/${emp.id}`} style={{ marginRight: "10px" }}>
                  Edit
                </Link>
                <button onClick={() => handleDelete(emp.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeList;
