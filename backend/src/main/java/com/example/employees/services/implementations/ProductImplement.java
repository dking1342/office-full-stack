package com.example.employees.services.implementations;

import com.example.employees.models.schemas.Inventory;
import com.example.employees.models.schemas.Product;
import com.example.employees.repository.ProductRepository;
import com.example.employees.repository.InventoryRepository;
import com.example.employees.services.interfaces.ProductService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;
import java.util.UUID;

@RequiredArgsConstructor
@Service
@Slf4j
public class ProductImplement implements ProductService {

    private final ProductRepository productRepository;
    private final InventoryRepository inventoryRepository;

    @Override
    public ArrayList<Product> create(Product product) throws Exception {
        log.info("Saving product");
        if(product.getPname().isEmpty()){
            throw new Exception("product name is invalid");
        }

        Product newProduct = new Product(
                UUID.randomUUID(),
                product.getPname().toUpperCase()
        );
        Product savedProduct = productRepository.save(newProduct);
        ArrayList<Product> responseProduct = new ArrayList<>();
        responseProduct.add(savedProduct);

        Inventory newInventory = new Inventory(
                UUID.randomUUID(),
                savedProduct,
                0
        );
        inventoryRepository.save(newInventory);
        return responseProduct;
    }

    @Override
    public ArrayList<Product> update(UUID id, Product product) throws Exception {
        log.info("Updating product: {}", id);
        Optional<Product> optionalProductId = productRepository.findById(id);

        if(optionalProductId.isPresent()){
            if(product.getPname().isEmpty()){
                throw new Exception("product name is invalid");
            }

            Product updatedProduct = new Product(
                    id,
                    product.getPname().toUpperCase()
            );
            Product savedProduct = productRepository.save(updatedProduct);
            ArrayList<Product> responseProduct = new ArrayList<>();
            responseProduct.add(savedProduct);
            return responseProduct;
        } else {
            throw new Exception("product already exists");
        }
    }
}
