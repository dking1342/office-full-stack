package com.example.employees.controllers;

import com.example.employees.models.schemas.Employee;
import com.example.employees.models.responses.Response;
import com.example.employees.repository.EmployeeRepository;
import com.example.employees.services.implementations.AllImplement;
import com.example.employees.services.implementations.EmployeeImplement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/employees")
public class EmployeeController {

    private final EmployeeImplement employeeImplement;
    private final AllImplement<Employee, EmployeeRepository> allImplement;

    @GetMapping("/get/{id}")
    public ResponseEntity<Response> getEmployee(@PathVariable("id") UUID id) throws Exception {
        return ResponseEntity.ok(
          Response.builder()
                  .timestamp(LocalDateTime.now())
                  .status(HttpStatus.OK)
                  .statusCode(HttpStatus.OK.value())
                  .message("Employee retrieved")
                  .employeeData(allImplement.get(id,"employee"))
                  .build()
        );
    }

    @GetMapping("/list")
    public ResponseEntity<Response> getEmployees() throws Exception {
        return ResponseEntity.ok(
                Response.builder()
                        .timestamp(LocalDateTime.now())
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .message("Employees retrieved")
                        .employeeData(allImplement.list(10,"employee"))
                        .build()
        );
    }

    @PostMapping("/save")
    public ResponseEntity<Response> saveEmployee(@RequestBody Employee employee) throws Exception {
        return ResponseEntity.ok(
                Response.builder()
                        .timestamp(LocalDateTime.now())
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .message("Employee saved")
                        .employeeData(employeeImplement.create(employee))
                        .build()
        );
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Response> updateEmployee(@PathVariable("id") UUID id, @RequestBody Employee employee) throws Exception {
        return ResponseEntity.ok(
                Response.builder()
                        .timestamp(LocalDateTime.now())
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .message("Employee updated")
                        .employeeData(employeeImplement.update(id,employee))
                        .build()
        );
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Response> deleteEmployee(@PathVariable("id") UUID id) throws Exception {
        return ResponseEntity.ok(
                Response.builder()
                        .timestamp(LocalDateTime.now())
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .message("Employee deleted")
                        .employeeBoolData(allImplement.delete(id,"employee"))
                        .build()
        );
    };
}
