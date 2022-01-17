import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, of, startWith } from 'rxjs';
import { Requeststatus } from 'src/app/enums/requeststatus';
import { TransactionTypes } from 'src/app/enums/transaction';
import { Appstate } from 'src/app/interfaces/appstate';
import { FetchService } from 'src/app/services/fetch.service';
import { Customer, Employee, FetchResponse, Product, responseContent, Supplier, Transaction } from 'src/types/general';

@Component({
  selector: 'app-form-transactions',
  templateUrl: './form-transactions.component.html',
  styleUrls: ['./form-transactions.component.css']
})
export class FormTransactionsComponent implements OnInit {
  @Input() type = "";
  @Input() data:Appstate<FetchResponse<Transaction>> = {dataState:Requeststatus.LOADED,appData:{}};
  @Input() supplierData:Supplier[] = [];

  @Output() closeForm = new EventEmitter<void>();
  @Output() refreshForm = new EventEmitter<FetchResponse<Transaction>>();

  formState:Transaction = {
    transaction_id:"",
    employee:{id:"",firstName:"",lastName:"",role:"",branch:{branch_id:"",location:"",branchStatus:""}},
    supplier:{supplier_id:"",sname:"",products:[]},
    product:{product_id:"",pname:""},
    customer:{customer_id:"",cname:""},
    transactionType:"",
    transaction_quantity:0
  }
  transaction_id = this.router.url.split("/")[this.router.url.split("/").length - 1];

  appStateForm$!: Observable<Appstate<FetchResponse<Transaction>>>;
  saveSubject = new BehaviorSubject<FetchResponse<Transaction>>(responseContent);
  isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingSubject.asObservable();
  readonly DataState = Requeststatus;
  employees = new BehaviorSubject<Employee[]>([]);
  employees$ = this.employees.asObservable();
  customers = new BehaviorSubject<Customer[]>([]);
  customers$ = this.customers.asObservable();
  suppliers = new BehaviorSubject<Supplier[]>([]);
  suppliers$ = this.suppliers.asObservable();
  products = new BehaviorSubject<Product[]>([]);
  products$ = this.products.asObservable();
  types:String[] = [];

  
  constructor(
    private fetchService:FetchService,
    private router: Router,
    private formbuilder:FormBuilder,
    ) { }
    
    
    ngOnInit(): void {
    if(this.type === "save"){
      this.getEmployees();
      this.getProducts();
      this.getSuppliers();
      this.getCustomers();

    }
    if(this.type === "edit"){
      this.formState.transaction_id = this.transaction_id;
      this.formState.employee = this.data.appData!.data![0].employee;
      this.formState.product = this.data.appData!.data![0].product;
      this.formState.transactionType = this.data.appData!.data![0].transactionType;
      this.formState.supplier = this.data.appData!.data![0].supplier;
      this.formState.customer = this.data.appData!.data![0].customer;
      this.formState.transaction_quantity = this.data.appData!.data![0].transaction_quantity;
      this.getEmployees();
      this.getProducts();
      this.getSuppliers();
      this.getCustomers();
    }
    this.types.push(TransactionTypes.BUY);
    this.types.push(TransactionTypes.SELL);
  }

  submitForm(){
    if(this.formState.transactionType === "BUY"){
      this.formState = {
        ...this.formState,
        customer:null
      }
    }
    if(this.formState.transactionType === "SELL"){
      this.formState = {
        ...this.formState,
        supplier:null
      }
    }
    if(this.type === "save"){
      this.saveTransaction(this.formState);
    }
    if(this.type === "edit"){
      this.updateTransaction(this.formState,this.transaction_id);
    }

  }

  saveTransaction(transaction:Transaction){
    this.isLoadingSubject.next(true);
    this.appStateForm$ = this.fetchService.saveTransaction$(transaction)
      .pipe(
        map(res=>{
          this.isLoadingSubject.next(false);
          this.closeForm.emit();
          this.refreshForm.emit(res);
          return {
            dataState:Requeststatus.LOADED,
            appData:{
              ...res,
              data:res.data!.flat(1)
            }
          }
        }),
        startWith({
          dataState:Requeststatus.LOADING
        }),
        catchError((error:string)=>{
          this.isLoadingSubject.next(false);
          return of({
            dataState:Requeststatus.ERROR,
            error
          })
        })
      )
  }

  updateTransaction(transaction:Transaction,id:string){
    this.isLoadingSubject.next(true);
    this.appStateForm$ = this.fetchService.updateTransaction$(transaction,id)
      .pipe(
        map(res=>{
          this.isLoadingSubject.next(false);
          this.closeForm.emit();
          this.refreshForm.emit(res);
          return {
            dataState:Requeststatus.LOADED,
            appData:{
              ...res,
              data:res.data!.flat(1)
            }
          }
        }),
        startWith({
          dataState:Requeststatus.LOADING
        }),
        catchError((error:string)=>{
          this.isLoadingSubject.next(false);
          return of({
            dataState:Requeststatus.ERROR,
            error
          })
        })
      )
  }

  getEmployees(){
    this.isLoadingSubject.next(true);
    this.employees$ = this.fetchService.getEmployees$("employees/list")
      .pipe(
        map(res=>{
          this.isLoadingSubject.next(false);
          this.employees.next(res.data!.flat(1));
          return this.employees.value;
        }),
        catchError(()=>{
          this.isLoadingSubject.next(false);
          return [];
        })
      )
  }
  getProducts(){
    this.isLoadingSubject.next(true);
    this.products$ = this.fetchService.getProducts$("products/list")
      .pipe(
        map(res=>{
          this.isLoadingSubject.next(false);
          this.products.next(res.data!.flat(1));
          return this.products.value;
        }),
        catchError(()=>{
          this.isLoadingSubject.next(false);
          return [];
        })
      )
  }
  getSuppliers(){
    this.isLoadingSubject.next(true);
    this.suppliers$ = this.fetchService.getSuppliers$("suppliers/list")
      .pipe(
        map(res=>{
          this.isLoadingSubject.next(false);
          // filter through suppliers that have the product
          this.suppliers.next(res.data!.flat(1));
          return this.suppliers.value;
        }),
        catchError(()=>{
          this.isLoadingSubject.next(false);
          return [];
        })
      )
  }
  getCustomers(){
    this.isLoadingSubject.next(true);
    this.customers$ = this.fetchService.getCustomers$("customers/list")
      .pipe(
        map(res=>{
          this.isLoadingSubject.next(false);
          this.customers.next(res.data!.flat(1));
          return this.customers.value;
        }),
        catchError(()=>{
          return [];
        })
      )
  }

}
