package com.example.employees.services.interfaces;

import com.example.employees.models.schemas.Product;
import com.example.employees.models.schemas.Supplier;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public interface SupplierService {
    ArrayList<Supplier> create(Supplier supplier) throws Exception;
    ArrayList<Supplier> update(UUID id, Supplier supplier) throws Exception;
    List<Product> getProducts(UUID id) throws Exception;
    ArrayList<Supplier> createProduct(UUID id, Product product) throws Exception;
    ArrayList<Supplier> updateProduct(UUID id, Product product) throws Exception;
}
