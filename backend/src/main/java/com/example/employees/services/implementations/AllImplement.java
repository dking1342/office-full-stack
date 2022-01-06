package com.example.employees.services.implementations;


import com.example.employees.repository.*;
import com.example.employees.services.interfaces.AllServices;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.*;

@RequiredArgsConstructor
@Service
@Slf4j
public class AllImplement<ListType,RepoType> implements AllServices<ListType,RepoType> {

    private final BranchRepository branchRepository;
    private final EmployeeRepository employeeRepository;
    private final CustomerRepository customerRepository;
    private final ProductRepository productRepository;
    private final SupplierRepository supplierRepository;
    private final InventoryRepository inventoryRepository;
    private final TransactionRespository transactionRespository;

    @Override
    public ArrayList<ListType> get(UUID id,String repo) throws Exception {
        log.info("Fetching id: {}", id);

        switch(repo){
            case "branch":
                Optional<ListType> fetchedBranch = (Optional<ListType>) branchRepository.findById(id);
                return validationGet(fetchedBranch.isPresent(), fetchedBranch.get());
            case "employee":
                Optional<ListType> fetchedEmployee = (Optional<ListType>) employeeRepository.findById(id);
                return validationGet(fetchedEmployee.isPresent(), fetchedEmployee.get());
            case "customer":
                Optional<ListType> fetchedCustomer = (Optional<ListType>) customerRepository.findById(id);
                return validationGet(fetchedCustomer.isPresent(), fetchedCustomer.get());
            case "product":
                Optional<ListType> fetchedProduct = (Optional<ListType>) productRepository.findById(id);
                return validationGet(fetchedProduct.isPresent(), fetchedProduct.get());
            case "supplier":
                Optional<ListType> fetchedSupplier = (Optional<ListType>) supplierRepository.findById(id);
                return validationGet(fetchedSupplier.isPresent(), fetchedSupplier.get());
            case "inventory":
                Optional<ListType> fetchedInventory = (Optional<ListType>) inventoryRepository.findById(id);
                return validationGet(fetchedInventory.isPresent(), fetchedInventory.get());
            case "transaction":
                Optional<ListType> fetchedTransaction = (Optional<ListType>) transactionRespository.findById(id);
                return validationGet(fetchedTransaction.isPresent(), fetchedTransaction.get());
            default:
                throw new Exception("error when fetching item");
        }
    }

    @Override
    public ArrayList<ListType> list(int limit, String repo) throws Exception {
        log.info("Fetching all items");

        switch (repo){
            case "branch":
                ArrayList<ListType> fetchedItems = (ArrayList<ListType>) branchRepository.findAll();
                return validationList((ListType) fetchedItems);
            case "employee":
                ArrayList<ListType> fetchedEmployees = (ArrayList<ListType>) employeeRepository.findAll();
                return validationList((ListType) fetchedEmployees);
            case "customer":
                ArrayList<ListType> fetchedCustomers = (ArrayList<ListType>) customerRepository.findAll();
                return validationList((ListType) fetchedCustomers);
            case "product":
                ArrayList<ListType> fetchedProducts = (ArrayList<ListType>) productRepository.findAll();
                return validationList((ListType) fetchedProducts);
            case "supplier":
                ArrayList<ListType> fetchedSuppliers = (ArrayList<ListType>) supplierRepository.findAll();
                return validationList((ListType) fetchedSuppliers);
            case "inventory":
                ArrayList<ListType> fetchedInventory = (ArrayList<ListType>) inventoryRepository.findAll();
                return validationList((ListType) fetchedInventory);
            case "transaction":
                ArrayList<ListType> fetchedTransactions = (ArrayList<ListType>) transactionRespository.findAll();
                return validationList((ListType)  fetchedTransactions);
            default:
                throw new Exception("error when fetching items");
        }
    }

    @Override
    public Boolean delete(UUID id, String repo) throws Exception {
        log.info("Deleting item {}",id);

        switch (repo){
            case "employee":
                employeeRepository.deleteById(id);
                return true;
            case "customer":
                customerRepository.deleteById(id);
                return true;
            case "product":

                productRepository.deleteById(id);
                return true;
            case "supplier":
                supplierRepository.deleteById(id);
                return true;
            case "inventory":
                inventoryRepository.deleteById(id);
                return true;
            case "transaction":
                transactionRespository.deleteById(id);
                return true;
            default:
                throw new Exception("error when deleting item");
        }
    }


    public ArrayList<ListType> validationGet(Boolean isPresent, ListType item) throws Exception {
        if(!isPresent){
            throw new Exception("error when fetching item");
        } else {
            ArrayList<ListType> responseItem = new ArrayList<>();
            responseItem.add(item);
            return responseItem;
        }
    }

    public ArrayList<ListType> validationList(ListType item){
        ArrayList<ListType> responseItems = new ArrayList<>();
        responseItems.add(item);
        return responseItems;
    }
}
