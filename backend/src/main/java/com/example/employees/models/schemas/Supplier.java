package com.example.employees.models.schemas;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;
import java.util.UUID;

import static javax.persistence.CascadeType.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "suppliers")
public class Supplier {
    @Id
    @GeneratedValue
    @Column(name = "supplier_id")
    private UUID supplier_id;
    @Column(name = "sname",nullable = false)
    private String sname;
    @ManyToMany(cascade = PERSIST)
    @JoinColumn(name = "supplier_idProduct")
    private List<Product> products;

}
