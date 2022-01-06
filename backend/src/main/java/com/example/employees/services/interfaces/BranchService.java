package com.example.employees.services.interfaces;

import com.example.employees.models.schemas.Branch;

import java.util.ArrayList;
import java.util.UUID;

public interface BranchService {
    ArrayList<Branch> create(Branch branch) throws Exception;
    ArrayList<Branch> update(UUID id, Branch branch) throws Exception;
}
