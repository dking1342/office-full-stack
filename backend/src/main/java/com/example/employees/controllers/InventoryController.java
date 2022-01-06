package com.example.employees.controllers;

import com.example.employees.models.schemas.Inventory;
import com.example.employees.models.responses.InventoryResponse;
import com.example.employees.repository.InventoryRepository;
import com.example.employees.services.implementations.AllImplement;
import com.example.employees.services.implementations.InventoryImplement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/inventory")
public class InventoryController {

    private final InventoryImplement inventoryImplement;
    private final AllImplement<Inventory, InventoryRepository> allImplement;

    @GetMapping("/get/{id}")
    public ResponseEntity<InventoryResponse> getInventory(@PathVariable("id") UUID id) throws Exception{
        return ResponseEntity.ok(
                InventoryResponse.builder()
                        .timestamp(LocalDateTime.now())
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .message("fetched inventory")
                        .data(allImplement.get(id,"inventory"))
                        .build()
        );
    }

    @GetMapping("/list")
    public ResponseEntity<InventoryResponse> getInventories() throws Exception {
        return ResponseEntity.ok(
                InventoryResponse.builder()
                        .timestamp(LocalDateTime.now())
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .message("fetched inventories")
                        .data(allImplement.list(100,"inventory"))
                        .build()
        );
    }

    @PostMapping("/save")
    public ResponseEntity<InventoryResponse> saveInventory(@RequestBody Inventory inventory) throws Exception{
        return ResponseEntity.ok(
                InventoryResponse.builder()
                        .timestamp(LocalDateTime.now())
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .message("saved inventory")
                        .data(inventoryImplement.create(inventory))
                        .build()
        );
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<InventoryResponse> updateInventory(@PathVariable("id") UUID id, @RequestBody Inventory inventory) throws Exception {
        return ResponseEntity.ok(
                InventoryResponse.builder()
                        .timestamp(LocalDateTime.now())
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .message("updated inventory")
                        .data(inventoryImplement.update(id,inventory))
                        .build()
        );
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<InventoryResponse> deleteInventory(@PathVariable("id") UUID id) throws Exception{
        return ResponseEntity.ok(
                InventoryResponse.builder()
                        .timestamp(LocalDateTime.now())
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .message("deleted inventory")
                        .boolData(allImplement.delete(id,"inventory"))
                        .build()
        );
    }

}
