import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EmployeeForm() {
  const [employee, setEmployee] = useState({ name: "", role: "" });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8080/api/employees/${id}`)
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
      axios.put(`http://localhost:8080/api/employees/${id}`, employee)
        .then(() => navigate("/"))
        .catch(err => console.error(err));
    } else {
      axios.post("http://localhost:8080/api/employees", employee)
        .then(() => navigate("/"))
        .catch(err => console.error(err));
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>{id ? "Edit Employee" : "Add Employee"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input 
            type="text" 
            name="name" 
            value={employee.name} 
            onChange={handleChange} 
            required />
        </div>
        <div>
          <label>Role: </label>
          <input 
            type="text" 
            name="role" 
            value={employee.role} 
            onChange={handleChange} 
            required />
        </div>
        <button type="submit">{id ? "Update" : "Save"}</button>
      </form>
    </div>
  );
}

export default EmployeeForm;
