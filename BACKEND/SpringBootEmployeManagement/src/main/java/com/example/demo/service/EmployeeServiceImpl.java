package com.example.demo.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.entity.Employee;
import com.example.demo.repository.EmployeeRepository;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    @Autowired
    private EmployeeRepository repository;

    @Override
    public Employee saveEmployee(Employee employee) {
        return repository.save(employee);
    }

    @Override
    public List<Employee> getAllEmployees() {
        return repository.findAll();
    }

    @Override
    public Employee getEmployeeById(Long id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public Employee updateEmployee(Long id, Employee updatedEmployee) {
        return repository.findById(id)
            .map(emp -> {
                emp.setFirstName(updatedEmployee.getFirstName());
                emp.setLastName(updatedEmployee.getLastName());
                emp.setEmail(updatedEmployee.getEmail());
                return repository.save(emp);
            })
            .orElse(null); // Correct usage
    }

    @Override
    public void deleteEmployee(Long id) {
        repository.deleteById(id);
    }
}
