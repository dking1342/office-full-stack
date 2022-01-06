package com.example.employees.repository;

import com.example.employees.models.schemas.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ProductRepository extends JpaRepository<Product, UUID> {
    Product findByPname(String product_name);
}
