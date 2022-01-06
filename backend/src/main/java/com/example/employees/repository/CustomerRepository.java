package com.example.employees.repository;

import com.example.employees.models.schemas.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface CustomerRepository extends JpaRepository<Customer, UUID> {
    Customer findByCname(String customer_name);
}
