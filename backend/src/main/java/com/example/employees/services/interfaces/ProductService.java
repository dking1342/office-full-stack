package com.example.employees.services.interfaces;

import com.example.employees.models.schemas.Product;

import java.util.ArrayList;
import java.util.UUID;

public interface ProductService {
    ArrayList<Product> create(Product product) throws Exception;
    ArrayList<Product> update(UUID id, Product product) throws Exception;
}
