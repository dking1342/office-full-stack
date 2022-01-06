package com.example.employees.services.interfaces;

import java.util.ArrayList;
import java.util.UUID;

public interface AllServices<ListType,RepoType> {
    ArrayList<ListType> get(UUID id, String repo) throws Exception;
    ArrayList<ListType> list(int limit, String repo) throws Exception;
    Boolean delete(UUID id, String repo) throws Exception;
}
