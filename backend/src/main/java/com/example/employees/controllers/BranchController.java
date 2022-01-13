package com.example.employees.controllers;

import com.example.employees.models.responses.BranchResponse;
import com.example.employees.models.schemas.Branch;
import com.example.employees.repository.BranchRepository;
import com.example.employees.services.implementations.AllImplement;
import com.example.employees.services.implementations.BranchImplement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/branches")
public class BranchController {

    private final AllImplement<Branch, BranchRepository> allImplement;
    private final BranchImplement branchImplement;

    @GetMapping("/get/{id}")
    public ResponseEntity<BranchResponse> getBranch(@PathVariable("id") UUID id) throws Exception {
        return ResponseEntity.ok(
                BranchResponse.builder()
                        .timestamp(LocalDateTime.now())
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .message("Fetched branch")
                        .data(allImplement.get(id,"branch"))
                        .build()
        );
    }

    @GetMapping("/list")
    public ResponseEntity<BranchResponse> getBranches() throws Exception {
        return ResponseEntity.ok(
                BranchResponse.builder()
                        .timestamp(LocalDateTime.now())
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .message("Fetched all branches")
                        .data(allImplement.list(10,"branch"))
                        .build()
        );
    }

    @PostMapping("/save")
    public ResponseEntity<BranchResponse> saveBranch(@RequestBody Branch branch) throws Exception {
        return ResponseEntity.ok(
                BranchResponse.builder()
                        .timestamp(LocalDateTime.now())
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .message("Saved branch")
                        .data(branchImplement.create(branch))
                        .build()
        );
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<BranchResponse> updateBranch(@PathVariable("id") UUID id, @RequestBody Branch branch) throws Exception {
        return ResponseEntity.ok(
                BranchResponse.builder()
                        .timestamp(LocalDateTime.now())
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .message("Updated branch")
                        .data(branchImplement.update(id,branch))
                        .build()
        );
    }
}
