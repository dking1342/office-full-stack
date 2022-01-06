package com.example.employees.models.responses;

import com.example.employees.models.schemas.Supplier;
import com.example.employees.models.schemas.Transaction;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import lombok.experimental.SuperBuilder;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;
import java.util.ArrayList;

@Data
@SuperBuilder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class TransactionResponse {
    protected LocalDateTime timestamp;
    protected HttpStatus status;
    protected int statusCode;
    protected String message;
    protected String developerMessage;
    protected ArrayList<Transaction> data;
    protected Boolean boolData;
}
