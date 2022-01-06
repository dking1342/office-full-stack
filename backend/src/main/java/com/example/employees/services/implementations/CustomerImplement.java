package com.example.employees.services.implementations;

import com.example.employees.models.schemas.Customer;
import com.example.employees.repository.CustomerRepository;
import com.example.employees.services.interfaces.CustomerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;
import java.util.UUID;

@RequiredArgsConstructor
@Service
@Slf4j
public class CustomerImplement implements CustomerService {

    private final CustomerRepository customerRepository;

    @Override
    public ArrayList<Customer> create(Customer customer) throws Exception {
        log.info("Saving customer");
        Optional<Customer> optionalCustomer = Optional.ofNullable(customerRepository.findByCname(customer.getCname().toUpperCase()));

        if(optionalCustomer.isPresent()){
            throw new Exception("Customer already exists");
        } else {
            if(customer.getCname().isEmpty()){
                throw new Exception("customer name is invalid");
            }

            Customer newCustomer = new Customer(
                    UUID.randomUUID(),
                    customer.getCname()
            );
            Customer savedCustomer = customerRepository.save(newCustomer);
            ArrayList<Customer> responseCustomer = new ArrayList<>();
            responseCustomer.add(savedCustomer);
            return responseCustomer;
        }
    }

    @Override
    public ArrayList<Customer> update(UUID id, Customer customer) throws Exception {
        log.info("Updating customer: {}", id);

        Optional<Customer> optionalCustomerId = customerRepository.findById(id);

        if(optionalCustomerId.isPresent()){
            if(customer.getCname().isEmpty()){
                throw new Exception("customer name is invalid");
            }

            Customer updatedCustomer = new Customer(
                    id,
                    customer.getCname()
            );
            Customer savedCustomer = customerRepository.save(updatedCustomer);
            ArrayList<Customer> responseCustomer = new ArrayList<>();
            responseCustomer.add(savedCustomer);
            return responseCustomer;
        } else {
            throw new Exception("Error when updating customer");
        }
    }
}
