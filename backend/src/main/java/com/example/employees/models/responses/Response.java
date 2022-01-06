package com.example.employees.models.responses;

import com.example.employees.models.schemas.Branch;
import com.example.employees.models.schemas.Employee;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import lombok.experimental.SuperBuilder;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;
import java.util.ArrayList;

@Data
@SuperBuilder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Response {
    protected LocalDateTime timestamp;
    protected HttpStatus status;
    protected int statusCode;
    protected String message;
    protected String developerMessage;
    protected ArrayList<Employee> employeeData;
    protected Boolean employeeBoolData;
    protected ArrayList<Branch> branchData;
    protected Boolean branchBoolData;
}
