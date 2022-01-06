package com.example.employees.models.schemas;

import lombok.*;

import javax.persistence.*;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "inventory")
public class Inventory {
    @Id
    @GeneratedValue
    private UUID inventory_id;
    @OneToOne(fetch = FetchType.EAGER,cascade = CascadeType.ALL)
    @JoinColumn(name = "product_id",referencedColumnName = "product_id")
    private Product product;
    @Column(name = "quantity",nullable = false,columnDefinition = "INT NOT NULL DEFAULT 0")
    private int quantity = 0;
}
