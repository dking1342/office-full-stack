package com.example.employees.services.interfaces;

import com.example.employees.models.schemas.Transaction;

import java.util.ArrayList;
import java.util.UUID;

public interface TransactionService {
    ArrayList<Transaction> create(Transaction transaction) throws Exception;
    ArrayList<Transaction> update(UUID id, Transaction transaction) throws Exception;
}
