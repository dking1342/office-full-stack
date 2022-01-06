package com.example.employees.models.responses;

import com.example.employees.models.schemas.Supplier;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import lombok.experimental.SuperBuilder;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;
import java.util.ArrayList;

@Data
@SuperBuilder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class SupplierResponse {
    protected LocalDateTime timestamp;
    protected HttpStatus status;
    protected int statusCode;
    protected String message;
    protected String developerMessage;
    protected ArrayList<Supplier> data;
    protected Boolean boolData;
}
