package com.example.employees.repository;

import com.example.employees.models.schemas.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface SupplierRepository extends JpaRepository<Supplier, UUID> {
    Supplier findBySname(String supplier_name);
}
