import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: ""
  });
  const [editing, setEditing] = useState(false);

  // Fetch employees from backend
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/employees");
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
      setEmployees([]);
    }
  };

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add or Update Employee
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        // Update employee
        await axios.put(
          `http://localhost:8080/api/employees/${formData.id}`,
          formData
        );
        setEditing(false);
      } else {
        // Add employee: remove 'id' before sending
        const { id, ...newEmployee } = formData;
        await axios.post("http://localhost:8080/api/employees", newEmployee);
      }

      setFormData({ id: "", firstName: "", lastName: "", email: "" });
      fetchEmployees();
    } catch (error) {
      console.error("Error saving employee:", error);
    }
  };

  // Edit Employee
  const handleEdit = (emp) => {
    setFormData(emp);
    setEditing(true);
  };

  // Delete Employee
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/employees/${id}`);
      fetchEmployees();
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  return (
    <div className="app-container">
      <h1>Employee Management</h1>

      {/* Employee Form */}
      <form onSubmit={handleSubmit} className="employee-form">
        {/* Show ID only when editing */}
        {editing && (
          <input
            type="number"
            name="id"
            placeholder="ID"
            value={formData.id}
            onChange={handleChange}
            required
          />
        )}

        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <button type="submit">{editing ? "Update" : "Add"} Employee</button>
      </form>

      {/* Employee Table */}
      <table className="employee-table">
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
          {employees.length > 0 ? (
            employees.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.id}</td>
                <td>{emp.firstName}</td>
                <td>{emp.lastName}</td>
                <td>{emp.email}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(emp)}>
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(emp.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                No employees found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
