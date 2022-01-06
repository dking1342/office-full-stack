package com.example.employees.controllers;


import com.example.employees.models.schemas.Product;
import com.example.employees.models.responses.ProductResponse;
import com.example.employees.repository.ProductRepository;
import com.example.employees.services.implementations.AllImplement;
import com.example.employees.services.implementations.ProductImplement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/products")
public class ProductController {

    private final ProductImplement productImplement;
    private final AllImplement<Product, ProductRepository> allImplement;

    @GetMapping("/get/{id}")
    public ResponseEntity<ProductResponse> getProduct(@PathVariable("id") UUID id) throws Exception {
        return ResponseEntity.ok(
                ProductResponse.builder()
                        .timestamp(LocalDateTime.now())
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .message("Fetched product")
                        .data(allImplement.get(id,"product"))
                        .build()
        );
    }

    @GetMapping("/list")
    public ResponseEntity<ProductResponse> getProducts() throws Exception {
        return ResponseEntity.ok(
                ProductResponse.builder()
                        .timestamp(LocalDateTime.now())
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .message("Fetched all products")
                        .data(allImplement.list(10,"product"))
                        .build()
        );
    }

    @PostMapping("/save")
    public ResponseEntity<ProductResponse> saveProduct(@RequestBody Product product) throws Exception {
        return ResponseEntity.ok(
                ProductResponse.builder()
                        .timestamp(LocalDateTime.now())
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .message("Saved products")
                        .data(productImplement.create(product))
                        .build()
        );
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<ProductResponse> updateProduct(@PathVariable("id") UUID id, @RequestBody Product product) throws Exception {
        return ResponseEntity.ok(
                ProductResponse.builder()
                        .timestamp(LocalDateTime.now())
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .message("Updated product")
                        .data(productImplement.update(id,product))
                        .build()
        );
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<ProductResponse> deleteProduct(@PathVariable("id") UUID id) throws Exception {
        return ResponseEntity.ok(
                ProductResponse.builder()
                        .timestamp(LocalDateTime.now())
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .message("Deleted product")
                        .boolData(allImplement.delete(id,"product"))
                        .build()
        );
    }
}
