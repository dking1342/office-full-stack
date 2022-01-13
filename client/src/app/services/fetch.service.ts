import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { EmployeesResponse, Employee, BranchResponse, Branch, CustomerResponse, Customer, ProductResponse, Product, SupplierResponse, Supplier, SupplierProductResponse, InventoryResponse, TransactionResponse, Transaction, FetchResponse } from 'src/types/general';

@Injectable({
  providedIn: 'root'
})

export class FetchService {

  apiEndpoint = "http://localhost:8080/api"
  constructor(
    private http:HttpClient
  ) { }


  getEmployees$ = (url:string) => <Observable<FetchResponse<Employee>>>this.http
    .get<FetchResponse<Employee>>(`${this.apiEndpoint}/${url}`)
    .pipe(
      tap(console.log),
      catchError(this.handleError)
    );

  saveEmployee$ = (employee:Employee) => <Observable<FetchResponse<Employee>>>this.http
    .post<FetchResponse<Employee>>(`${this.apiEndpoint}/employees/save`,employee)
    .pipe(
      tap(console.log),
      catchError(this.handleError)
    );

  updateEmployee$ = (employee:Employee,id:string) => <Observable<FetchResponse<Employee>>>this.http
    .put<FetchResponse<Employee>>(`${this.apiEndpoint}/employees/update/${id}`,employee)
    .pipe(
      tap(console.log),
      catchError(this.handleError)
    );

  deleteEmployee$ = (id:string) => <Observable<FetchResponse<Employee>>>this.http
    .delete<FetchResponse<Employee>>(`${this.apiEndpoint}/employees/delete/${id}`)
    .pipe(
      tap(console.log),
      catchError(this.handleError)
    );

  getBranches$ = (url:string) => <Observable<FetchResponse<Branch>>>this.http
    .get<FetchResponse<Branch>>(`${this.apiEndpoint}/${url}`)
    .pipe(
      tap(console.log),
      catchError(this.handleError)
    );

  saveBranch$ = (branch:Branch) => <Observable<FetchResponse<Branch>>>this.http
    .post<FetchResponse<Branch>>(`${this.apiEndpoint}/branches/save`,branch)
    .pipe(
      tap(console.log),
      catchError(this.handleError)
    );

  updateBranch$ = (branch:Branch,id:string) => <Observable<FetchResponse<Branch>>>this.http
    .put<FetchResponse<Branch>>(`${this.apiEndpoint}/branches/update/${id}`,branch)
    .pipe(
      tap(console.log),
      catchError(this.handleError)
    );

  getCustomers$ = (url:string) => <Observable<FetchResponse<Customer>>>this.http
    .get<FetchResponse<Customer>>(`${this.apiEndpoint}/${url}`)
    .pipe(
      tap(console.log),
      catchError(this.handleError)
    );

  saveCustomer$ = (customer:Customer) => <Observable<FetchResponse<Customer>>>this.http
    .post<FetchResponse<Customer>>(`${this.apiEndpoint}/customers/save`,customer)
    .pipe(
      tap(console.log),
      catchError(this.handleError)
    );

  updateCustomer$ = (customer:Customer,id:string) => <Observable<FetchResponse<Customer>>>this.http
    .put<FetchResponse<Customer>>(`${this.apiEndpoint}/customers/update/${id}`,customer)
    .pipe(
      tap(console.log),
      catchError(this.handleError)
    );

  deleteCustomer$ = (id:string) => <Observable<FetchResponse<Customer>>>this.http
    .delete<FetchResponse<Customer>>(`${this.apiEndpoint}/customers/delete/${id}`)
    .pipe(
      tap(console.log),
      catchError(this.handleError)
    );

  getProducts$ = (url:string) => <Observable<FetchResponse<Product>>>this.http
    .get<FetchResponse<Product>>(`${this.apiEndpoint}/${url}`)
    .pipe(
      tap(console.log),
      catchError(this.handleError)
    );

  saveProduct$ = (product:Product) => <Observable<FetchResponse<Product>>>this.http
    .post<FetchResponse<Product>>(`${this.apiEndpoint}/products/save`,product)
    .pipe(
      tap(console.log),
      catchError(this.handleError)
    );

  updateProduct$ = (product:Product,id:string) => <Observable<FetchResponse<Product>>>this.http
    .put<FetchResponse<Product>>(`${this.apiEndpoint}/products/update/${id}`,product)
    .pipe(
      tap(console.log),
      catchError(this.handleError)
    );


  private handleError(handleError:HttpErrorResponse):Observable<never>{
    return throwError(()=> new Error(`${handleError.statusText}`));
  }
    
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
