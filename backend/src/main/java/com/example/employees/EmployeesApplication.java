package com.example.employees;

import com.example.employees.enums.BranchLocations;
import com.example.employees.enums.BranchStatus;
import com.example.employees.enums.EmployeeRoles;
import com.example.employees.enums.TransactionType;
import com.example.employees.models.schemas.*;
import com.example.employees.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.*;

@SpringBootApplication
public class EmployeesApplication {

	public static void main(String[] args) {
		SpringApplication.run(EmployeesApplication.class, args);
		System.out.println("server listening...");
	}

	@Bean
	CommandLineRunner commandLineRunner(
			EmployeeRepository employeeRepository,
			BranchRepository branchRepository,
			CustomerRepository customerRepository,
			ProductRepository productRepository,
			SupplierRepository supplierRepository,
			InventoryRepository inventoryRepository,
			TransactionRespository transactionRespository
	){
		return args -> {
			UUID branchIdScranton = UUID.fromString("e0f65fac-55e8-4dc3-9d9c-bf658d35241e");
			UUID branchIdBuffalo = UUID.fromString("9648fca5-8acb-4ca7-9e70-5adfe3ce6d80");

			Branch branchScranton = new Branch(
					branchIdScranton,
					BranchLocations.SCRANTON.toString(),
					BranchStatus.OPEN
			);

			Branch branchBuffalo = new Branch(
					branchIdBuffalo,
					BranchLocations.BUFFALO.toString(),
					BranchStatus.OPEN
			);

			Employee employee1 = new Employee(
				UUID.randomUUID(),
				"Jim",
				"Halper",
				EmployeeRoles.SALES,
				branchScranton
			);

			Employee employee2 = new Employee(
				UUID.randomUUID(),
				"Dwight",
				"Shrute",
				EmployeeRoles.SALES,
				branchBuffalo
			);

			Customer customer = new Customer(
				UUID.randomUUID(),
				"Staples"
			);

			Product product1 = new Product(
					UUID.randomUUID(),
					"PAPER"
			);

			Product product2 = new Product(
					UUID.randomUUID(),
					"DESK"
			);

			Product product3 = new Product(
					UUID.randomUUID(),
					"FILES"
			);

			Product savedProduct1 = productRepository.saveAndFlush(product1);
			Product savedProduct2 = productRepository.saveAndFlush(product2);
			Product savedProduct3 = productRepository.saveAndFlush(product3);
			List<Product> productList = new ArrayList<>();
			productList.add(savedProduct1);
			productList.add(savedProduct2);
			productList.add(savedProduct3);

			Supplier supplier = new Supplier(
					UUID.randomUUID(),
					"Office Supply",
					productList
			);

			Inventory inventory1 = new Inventory(
					UUID.randomUUID(),
					savedProduct1,
					0
			);
			Inventory inventory2 = new Inventory(
					UUID.randomUUID(),
					savedProduct2,
					0
			);
			Inventory inventory3 = new Inventory(
					UUID.randomUUID(),
					savedProduct3,
					0
			);
			inventoryRepository.save(inventory1);
			inventoryRepository.save(inventory2);
			inventoryRepository.save(inventory3);

			branchRepository.save(branchScranton);
			branchRepository.save(branchBuffalo);
			Employee emp1 = employeeRepository.save(employee1);
			Employee emp2 = employeeRepository.save(employee2);
			Customer cust1 = customerRepository.save(customer);
			Supplier sup1 = supplierRepository.save(supplier);

			Transaction transaction1 = new Transaction(
					UUID.randomUUID(),
					emp1,
					sup1,
					savedProduct1,
					null,
					TransactionType.BUY,
					10
			);
//			transactionRespository.save(transaction1);

			Transaction transaction2 = new Transaction(
				UUID.randomUUID(),
				emp1,
				sup1,
				savedProduct1,
				null,
				TransactionType.BUY,
				10
			);
//			transactionRespository.save(transaction2);

			Transaction transaction3 = new Transaction(
					UUID.randomUUID(),
					emp2,
					null,
					savedProduct1,
					cust1,
					TransactionType.SELL,
					5
			);
//			transactionRespository.save(transaction3);

		};
	}

    @Bean
    public CorsFilter corsFilter(){
        UrlBasedCorsConfigurationSource urlBasedCorsConfigurationSource = new UrlBasedCorsConfigurationSource();
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.setAllowCredentials(true);
        corsConfiguration.setAllowedOrigins(Arrays.asList(
                "http://localhost:3000",
                "http://localhost:4200"
        ));
        corsConfiguration.setAllowedHeaders(Arrays.asList(
                "Origin",
                "Access-Control-Allow-Origin",
                "Content-Type",
                "Accept",
                "Jwt-Token",
                "Authorization",
                "Origin, Accept",
                "X-Requested-With",
                "Access-Control-Request-Method",
                "Access-Control-Request-Headers"
        ));
        corsConfiguration.setExposedHeaders(Arrays.asList(
                "Origin",
                "Content-Type",
                "Accept",
                "Jwt-Token",
                "Authorization",
                "Access-Control-Allow-Origin",
                "Access-Control-Allow-Origin",
                "Access-Control-Allow-Credentials",
                "Filename"
        ));
        corsConfiguration.setAllowedMethods(Arrays.asList(
                "GET",
                "POST",
                "PUT",
                "PATCH",
                "DELETE",
                "OPTIONS"
        ));
        urlBasedCorsConfigurationSource.registerCorsConfiguration("/**",corsConfiguration);
        return new CorsFilter(urlBasedCorsConfigurationSource);
    }
}
