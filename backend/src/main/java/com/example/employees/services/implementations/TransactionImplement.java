package com.example.employees.services.implementations;

import com.example.employees.models.schemas.*;
import com.example.employees.repository.*;
import com.example.employees.services.interfaces.TransactionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
@Slf4j
public class TransactionImplement implements TransactionService {

    private final EmployeeRepository employeeRepository;
    private final InventoryRepository inventoryRepository;
    private final InventoryImplement inventoryImplement;
    private final TransactionRespository transactionRespository;


    @Override
    public ArrayList<Transaction> create(Transaction transaction) throws Exception {
        log.info("Saving transaction");

        Optional<Employee> optionalEmployee = employeeRepository.findById(transaction.getEmployee().getId());

        if(optionalEmployee.isPresent()){
            int transaction_quantity = 0;

            // check transaction type
            if(transaction.getTransactionType().toString().equals("BUY")){
                transaction_quantity = transaction.getTransaction_quantity();
            } else if(transaction.getTransactionType().toString().equals("SELL")){
                transaction_quantity = transaction.getTransaction_quantity() * -1;
            } else {
                throw new Exception("invalid transaction type");
            }

            // save inventory
            List<Inventory> list = inventoryRepository
                    .findAll()
                    .stream()
                    .filter(inventory -> inventory.getProduct().getProduct_id().equals(transaction.getProduct().getProduct_id()))
                    .collect(Collectors.toList());

            UUID inv_id = list.get(0).getInventory_id();
            Inventory updatedInventory = new Inventory(
                    inv_id,
                    list.get(0).getProduct(),
                    list.get(0).getQuantity() + transaction_quantity
            );
            inventoryImplement.update(inv_id,updatedInventory);

            // save transaction
            Transaction newTransaction = new Transaction(
                    UUID.randomUUID(),
                    transaction.getEmployee(),
                    transaction.getSupplier(),
                    transaction.getProduct(),
                    transaction.getCustomer(),
                    transaction.getTransactionType(),
                    transaction.getTransaction_quantity()
            );
            Transaction savedTransaction = transactionRespository.save(newTransaction);
            ArrayList<Transaction> responseTransaction = new ArrayList<>();
            responseTransaction.add(savedTransaction);
            return responseTransaction;
        } else {
            throw new Exception("error when making transaction");
        }
    }

    @Override
    public ArrayList<Transaction> update(UUID id, Transaction transaction) throws Exception {
        log.info("Updating transaction");
        Optional<Transaction> optionalTransaction = transactionRespository.findById(id);

        if(optionalTransaction.isPresent()){
            int transaction_quantity = 0;
            int previous_quantity = optionalTransaction.get().getTransaction_quantity();
            int updated_quantity = transaction.getTransaction_quantity();

            // check transaction type
            if(transaction.getTransactionType().toString().equals("BUY")){
                transaction_quantity = updated_quantity - previous_quantity;
            } else if(transaction.getTransactionType().toString().equals("SELL")){
                int delta = updated_quantity - previous_quantity;
                transaction_quantity = delta * -1;
            } else {
                throw new Exception("invalid transaction type");
            }

            // save inventory
            List<Inventory> list = inventoryRepository
                    .findAll()
                    .stream()
                    .filter(inventory -> inventory.getProduct().getProduct_id().equals(transaction.getProduct().getProduct_id()))
                    .collect(Collectors.toList());

            UUID inv_id = list.get(0).getInventory_id();
            Inventory updatedInventory = new Inventory(
                    inv_id,
                    list.get(0).getProduct(),
                    list.get(0).getQuantity() + transaction_quantity
            );
            inventoryImplement.update(inv_id,updatedInventory);

            // save transaction
            Transaction newTransaction = new Transaction(
                    transaction.getTransaction_id(),
                    transaction.getEmployee(),
                    transaction.getSupplier(),
                    transaction.getProduct(),
                    transaction.getCustomer(),
                    transaction.getTransactionType(),
                    transaction.getTransaction_quantity()
            );
            Transaction savedTransaction = transactionRespository.save(newTransaction);
            ArrayList<Transaction> responseTransaction = new ArrayList<>();
            responseTransaction.add(savedTransaction);
            return responseTransaction;
        } else {
            throw new Exception("error when updating transaction");
        }
    }
}
