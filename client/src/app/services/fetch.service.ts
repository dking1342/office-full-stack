import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmployeesResponse, Employee, BranchResponse, Branch, CustomerResponse, Customer, ProductResponse, Product, SupplierResponse, Supplier, SupplierProductResponse, InventoryResponse, TransactionResponse, Transaction } from 'src/types/general';

@Injectable({
  providedIn: 'root'
})
export class FetchService {

  apiEndpoint = "http://localhost:8080/api"
  constructor(private http:HttpClient) { }

  getEmployeeList(){
    return this.http.get<EmployeesResponse>(`${this.apiEndpoint}/employees/list`);
  }
  getEmployee(id:string){
    return this.http.get<EmployeesResponse>(`${this.apiEndpoint}/employees/get/${id}`);
  }
  deleteEmployee(id:string){
    return this.http.delete<EmployeesResponse>(`${this.apiEndpoint}/employees/delete/${id}`);
  }
  saveEmployee(employee:Employee){
    return this.http.post<EmployeesResponse>(`${this.apiEndpoint}/employees/save`,employee);
  }
  updateEmployee(employee:Employee,id:string){
    return this.http.put<EmployeesResponse>(`${this.apiEndpoint}/employees/update/${id}`,employee);
  }
  getBranchList(){
    return this.http.get<BranchResponse>(`${this.apiEndpoint}/branches/list`);
  }
  getBranch(id:string){
    return this.http.get<BranchResponse>(`${this.apiEndpoint}/branches/get/${id}`);
  }
  saveBranch(branch:Branch){
    return this.http.post<BranchResponse>(`${this.apiEndpoint}/branches/save`,branch);
  }
  updateBranch(branch:Branch,id:string){
    return this.http.put<BranchResponse>(`${this.apiEndpoint}/branches/update/${id}`,branch);
  }
  getCustomerList(){
    return this.http.get<CustomerResponse>(`${this.apiEndpoint}/customers/list`);
  }
  getCustomer(id:string){
    return this.http.get<CustomerResponse>(`${this.apiEndpoint}/customers/get/${id}`);
  }
  deleteCustomer(id:string){
    return this.http.delete<CustomerResponse>(`${this.apiEndpoint}/customers/delete/${id}`);
  }
  saveCustomer(customer:Customer){
    return this.http.post<CustomerResponse>(`${this.apiEndpoint}/customers/save`,customer);
  }
  updateCustomer(customer:Customer,id:string){
    return this.http.put<CustomerResponse>(`${this.apiEndpoint}/customers/update/${id}`,customer);
  }
  getProductList(){
    return this.http.get<ProductResponse>(`${this.apiEndpoint}/products/list`);
  }
  getProduct(id:string){
    return this.http.get<ProductResponse>(`${this.apiEndpoint}/products/get/${id}`);
  }
  deleteProduct(id:string){
    return this.http.delete<ProductResponse>(`${this.apiEndpoint}/products/delete/${id}`);
  }
  saveProduct(product:Product){
    return this.http.post<ProductResponse>(`${this.apiEndpoint}/products/save`,product);
  }
  updateProduct(product:Product,id:string){
    return this.http.put<ProductResponse>(`${this.apiEndpoint}/products/update/${id}`,product);
  }
  getSupplierList(){
    return this.http.get<SupplierResponse>(`${this.apiEndpoint}/suppliers/list`);
  }
  getSupplier(id:string){
    return this.http.get<SupplierResponse>(`${this.apiEndpoint}/suppliers/get/${id}`);
  }
  deleteSupplier(id:string){
    return this.http.delete<SupplierResponse>(`${this.apiEndpoint}/suppliers/delete/${id}`);
  }
  saveSupplier(supplier:Supplier){
    return this.http.post<SupplierResponse>(`${this.apiEndpoint}/suppliers/save`,supplier);
  }
  updateSupplier(supplier:Supplier,id:string){
    return this.http.put<SupplierResponse>(`${this.apiEndpoint}/suppliers/update/${id}`,supplier);
  }
  getSupplierProducts(id:string){
    return this.http.get<SupplierProductResponse>(`${this.apiEndpoint}/suppliers/list/products/${id}`);
  }
  saveSupplierProduct(product:Product,id:string){
    return this.http.post<SupplierProductResponse>(`${this.apiEndpoint}/suppliers/create/products/${id}`,product);
  }
  deleteSupplierProduct(product:Product,id:string){
    return this.http.put<SupplierProductResponse>(`${this.apiEndpoint}/suppliers/update/products/${id}`,product);
  }
  getInventoryList(){
    return this.http.get<InventoryResponse>(`${this.apiEndpoint}/inventory/list`);
  }
  getTransactionList(){
    return this.http.get<TransactionResponse>(`${this.apiEndpoint}/transactions/list`);
  }
  getTransaction(id:string){
    return this.http.get<TransactionResponse>(`${this.apiEndpoint}/transactions/get/${id}`);
  }
  saveTransaction(transaction:Transaction){
    return this.http.post<TransactionResponse>(`${this.apiEndpoint}/transactions/save`,transaction);
  }
  updateTransaction(transaction:Transaction,id:string){
    return this.http.put<TransactionResponse>(`${this.apiEndpoint}/transactions/update/${id}`,transaction);
  }
}
