package com.example.employees.services.interfaces;

import com.example.employees.models.schemas.Customer;

import java.util.ArrayList;
import java.util.UUID;

public interface CustomerService {
    ArrayList<Customer> create(Customer customer) throws Exception;
    ArrayList<Customer> update(UUID id, Customer customer) throws Exception;
}
