import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, of, startWith } from 'rxjs';
import { Requeststatus } from 'src/app/enums/requeststatus';
import { TransactionTypes } from 'src/app/enums/transaction';
import { Appstate } from 'src/app/interfaces/appstate';
import { FetchService } from 'src/app/services/fetch.service';
import { Customer, Employee, FetchResponse, Product, responseContent, submitValueType, Supplier, Transaction } from 'src/types/general';

@Component({
  selector: 'app-form-transactions',
  templateUrl: './form-transactions.component.html',
  styleUrls: ['./form-transactions.component.css']
})
export class FormTransactionsComponent implements OnInit {
  @Input() type = "";
  @Input() data:Appstate<FetchResponse<Transaction>> = {dataState:Requeststatus.LOADED,appData:{}};

  @Output() closeForm = new EventEmitter<void>();
  @Output() refreshForm = new EventEmitter<FetchResponse<Transaction>>();

  // form state
  isEmployeeSelectShow:boolean = false;
  isProductSelectShow:boolean = false;
  isTransactionSelectShow:boolean = false;
  isSupplierSelectShow:boolean = false;
  isCustomerSelectShow:boolean = false;

  // reactive form state
  form = new FormGroup({});

  // validation state
  submitted:boolean = false;
  isFormField:boolean = true;

  // view specific id
  transactions_id = this.router.url.split("/")[this.router.url.split("/").length - 1];

  // observables
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
  filteredSuppliers:Supplier[] = [];
  products = new BehaviorSubject<Product[]>([]);
  products$ = this.products.asObservable();
  types:String[] = [];

  constructor(
    private fetchService:FetchService,
    private router: Router,
    private fb:FormBuilder,
  ) { }

  // getters for form state
  get transaction_id(){ return this.form.get("transaction_id")};
  get employee(){ return this.form.get("employee")};
  get supplier(){ return this.form.get("supplier")};
  get product(){ return this.form.get("product")};
  get customer(){ return this.form.get("customer")};
  get transactionType(){ return this.form.get("transactionType")};
  get transaction_quantity(){ return this.form.get("transaction_quantity")};    
    
  ngOnInit(): void {
    if(this.type === "save"){
      this.getEmployees();
      this.getProducts();
      this.getSuppliers();
      this.getCustomers();
      this.form= this.fb.group({
        transaction_id:[""],
        employee:[null,Validators.required],
        supplier:[null,Validators.required],
        product:[null,Validators.required],
        customer:[null,Validators.required],
        transactionType:[null,Validators.required],
        transaction_quantity:[1,Validators.required]
      });
    }

    if(this.type === "edit"){
      this.getEmployees();
      this.getProducts();
      this.getSuppliers();
      this.getCustomers();
      this.form = this.fb.group({
        transaction_id:this.transactions_id,
        employee:this.data.appData!.data![0].employee,
        transactionType:this.data.appData!.data![0].transactionType,
        product:this.data.appData!.data![0].product,
        supplier:this.data.appData!.data![0].supplier,
        customer:this.data.appData!.data![0].customer,
        transaction_quantity:this.data.appData!.data![0].transaction_quantity
      });
    }
    Object.values(TransactionTypes).map(v=> this.types.push(v));
  }

  submitForm(){
    this.submitted = true;
    let submitValue:submitValueType[] = [
      {
        name:"id",value:String(this.transaction_id?.value),boolean:Boolean(this.transaction_id?.value)
      },
      {
        name:"employee",value:String(this.employee?.value),boolean:Boolean(this.employee?.value)
      },
      {
        name:"supplier",value:String(this.supplier?.value),boolean:Boolean(this.supplier?.value)
      },
      {
        name:"product",value:String(this.product?.value),boolean:Boolean(this.product?.value)
      },
      {
        name:"type",value:String(this.transactionType?.value),boolean:Boolean(this.transactionType?.value)
      },
      {
        name:"quantity",value:Number(this.transaction_quantity?.value),boolean:Boolean(String(this.transaction_quantity?.value))
      },
      {
        name:"customer",value:String(this.customer?.value),boolean:Boolean(this.customer?.value)
      }
    ];

    if(this.type === "save" && this.checkTransactionType(submitValue)){
      this.saveTransaction(this.form.value);
    }
    if(this.type === "edit" && this.checkTransactionType(submitValue)){
      this.updateTransaction(this.form.value,this.transactions_id);
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
          if(this.type === 'edit'){
            this.filteredSuppliers = res.data!.flat(1)
              .filter(item=>{
                return item.products.some(v=> v.pname === Object.values(this.product!.value)[1])
              });
          };

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

  checkTransactionType(inputArray:submitValueType[]){

    if(inputArray.some(v=> v.name === "type" && v.value === "BUY")){
      let checkValues =  inputArray
        .filter(v=>v.name !== "id" && v.name !== "customer")
        .every(v=>v.boolean === true);
      
      if(checkValues){
        this.form.patchValue({
          customer:null
        });
        return true;
      } else {
        return false;
      }
    } else if(inputArray.some(v=> v.name === "type" && v.value === "SELL")){
      let checkValues = inputArray
        .filter(v=>v.name !== "id" && v.name !== "supplier")
        .every(v=>v.boolean === true);
      
      if(checkValues){
        this.form.patchValue({
          supplier:null
        });
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }

  }

  filterSuppliers(){
    if(this.transactionType?.value === "BUY" && this.product?.value){
      this.filteredSuppliers = this.suppliers?.value
        .filter(item=>{
          return item.products.some(v=> v.pname === Object.values(this.product!.value)[1])
        });
    }
  }

}
