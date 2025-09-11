import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ENDPOINTS } from "../config";

function EmployeeForm() {
  const [employee, setEmployee] = useState({ firstName: "", lastName: "", email: "" });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axios.get(ENDPOINTS.employeeById(id))
        .then(res => setEmployee(res.data))
        .catch(err => console.error(err));
    }
  }, [id]);

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      axios.put(ENDPOINTS.employeeById(id), employee)
        .then(() => navigate("/"))
        .catch(err => console.error(err));
    } else {
      axios.post(ENDPOINTS.employees, employee)
        .then(() => navigate("/"))
        .catch(err => console.error(err));
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>{id ? "Edit Employee" : "Add Employee"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name: </label>
          <input 
            type="text" 
            name="firstName" 
            value={employee.firstName} 
            onChange={handleChange} 
            required />
        </div>
        <div>
          <label>Last Name: </label>
          <input 
            type="text" 
            name="lastName" 
            value={employee.lastName} 
            onChange={handleChange} 
            required />
        </div>
        <div>
          <label>Email: </label>
          <input 
            type="email" 
            name="email" 
            value={employee.email} 
            onChange={handleChange} 
            required />
        </div>
        <button type="submit">{id ? "Update" : "Save"}</button>
      </form>
    </div>
  );
}

export default EmployeeForm;
