package com.example.employees.models.responses;


import com.example.employees.models.schemas.Product;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import lombok.experimental.SuperBuilder;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@SuperBuilder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ProductResponse {
    protected LocalDateTime timestamp;
    protected HttpStatus status;
    protected int statusCode;
    protected String message;
    protected String developerMessage;
    protected ArrayList<Product> data;
    protected Boolean boolData;
    protected List<Product> supplierData;
}
