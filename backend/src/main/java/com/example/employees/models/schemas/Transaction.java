package com.example.employees.models.schemas;

import com.example.employees.enums.TransactionType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "transactions")
public class Transaction {
    @Id
    @GeneratedValue
    private UUID transaction_id;
    @OneToOne(cascade = CascadeType.PERSIST,fetch = FetchType.EAGER)
    @JoinColumn(name = "employee")
    private Employee employee;
//    @Column(name = "employee_id")
//    private UUID employee_id;
    @OneToOne(cascade = CascadeType.PERSIST,fetch = FetchType.EAGER)
    @JoinColumn(name = "supplier")
    private Supplier supplier;
//    @Column(name = "supplier_id")
//    private UUID supplier_id;
    @OneToOne(cascade = CascadeType.PERSIST,fetch = FetchType.EAGER)
    @JoinColumn(name = "product")
    private Product product;
//    @Column(name = "product_id")
//    private UUID product_id;
    @OneToOne(cascade = CascadeType.PERSIST,fetch = FetchType.EAGER)
    @JoinColumn(name = "customer")
    private Customer customer;
//    @Column(name = "customer_id")
//    private UUID customer_id;
    @Column(name = "type",nullable = false)
    private TransactionType transactionType;
    @Column(name = "transaction_quantity",nullable = false)
    private int transaction_quantity;
}
