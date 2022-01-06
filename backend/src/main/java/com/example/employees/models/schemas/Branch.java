package com.example.employees.models.schemas;

import com.example.employees.enums.BranchLocations;
import com.example.employees.enums.BranchStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import javax.persistence.*;
import java.util.UUID;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "branches")
public class Branch {
    @Id
    @Column(name = "branch_id")
    private UUID branch_id;
    private String location;
    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    @NonNull
    private BranchStatus branchStatus = BranchStatus.OPEN;
}
