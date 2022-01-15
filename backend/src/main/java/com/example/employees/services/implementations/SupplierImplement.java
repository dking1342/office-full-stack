package com.example.employees.services.implementations;

import com.example.employees.models.schemas.Product;
import com.example.employees.models.schemas.Supplier;
import com.example.employees.repository.ProductRepository;
import com.example.employees.repository.SupplierRepository;
import com.example.employees.services.interfaces.SupplierService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.*;

@RequiredArgsConstructor
@Service
@Slf4j
public class SupplierImplement implements SupplierService {

    private final SupplierRepository supplierRepository;
    private final ProductRepository productRepository;

    @Override
    public ArrayList<Supplier> create(Supplier supplier) throws Exception {
        log.info("Saving supplier");

        if(supplier.getSname().isEmpty()){
            throw new Exception("supplier name is invalid");
        }

        supplier.setSupplier_id(UUID.randomUUID());

        final int length = supplier.getProducts().toArray().length;
        if(length <= 0){
            List<Product> productsList = new ArrayList<>();
            supplier.setProducts(productsList);
        } else {
            for (int i = 0; i < length; i++) {
                Product p = (Product) supplier.getProducts().toArray()[i];
                Optional<Product> optionalProduct = productRepository.findById(p.getProduct_id());
                if(!optionalProduct.isPresent()){
                    throw new Exception("product invalid");
                }
            }
        }

        Supplier savedSupplier = supplierRepository.save(supplier);
        ArrayList<Supplier> responseSupplier = new ArrayList<>();
        responseSupplier.add(savedSupplier);
        return responseSupplier;
    }

    @Override
    public ArrayList<Supplier> update(UUID id, Supplier supplier) throws Exception {
        log.info("Updating supplier: {}", id);
        Supplier updatedSupplier = new Supplier();
        updatedSupplier.setSupplier_id(id);

        Optional<Supplier> optionalSupplier = supplierRepository.findById(id);
        if(optionalSupplier.isPresent()){
            if(supplier.getSname().isEmpty()){
                updatedSupplier.setSname(optionalSupplier.get().getSname());
                updatedSupplier.setProducts(optionalSupplier.get().getProducts());
            } else {
                updatedSupplier.setSname(supplier.getSname());
                updatedSupplier.setProducts(supplier.getProducts());
            }
            Supplier savedSupplier = supplierRepository.save(updatedSupplier);
            ArrayList<Supplier> responseSupplier = new ArrayList<>();
            responseSupplier.add(savedSupplier);
            return responseSupplier;
        } else {
            throw new Exception("supplier not found");
        }
    }

    @Override
    public List<Product> getProducts(UUID id) throws Exception {
        log.info("Fetching products for id: {}", id);

        Optional<Supplier> optionalSupplier = supplierRepository.findById(id);

        if(optionalSupplier.isPresent()){
            return optionalSupplier.get().getProducts();
        } else {
            throw new Exception("no supplier found");
        }
    }

    @Override
    public ArrayList<Supplier> createProduct(UUID id, Product product) throws Exception {
        log.info("Creating new product for supplier");
        Optional<Supplier> optionalSupplier = supplierRepository.findById(id);

        if(optionalSupplier.isPresent()){

            UUID product_id = product.getProduct_id();
            Optional<Product> optionalProduct = productRepository.findById(product_id);

            if(optionalProduct.isPresent()){

                int length = optionalSupplier.get().getProducts().toArray().length;
                for (int i = 0; i < length; i++) {
                    Product p = (Product) optionalSupplier.get().getProducts().toArray()[i];
                    if(product.getProduct_id().equals(p.getProduct_id())){
                        throw new Exception("product already in supplier list");
                    }
                }

                List<Product> supplierProducts = optionalSupplier.get().getProducts();
                supplierProducts.add(product);
                optionalSupplier.get().setProducts(supplierProducts);

                Supplier savedSupplier = supplierRepository.save(optionalSupplier.get());
                ArrayList<Supplier> responseSupplier = new ArrayList<>();
                responseSupplier.add(savedSupplier);
                return responseSupplier;
            } else {
                throw new Exception("product not found");
            }

        } else {
            throw new Exception("supplier not found");
        }
    }

    @Override
    public ArrayList<Supplier> updateProduct(UUID id, Product product) throws Exception {
        log.info("Updated product: {}", product.getProduct_id());

        Optional<Supplier> optionalSupplierId = supplierRepository.findById(id);

        if(optionalSupplierId.isPresent()){

            Optional<Product> optionalProduct = productRepository.findById(product.getProduct_id());

            if(optionalProduct.isPresent()){

                List<Product> supplierProducts = optionalSupplierId.get().getProducts();

                for (Iterator<Product> iterator = supplierProducts.iterator(); iterator.hasNext();){
                    Product prod = iterator.next();
                    if(prod.getProduct_id().equals(product.getProduct_id())){
                        iterator.remove();
                    }
                }

                optionalSupplierId.get().setProducts(supplierProducts);
                Supplier savedSupplier = supplierRepository.save(optionalSupplierId.get());
                ArrayList<Supplier> responseSupplier = new ArrayList<>();
                responseSupplier.add(savedSupplier);
                return responseSupplier;

            } else {
                throw new Exception("Product not available to be updated");
            }
        } else {
            throw new Exception("Supplier not found");
        }
    }
}
