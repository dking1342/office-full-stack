package com.example.employees.services.implementations;

import com.example.employees.models.schemas.Inventory;
import com.example.employees.models.schemas.Product;
import com.example.employees.repository.InventoryRepository;
import com.example.employees.repository.ProductRepository;
import com.example.employees.services.interfaces.InventoryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;
import java.util.UUID;

@RequiredArgsConstructor
@Service
@Slf4j
public class InventoryImplement implements InventoryService {

    private final InventoryRepository inventoryRepository;
    private final ProductRepository productRepository;

    @Override
    public ArrayList<Inventory> create(Inventory inventory) throws Exception {
        log.info("Saving inventory");

        if(inventory.getProduct().getProduct_id().toString().isEmpty()){
            throw new Exception("product not entered");
        }

        Optional<Product> fetchedProduct = productRepository.findById(inventory.getProduct().getProduct_id());
        if(fetchedProduct.isPresent()){
            inventory.setInventory_id(UUID.randomUUID());
            inventory.setProduct(fetchedProduct.get());
            inventory.setQuantity(0);
            Inventory savedInventory = inventoryRepository.save(inventory);
            ArrayList<Inventory> responseInventory = new ArrayList<>();
            responseInventory.add(savedInventory);
            return responseInventory;
        } else {
            throw new Exception("invalid product");
        }
    }

    @Override
    public ArrayList<Inventory> update(UUID id, Inventory inventory) throws Exception {
        log.info("Updating inventory");
        Optional<Inventory> optionalInventory = inventoryRepository.findById(id);
        if(optionalInventory.isPresent()){
            Optional<Product> optionalProduct = productRepository.findById(inventory.getProduct().getProduct_id());
            if(optionalProduct.isPresent()){
                if(inventory.getQuantity() >= 0){
                    Inventory updatedInventory = new Inventory(
                            id,
                            inventory.getProduct(),
                            inventory.getQuantity()
                    );
                    Inventory savedInventory = inventoryRepository.save(updatedInventory);
                    ArrayList<Inventory> responseInventory = new ArrayList<>();
                    responseInventory.add(savedInventory);
                    return responseInventory;
                } else {
                    throw new Exception("Inventory cannot go below zero");
                }
            } else {
                throw new Exception("invalid product");
            }
        } else {
            throw new Exception("inventory invalid");
        }
    }

}
