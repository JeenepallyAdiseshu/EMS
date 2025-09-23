export const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:2030/SpringBootEmployeManagement';
export const ENDPOINTS = {
  employees: `${BASE_URL}/employees`,
  employeeById: (id) => `${BASE_URL}/employees/${id}`,
};
