package com.example.employees.services.interfaces;

import com.example.employees.models.schemas.Employee;

import java.util.ArrayList;
import java.util.UUID;

public interface EmployeeService {
    ArrayList<Employee> create(Employee employee) throws Exception;
    ArrayList<Employee> update(UUID id, Employee employee) throws Exception;
}
