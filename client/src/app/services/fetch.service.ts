import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Employee, Branch, Customer, Product, Supplier, Transaction, FetchResponse, Inventory } from 'src/types/general';

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

  getSuppliers$ = (url:string) => <Observable<FetchResponse<Supplier>>>this.http
    .get<FetchResponse<Supplier>>(`${this.apiEndpoint}/${url}`)
    .pipe(
      tap(console.log),
      catchError(this.handleError)
    );

  saveSupplier$ = (supplier:Supplier) => <Observable<FetchResponse<Supplier>>>this.http
    .post<FetchResponse<Supplier>>(`${this.apiEndpoint}/suppliers/save`,supplier)
    .pipe(
      tap(console.log),
      catchError(this.handleError)
    );

  updateSupplier$ = (supplier:Supplier,id:string) => <Observable<FetchResponse<Supplier>>>this.http
    .put<FetchResponse<Supplier>>(`${this.apiEndpoint}/suppliers/update/${id}`,supplier)
    .pipe(
      tap(console.log),
      catchError(this.handleError)
    );

  deleteSupplier$ = (id:string) => <Observable<FetchResponse<Supplier>>>this.http
    .delete<FetchResponse<Supplier>>(`${this.apiEndpoint}/suppliers/delete/${id}`)
    .pipe(
      tap(console.log),
      catchError(this.handleError)
    );

  getInventory$ = <Observable<FetchResponse<Inventory>>>this.http
    .get<FetchResponse<Inventory>>(`${this.apiEndpoint}/inventory/list`)
    .pipe(
      tap(console.log),
      catchError(this.handleError)
    );

  getTransactions$ = (url:string) => <Observable<FetchResponse<Transaction>>>this.http
    .get<FetchResponse<Transaction>>(`${this.apiEndpoint}/${url}`)
    .pipe(
      tap(console.log),
      catchError(this.handleError)
    );

  saveTransaction$ = (transaction:Transaction) => <Observable<FetchResponse<Transaction>>>this.http
    .post<FetchResponse<Transaction>>(`${this.apiEndpoint}/transactions/save`,transaction)
    .pipe(
      tap(console.log),
      catchError(this.handleError)
    );

  updateTransaction$ = (transaction:Transaction,id:string) => <Observable<FetchResponse<Transaction>>>this.http
    .put<FetchResponse<Transaction>>(`${this.apiEndpoint}/transactions/update/${id}`,transaction)
    .pipe(
      tap(console.log),
      catchError(this.handleError)
    );

  deleteTransaction$ = (id:string) => <Observable<FetchResponse<Transaction>>>this.http
    .delete<FetchResponse<Transaction>>(`${this.apiEndpoint}/transactions/delete/${id}`)
    .pipe(
      tap(console.log),
      catchError(this.handleError)
    );

  private handleError(handleError:HttpErrorResponse):Observable<never>{
    // console.log(handleError.error)
    if(handleError.error.message){
      return throwError(()=> new Error(`${handleError.error.error}`));
    } else {
      return throwError(()=> new Error(`${handleError.error}`))
    }
  }
  
}
