package com.example.demo.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.example.demo.entity.Employee;
import com.example.demo.service.EmployeeService;

@RestController
@RequestMapping("/employees")
@CrossOrigin(origins = "*")
public class EmployeeController {

    private final EmployeeService service;

    public EmployeeController(EmployeeService service) {
        this.service = service;
    }

    // Create
    @PostMapping
    public Employee createEmployee(@RequestBody Employee employee) {
        return service.saveEmployee(employee);
    }

    // Read all
    @GetMapping
    public List<Employee> getAllEmployees() {
        return service.getAllEmployees();
    }

    // Read by ID
    @GetMapping("/{id}")
    public Employee getEmployeeById(@PathVariable Long id) {
        return service.getEmployeeById(id);
    }

    // Update by employeeId
    @PutMapping("/{id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable Long id,
                                                   @RequestBody Employee updatedEmployee) {
        Employee emp = service.updateEmployee(id, updatedEmployee);
        if(emp != null) {
            return ResponseEntity.ok(emp);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
    // Delete by database id
    @DeleteMapping("/{id}")
    public String deleteEmployee(@PathVariable Long id) {
        service.deleteEmployee(id);
        return "Employee with ID " + id + " deleted successfully.";
    }
}
