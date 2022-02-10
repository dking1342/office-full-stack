import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, of, startWith } from 'rxjs';
import { Requeststatus } from 'src/app/enums/requeststatus';
import { TransactionTypes } from 'src/app/enums/transaction';
import { FetchService } from 'src/app/services/fetch.service';
import { Customer, Employee, FetchResponse, Product, ResponseAppState, responseContent, submitValueType, Supplier, Transaction } from 'src/types/general';

@Component({
  selector: 'app-form-transactions',
  templateUrl: './form-transactions.component.html',
  styleUrls: ['./form-transactions.component.css','../../app.component.css']
})
export class FormTransactionsComponent implements OnInit {
  @Input() type = "";
  @Input() data:ResponseAppState<FetchResponse<Transaction>> = {dataState:Requeststatus.LOADED,appData:{}};

  @Output() closeForm = new EventEmitter<void>();
  @Output() refreshForm = new EventEmitter<FetchResponse<Transaction>>();

  // reactive form state
  transactionForm = this.fb.group({
    transaction_id:["",Validators.required],
    employee: this.fb.group({
      id:["",Validators.required],
      firstName:["",Validators.required],
      lastName:["",Validators.required],
      role:["",Validators.required],
      branch:this.fb.group({
        branch_id:["",Validators.required],
        location:["",Validators.required],
        branchStatus:["",Validators.required]
      })
    }),
    product:this.fb.group({
      product_id:["",Validators.required],
      pname:["",Validators.required]
    }),
    transactionType:["",Validators.required],
    supplier:this.fb.group({
      supplier_id:[""],
      sname:[""],
      products:[[]]
    }),
    customer:this.fb.group({
      customer_id:[""],
      cname:[""]
    }),
    transaction_quantity:[1,Validators.requiredTrue]
  });

  // reactive form state -- select elements
  selectForm = this.fb.group({
    employee:[null,Validators.required],
    product:[null,Validators.required],
    transactionType:[null,Validators.required],
    supplier:[null,Validators.required],
    customer:[null,Validators.required],
    transaction_quantity:[1,Validators.required]
  });

  // state change to form from select element 
  changeEmployee(){
    this.transactionForm.controls['employee'].get("id")?.setValue(this.selectForm.controls['employee'].value.id);
    this.transactionForm.controls['employee'].get("firstName")?.setValue(this.selectForm.controls['employee'].value.firstName);
    this.transactionForm.controls['employee'].get("lastName")?.setValue(this.selectForm.controls['employee'].value.lastName);
    this.transactionForm.controls['employee'].get("role")?.setValue(this.selectForm.controls['employee'].value.role);
    this.transactionForm.controls['employee'].get("branch")?.get("branch_id")?.setValue(this.selectForm.controls['employee'].value.branch.branch_id);
    this.transactionForm.controls['employee'].get("branch")?.get("location")?.setValue(this.selectForm.controls['employee'].value.branch.location);
    this.transactionForm.controls['employee'].get("branch")?.get("branchStatus")?.setValue(this.selectForm.controls['employee'].value.branch.branchStatus);
  }
  changeProduct(){
    this.transactionForm.controls['product'].get("product_id")?.setValue(this.selectForm.controls['product'].value.product_id);
    this.transactionForm.controls['product'].get("pname")?.setValue(this.selectForm.controls['product'].value.pname);
    this.filterSuppliers();
  }
  changeType(){
    this.transactionForm.controls['transactionType']?.setValue(this.selectForm.controls['transactionType'].value);
    this.filterSuppliers();
  }
  changeSupplier(){
    this.transactionForm.controls['supplier'].get("supplier_id")?.setValue(this.selectForm.controls['supplier'].value.supplier_id);
    this.transactionForm.controls['supplier'].get("sname")?.setValue(this.selectForm.controls['supplier'].value.sname);
    this.transactionForm.controls['supplier'].get("products")?.setValue(this.selectForm.controls['supplier'].value.products);
  }
  changeCustomer(){
    this.transactionForm.controls['customer'].get("customer_id")?.setValue(this.selectForm.controls['customer'].value.customer_id);
    this.transactionForm.controls['customer'].get("cname")?.setValue(this.selectForm.controls['customer'].value.cname);    
  }
  changeQuantity(){
    this.transactionForm.controls['transaction_quantity'].setValue(this.selectForm.controls['transaction_quantity'].value);
  }

  // validation state
  submitted:boolean = false;
  isFormField:boolean = true;

  // view specific id
  transactions_id = this.router.url.split("/")[this.router.url.split("/").length - 1];

  // observables
  appStateForm$!: Observable<ResponseAppState<FetchResponse<Transaction>>>;
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

  // getters for form state - drop downs
  get employee(){ return this.selectForm.get("employee")};
  get supplier(){ return this.selectForm.get("supplier")};
  get product(){ return this.selectForm.get("product")};
  get customer(){ return this.selectForm.get("customer")};
  get transaction_quantity(){ return this.selectForm.get("transaction_quantity")};    

  // getters for form state - form
  get transaction_id(){ return this.transactionForm.get("transaction_id")?.value};
  get id(){ return this.transactionForm.controls['employee'].get("id")?.value }
  get firstName(){ return this.transactionForm.controls['employee'].get("firstName")?.value }
  get lastName(){ return this.transactionForm.controls['employee'].get("lastName")?.value }
  get role(){ return this.transactionForm.controls['employee'].get("role")?.value }
  get branch_id(){ return this.transactionForm.controls['employee'].get("branch")?.value.branch_id }
  get location(){ return this.transactionForm.controls['employee'].get("branch")?.value.location }
  get branchStatus(){ return this.transactionForm.controls['employee'].get("branch")?.value.branchStatus }
  get product_id(){ return this.transactionForm.controls['product'].get("product_id")?.value }
  get pname(){ return this.transactionForm.controls['product'].get("pname")?.value }
  get transactionType(){ return this.transactionForm.get("transactionType")?.value};
  get supplier_id(){ return this.transactionForm.controls['supplier'].get("supplier_id")?.value }
  get sname(){ return this.transactionForm.controls['supplier'].get("sname")?.value }
  get products_supplier(){ return this.transactionForm.controls['supplier'].get("products")?.value as FormArray}
  get customer_id(){ return this.transactionForm.controls['customer'].get("customer_id")?.value }
  get cname(){ return this.transactionForm.controls['customer'].get("cname")?.value }
  get transaction_quantity_form(){ return this.transactionForm.get("transaction_quantity")?.value }
  
    
  ngOnInit(): void {
    if(this.type === "save"){
      this.getEmployees();
      this.getProducts();
      this.getSuppliers();
      this.getCustomers();
    }

    if(this.type === "edit"){
      this.getEmployees();
      this.getProducts();
      this.getSuppliers();
      this.getCustomers();

      if(this.data.appData!.data![0].transactionType === "BUY"){
        this.transactionForm = this.fb.group({
          transaction_id:[this.data.appData!.data![0].transaction_id,Validators.required],
          employee: this.fb.group({
            id:[this.data.appData!.data![0].employee.id,Validators.required],
            firstName:[this.data.appData!.data![0].employee.firstName,Validators.required],
            lastName:[this.data.appData!.data![0].employee.lastName,Validators.required],
            role:[this.data.appData!.data![0].employee.role,Validators.required],
            branch:this.fb.group({
              branch_id:[this.data.appData!.data![0].employee.branch.branch_id,Validators.required],
              location:[this.data.appData!.data![0].employee.branch.location,Validators.required],
              branchStatus:[this.data.appData!.data![0].employee.branch.branchStatus,Validators.required]
            })
          }),
          product:this.fb.group({
            product_id:[this.data.appData!.data![0].product.product_id,Validators.required],
            pname:[this.data.appData!.data![0].product.pname,Validators.required]
          }),
          transactionType:[this.data.appData!.data![0].transactionType,Validators.required],
          supplier:this.fb.group({
            supplier_id:[this.data.appData!.data![0].supplier?.supplier_id,Validators.required],
            sname:[this.data.appData!.data![0].supplier?.sname,Validators.required],
            products:[this.data.appData!.data![0].supplier?.products,Validators.required]
          }),
          customer:this.fb.group({
            customer_id:[""],
            cname:[""]
          }),
          transaction_quantity:[this.data.appData!.data![0].transaction_quantity,Validators.requiredTrue]
        });
      }
      if(this.data.appData!.data![0].transactionType === "SELL"){
        this.transactionForm = this.fb.group({
          transaction_id:[this.data.appData!.data![0].transaction_id,Validators.required],
          employee: this.fb.group({
            id:[this.data.appData!.data![0].employee.id,Validators.required],
            firstName:[this.data.appData!.data![0].employee.firstName,Validators.required],
            lastName:[this.data.appData!.data![0].employee.lastName,Validators.required],
            role:[this.data.appData!.data![0].employee.role,Validators.required],
            branch:this.fb.group({
              branch_id:[this.data.appData!.data![0].employee.branch.branch_id,Validators.required],
              location:[this.data.appData!.data![0].employee.branch.location,Validators.required],
              branchStatus:[this.data.appData!.data![0].employee.branch.branchStatus,Validators.required]
            })
          }),
          product:this.fb.group({
            product_id:[this.data.appData!.data![0].product.product_id,Validators.required],
            pname:[this.data.appData!.data![0].product.pname,Validators.required]
          }),
          transactionType:[this.data.appData!.data![0].transactionType,Validators.required],
          supplier:this.fb.group({
            supplier_id:[""],
            sname:[""],
            products:[""]
          }),
          customer:this.fb.group({
            customer_id:[this.data.appData!.data![0].customer?.customer_id,Validators.required],
            cname:[this.data.appData!.data![0].customer?.cname,Validators.required]
          }),
          transaction_quantity:[this.data.appData!.data![0].transaction_quantity,Validators.requiredTrue]
        });
      }      
      this.selectForm.get("transaction_quantity")?.setValue(this.data.appData!.data![0].transaction_quantity);
    }
    Object.values(TransactionTypes).map(v=> this.types.push(v));
  }

  submitForm(){
    this.submitted = true;
    let submitValue:submitValueType[] = [
      {
        name:"id",value:String(this.transaction_id),boolean:Boolean(this.transaction_id)
      },
      {
        name:"employee",value:String(this.id),boolean:Boolean(this.id)
      },
      {
        name:"supplier",value:String(this.supplier_id),boolean:Boolean(this.supplier_id)
      },
      {
        name:"product",value:String(this.product_id),boolean:Boolean(this.product_id)
      },
      {
        name:"type",value:String(this.transactionType),boolean:Boolean(this.transactionType)
      },
      {
        name:"quantity",value:Number(this.transaction_quantity_form),boolean:Boolean(String(this.transaction_quantity_form))
      },
      {
        name:"customer",value:String(this.customer_id),boolean:Boolean(this.customer_id)
      }
    ];

    if(this.type === "save" && this.checkTransactionType(submitValue)){
      this.saveTransaction(this.transactionForm.value);
    }
    if(this.type === "edit" && this.checkTransactionType(submitValue)){
      this.updateTransaction(this.transactionForm.value,this.transactions_id);
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
                return item.products.some(v=> v.pname === this.pname)
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
        this.transactionForm = this.fb.group({
          transaction_id:[this.transaction_id,Validators.required],
          employee: this.fb.group({
            id:[this.id,Validators.required],
            firstName:[this.firstName,Validators.required],
            lastName:[this.lastName,Validators.required],
            role:[this.role,Validators.required],
            branch:this.fb.group({
              branch_id:[this.branch_id,Validators.required],
              location:[this.location,Validators.required],
              branchStatus:[this.branchStatus,Validators.required]
            })
          }),
          product:this.fb.group({
            product_id:[this.product_id,Validators.required],
            pname:[this.pname,Validators.required]
          }),
          transactionType:[this.transactionType,Validators.required],
          supplier:this.fb.group({
            supplier_id:[this.supplier_id,Validators.required],
            sname:[this.sname,Validators.required],
            products:[this.products_supplier,Validators.required]
          }),
          customer:null,
          transaction_quantity:[this.transaction_quantity_form,Validators.requiredTrue]
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
        this.transactionForm = this.fb.group({
          transaction_id:[this.transaction_id,Validators.required],
          employee: this.fb.group({
            id:[this.id,Validators.required],
            firstName:[this.firstName,Validators.required],
            lastName:[this.lastName,Validators.required],
            role:[this.role,Validators.required],
            branch:this.fb.group({
              branch_id:[this.branch_id,Validators.required],
              location:[this.location,Validators.required],
              branchStatus:[this.branchStatus,Validators.required]
            })
          }),
          product:this.fb.group({
            product_id:[this.product_id,Validators.required],
            pname:[this.pname,Validators.required]
          }),
          transactionType:[this.transactionType,Validators.required],
          supplier:null,
          customer:this.fb.group({
            customer_id:[this.customer_id,Validators.required],
            cname:[this.cname,Validators.required]
          }),
          transaction_quantity:[this.transaction_quantity_form,Validators.requiredTrue]
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
    if(this.transactionType === "BUY" && this.product?.value){
      this.filteredSuppliers = this.suppliers?.value
        .filter(item=>{
          return item.products.some(v=> v.pname === this.pname)
        });
    }
  }

}
