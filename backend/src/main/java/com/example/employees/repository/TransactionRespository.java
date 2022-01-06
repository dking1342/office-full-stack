package com.example.employees.repository;

import com.example.employees.models.schemas.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface TransactionRespository extends JpaRepository<Transaction, UUID> {
}
