package com.example.employees.repository;

import com.example.employees.models.schemas.Branch;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface BranchRepository extends JpaRepository<Branch, UUID> {
    Branch findByLocation(String location);
}
