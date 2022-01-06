package com.example.employees.controllers;

import com.example.employees.models.schemas.Branch;
import com.example.employees.models.responses.Response;
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
    public ResponseEntity<Response> getBranch(@PathVariable("id") UUID id) throws Exception {
        return ResponseEntity.ok(
                Response.builder()
                        .timestamp(LocalDateTime.now())
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .message("Fetched branch")
                        .branchData(allImplement.get(id,"branch"))
                        .build()
        );
    }

    @GetMapping("/list")
    public ResponseEntity<Response> getBranches() throws Exception {
        return ResponseEntity.ok(
                Response.builder()
                        .timestamp(LocalDateTime.now())
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .message("Fetched all branches")
                        .branchData(allImplement.list(10,"branch"))
                        .build()
        );
    }

    @PostMapping("/save")
    public ResponseEntity<Response> saveBranch(@RequestBody Branch branch) throws Exception {
        return ResponseEntity.ok(
                Response.builder()
                        .timestamp(LocalDateTime.now())
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .message("Saved branch")
                        .branchData(branchImplement.create(branch))
                        .build()
        );
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Response> updateBranch(@PathVariable("id") UUID id, @RequestBody Branch branch) throws Exception {
        return ResponseEntity.ok(
                Response.builder()
                        .timestamp(LocalDateTime.now())
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .message("Updated branch")
                        .branchData(branchImplement.update(id,branch))
                        .build()
        );
    }
}
