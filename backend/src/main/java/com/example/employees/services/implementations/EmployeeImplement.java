package com.example.employees.services.implementations;

import com.example.employees.models.schemas.Branch;
import com.example.employees.models.schemas.Employee;
import com.example.employees.repository.BranchRepository;
import com.example.employees.repository.EmployeeRepository;
import com.example.employees.services.interfaces.EmployeeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.*;

@RequiredArgsConstructor
@Service
@Slf4j
public class EmployeeImplement implements EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final BranchRepository branchRepository;

    @Override
    public ArrayList<Employee> create(Employee employee) throws Exception {
        log.info("Saving employee: {}", employee.getFirstName());
        if(employee.getFirstName().isEmpty()){
            throw new Exception("first name not valid");
        }
        if(employee.getLastName().isEmpty()){
            throw new Exception("last name not valid");
        }

        Optional<Branch> branchFetch = branchRepository.findById(employee.getBranch().getBranch_id());

        if(branchFetch.isPresent()){
            employee.setId(UUID.randomUUID());
            employee.setBranch(branchFetch.get());
            Employee savedEmployee = employeeRepository.save(employee);
            ArrayList<Employee> responseEmployee = new ArrayList<>();
            responseEmployee.add(savedEmployee);
            return responseEmployee;
        } else {
            throw new Exception("branch invalid");
        }
    }

    @Override
    public ArrayList<Employee> update(UUID id, Employee employee) throws Exception {
        log.info("Updating employee id: {}", id);
        Optional<Employee> fetchEmployee = employeeRepository.findById(id);

        if (fetchEmployee.isPresent()) {
            if(employee.getFirstName().isEmpty()){
                throw new Exception("first name is invalid");
            }
            if(employee.getLastName().isEmpty()){
                throw new Exception("last name is invalid");
            }
            Optional<Branch> fetchBranch = branchRepository.findById(employee.getBranch().getBranch_id());
            if(!fetchBranch.isPresent()){
                throw new Exception("branch is invalid");
            }

            Employee updatedEmployee = new Employee(
                    id,
                    employee.getFirstName(),
                    employee.getLastName(),
                    employee.getRole(),
                    fetchBranch.get()
            );
            Employee savedEmployee = employeeRepository.save(updatedEmployee);
            ArrayList<Employee> responseEmployee = new ArrayList<>();
            responseEmployee.add(savedEmployee);
            return responseEmployee;
        } else {
            throw new Exception("no user found");
        }
    }
}
