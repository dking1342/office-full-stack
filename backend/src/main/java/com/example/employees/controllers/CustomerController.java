package com.example.employees.controllers;

import com.example.employees.models.schemas.Customer;
import com.example.employees.models.responses.CustomerResponse;
import com.example.employees.repository.CustomerRepository;
import com.example.employees.services.implementations.AllImplement;
import com.example.employees.services.implementations.CustomerImplement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/customers")
public class CustomerController {

    private final CustomerImplement customerImplement;
    private final AllImplement<Customer, CustomerRepository> allImplement;

    @GetMapping("/get/{id}")
    public ResponseEntity<CustomerResponse> getCustomer(@PathVariable("id") UUID id) throws Exception {
        return ResponseEntity.ok(
                CustomerResponse.builder()
                        .timestamp(LocalDateTime.now())
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .message("Fetched customer")
                        .data(allImplement.get(id,"customer"))
                        .build()
        );
    }

    @GetMapping("/list")
    public ResponseEntity<CustomerResponse> getCustomers() throws Exception {
        return ResponseEntity.ok(
                CustomerResponse.builder()
                        .timestamp(LocalDateTime.now())
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .message("Fetched all customers")
                        .data(allImplement.list(10,"customer"))
                        .build()
        );
    }

    @PostMapping("/save")
    public ResponseEntity<CustomerResponse> saveCustomer(@RequestBody Customer customer) throws Exception {
        return ResponseEntity.ok(
                CustomerResponse.builder()
                        .timestamp(LocalDateTime.now())
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .message("Saved customer")
                        .data(customerImplement.create(customer))
                        .build()
        );
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<CustomerResponse> updateCustomer(@PathVariable("id") UUID id, @RequestBody Customer customer) throws Exception {
        return ResponseEntity.ok(
                CustomerResponse.builder()
                        .timestamp(LocalDateTime.now())
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .message("Updated customer")
                        .data(customerImplement.update(id,customer))
                        .build()
        );
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<CustomerResponse> deleteCustomer(@PathVariable("id") UUID id) throws Exception {
        return ResponseEntity.ok(
                CustomerResponse.builder()
                        .timestamp(LocalDateTime.now())
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .message("Deleted customer")
                        .boolData(allImplement.delete(id,"customer"))
                        .build()
        );
    }

}
