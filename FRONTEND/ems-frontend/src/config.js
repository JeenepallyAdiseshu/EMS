export const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export const ENDPOINTS = {
  employees: `${BASE_URL}/api/employees`,
  employeeById: (id) => `${BASE_URL}/api/employees/${id}`,
};
