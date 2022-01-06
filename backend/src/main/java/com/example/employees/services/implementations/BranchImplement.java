package com.example.employees.services.implementations;

import com.example.employees.models.schemas.Branch;
import com.example.employees.repository.BranchRepository;
import com.example.employees.services.interfaces.BranchService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;
import java.util.UUID;

@RequiredArgsConstructor
@Service
@Slf4j
public class BranchImplement implements BranchService {

    private final BranchRepository branchRepository;

    @Override
    public ArrayList<Branch> create(Branch branch) throws Exception {
        log.info("Saving employee");
        Optional<Branch> optionalBranch = Optional.ofNullable(branchRepository.findByLocation(branch.getLocation().toUpperCase()));

        if(optionalBranch.isPresent()){
            throw new Exception("Location already exists");
        } else {
            Branch newBranch = new Branch(
                    UUID.randomUUID(),
                    branch.getLocation().toUpperCase(),
                    branch.getBranchStatus()
            );

            Branch savedBranch = branchRepository.save(newBranch);
            ArrayList<Branch> responseBranch = new ArrayList<>();
            responseBranch.add(savedBranch);
            return responseBranch;
        }
    }

    @Override
    public ArrayList<Branch> update(UUID id, Branch branch) throws Exception {
        log.info("Updating branch: {}", id);

        Optional<Branch> optionalBranch = branchRepository.findById(id);

        if(optionalBranch.isPresent()){
            Branch newBranch = new Branch(
                    id,
                    optionalBranch.get().getLocation(),
                    branch.getBranchStatus()
            );

            Branch updatedBranch = branchRepository.save(newBranch);
            ArrayList<Branch> responseBranch = new ArrayList<>();
            responseBranch.add(updatedBranch);
            return responseBranch;
        } else {
            throw new Exception("Error when updating branch");
        }
    }
}
