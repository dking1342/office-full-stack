package com.example.employees.controllers;

import com.example.employees.models.responses.TransactionResponse;
import com.example.employees.models.schemas.Transaction;
import com.example.employees.repository.TransactionRespository;
import com.example.employees.services.implementations.AllImplement;
import com.example.employees.services.implementations.TransactionImplement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/transactions")
public class TransactionController {

    private final TransactionImplement transactionImplement;
    private final AllImplement<Transaction, TransactionRespository> allImplement;

    @GetMapping("/get/{id}")
    public ResponseEntity<TransactionResponse> getTransaction(@PathVariable("id") UUID id) throws Exception {
        return ResponseEntity.ok(
                TransactionResponse.builder()
                        .timestamp(LocalDateTime.now())
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .data(allImplement.get(id,"transaction"))
                        .build()
        );
    }

    @GetMapping("/list")
    public ResponseEntity<TransactionResponse> getTransactions() throws Exception {
        return ResponseEntity.ok(
                TransactionResponse.builder()
                        .timestamp(LocalDateTime.now())
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .data(allImplement.list(100,"transaction"))
                        .build()
        );
    }

    @PostMapping("/save")
    public ResponseEntity<TransactionResponse> saveTransaction(@RequestBody Transaction transaction) throws Exception {
        return ResponseEntity.ok(
                TransactionResponse.builder()
                        .timestamp(LocalDateTime.now())
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .data(transactionImplement.create(transaction))
                        .build()
        );
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<TransactionResponse> updateTransaction(@PathVariable("id") UUID id, @RequestBody Transaction transaction) throws Exception {
        return ResponseEntity.ok(
                TransactionResponse.builder()
                        .timestamp(LocalDateTime.now())
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .data(transactionImplement.update(id,transaction))
                        .build()
        );
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<TransactionResponse> deleteTransaction(@PathVariable("id") UUID id) throws Exception {
        return ResponseEntity.ok(
                TransactionResponse.builder()
                        .timestamp(LocalDateTime.now())
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .boolData(allImplement.delete(id,"transaction"))
                        .build()
        );
    }
}
