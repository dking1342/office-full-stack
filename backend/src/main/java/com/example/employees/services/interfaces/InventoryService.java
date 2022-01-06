package com.example.employees.services.interfaces;

import com.example.employees.models.schemas.Inventory;

import java.util.ArrayList;
import java.util.UUID;

public interface InventoryService {
    ArrayList<Inventory> create(Inventory inventory) throws Exception;
    ArrayList<Inventory> update(UUID id, Inventory inventory) throws Exception;
}
