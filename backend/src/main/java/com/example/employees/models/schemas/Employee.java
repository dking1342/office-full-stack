package com.example.employees.models.schemas;

import com.example.employees.enums.EmployeeRoles;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import java.util.UUID;

import static javax.persistence.FetchType.EAGER;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "employees")
public class Employee {
    @Id
    @GeneratedValue
    @Column(name = "id",nullable = true,unique = true)
    private UUID id;
    @Column(name = "firstName",nullable = false)
    private String firstName;
    @Column(name = "lastName",nullable = false)
    private String lastName;
    @Column(name = "role")
    @Enumerated(value = EnumType.STRING)
    private EmployeeRoles role;
    @OneToOne(fetch = EAGER, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "branch_id",referencedColumnName = "branch_id")
    private Branch branch;
}
