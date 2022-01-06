package com.example.employees.controllers;

import com.example.employees.models.schemas.Product;
import com.example.employees.models.responses.ProductResponse;
import com.example.employees.models.schemas.Supplier;
import com.example.employees.models.responses.SupplierResponse;
import com.example.employees.repository.SupplierRepository;
import com.example.employees.services.implementations.AllImplement;
import com.example.employees.services.implementations.SupplierImplement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/suppliers")
public class SupplierController {

    private final SupplierImplement supplierImplement;
    private final AllImplement<Supplier, SupplierRepository> allImplement;

    @GetMapping("/get/{id}")
    public ResponseEntity<SupplierResponse> getSupplier(@PathVariable("id") UUID id) throws Exception {
        return ResponseEntity.ok(
                SupplierResponse.builder()
                        .timestamp(LocalDateTime.now())
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .message("Fetched supplier")
                        .data(allImplement.get(id,"supplier"))
                        .build()
        );
    }

    @GetMapping("/list")
    public ResponseEntity<SupplierResponse> getSuppliers() throws Exception {
        return ResponseEntity.ok(
                SupplierResponse.builder()
                        .timestamp(LocalDateTime.now())
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .message("Fetched all suppliers")
                        .data(allImplement.list(100,"supplier"))
                        .build()
        );
    }

    @PostMapping("/save")
    public ResponseEntity<SupplierResponse> saveSupplier(@RequestBody Supplier supplier) throws Exception {
        return ResponseEntity.ok(
                SupplierResponse.builder()
                        .timestamp(LocalDateTime.now())
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .message("Saved supplier")
                        .data(supplierImplement.create(supplier))
                        .build()
        );
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<SupplierResponse> updateSupplier(@PathVariable("id") UUID id, @RequestBody Supplier supplier) throws Exception {
        return ResponseEntity.ok(
                SupplierResponse.builder()
                        .timestamp(LocalDateTime.now())
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .message("Updated supplier")
                        .data(supplierImplement.update(id,supplier))
                        .build()
        );
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<SupplierResponse> deleteSupplier(@PathVariable("id") UUID id) throws Exception {
        return ResponseEntity.ok(
                SupplierResponse.builder()
                        .timestamp(LocalDateTime.now())
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .message("Deleted supplier")
                        .boolData(allImplement.delete(id,"supplier"))
                        .build()
        );
    }

    @GetMapping("list/products/{id}")
    public ResponseEntity<ProductResponse> getSupplierProducts(@PathVariable("id") UUID id) throws Exception {
        return ResponseEntity.ok(
                ProductResponse.builder()
                        .timestamp(LocalDateTime.now())
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .message("Products retrieved for supplier")
                        .supplierData(supplierImplement.getProducts(id))
                        .build()
        );
    }

    @PostMapping("create/products/{id}")
    public ResponseEntity<SupplierResponse> createSupplierProduct(@PathVariable("id") UUID id, @RequestBody Product product) throws Exception {
        return ResponseEntity.ok(
                SupplierResponse.builder()
                        .timestamp(LocalDateTime.now())
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .message("Saved product in the supplier")
                        .data(supplierImplement.createProduct(id,product))
                        .build()
        );
    }

    @PutMapping("update/products/{id}")
    public ResponseEntity<SupplierResponse> updateSupplierProduct(@PathVariable("id") UUID id, @RequestBody Product product) throws Exception {
        return ResponseEntity.ok(
                SupplierResponse.builder()
                        .timestamp(LocalDateTime.now())
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .message("Updated product for the supplier")
                        .data(supplierImplement.updateProduct(id,product))
                        .build()
        );
    }
}
