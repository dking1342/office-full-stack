package com.example.employees.repository;

import com.example.employees.models.schemas.Inventory;
import com.example.employees.models.schemas.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface InventoryRepository extends JpaRepository<Inventory, UUID> {

}
