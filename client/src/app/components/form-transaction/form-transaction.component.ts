import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { Requeststatus } from 'src/app/enums/requeststatus';
import { TransactionTypes } from 'src/app/enums/transaction';
import { GET_CUSTOMERS, GET_CUSTOMERS_SUCCESS } from 'src/app/store/actions/customerActions';
import { GET_EMPLOYEES, GET_EMPLOYEES_SUCCESS } from 'src/app/store/actions/employeeActions';
import { GET_PRODUCTS, GET_PRODUCTS_SUCCESS } from 'src/app/store/actions/productActions';
import { GET_SUPPLIERS, GET_SUPPLIERS_SUCCESS } from 'src/app/store/actions/supplierActions';
import { ADD_TRANSACTION, EDIT_TRANSACTION_CLEAR, EDIT_TRANSACTION_CUSTOMER, EDIT_TRANSACTION_EMPLOYEE, EDIT_TRANSACTION_PRODUCT, EDIT_TRANSACTION_QUANTITY, EDIT_TRANSACTION_SUPPLIER, EDIT_TRANSACTION_TYPE, UPDATE_TRANSACTION } from 'src/app/store/actions/transactionActions';
import { selectCustomerFilteredCustomerData } from 'src/app/store/selectors/customerSelectors';
import { selectEmployeeFilteredEmployeeData } from 'src/app/store/selectors/employeeSelector';
import { selectProductFilteredProductData } from 'src/app/store/selectors/productSelectors';
import { selectSupplierDropDown, selectSupplierFilteredSupplierData } from 'src/app/store/selectors/supplierSelectors';
import { selectTransactionDataState, selectTransactionError, selectTransactionFilterData, selectTransactionFormOutput } from 'src/app/store/selectors/transactionSelectors';
import { Customer, Employee, FetchResponse, Product, ResponseAppState, Supplier, Transaction } from 'src/types/general';

@Component({
  selector: 'app-form-transaction',
  templateUrl: './form-transaction.component.html',
  styleUrls: ['./form-transaction.component.css','../../app.component.css']
})
export class FormTransactionComponent implements OnInit {
  @Input() type = "";

  @Output() closeForm = new EventEmitter<void>();
  @Output() refreshForm = new EventEmitter<FetchResponse<Transaction>>();
  
  // reactive form state -- select elements
  form = this.fb.group({
    transaction_id:[""],
    employee:[null,Validators.required],
    product:[null,Validators.required],
    transactionType:[null,Validators.required],
    supplier:[null],
    customer:[null],
    transaction_quantity:[0,Validators.min(0)]
  });

  // validation state
  submitted:boolean = false;
  isFormField:boolean = true;
  
  // view specific id
  transactions_id = this.router.url.split("/")[this.router.url.split("/").length - 1];
  
  // observables
  data$ = this.store.select(selectTransactionFilterData);
  loadState$ = this.store.select(selectTransactionDataState);
  error$ = this.store.select(selectTransactionError);
  readonly DataState = Requeststatus;
  readonly TransactionState = TransactionTypes;

  employeeList$ = this.storeEmployee.select(selectEmployeeFilteredEmployeeData);
  customerList$ = this.storeCustomer.select(selectCustomerFilteredCustomerData);
  productList$ = this.storeProduct.select(selectProductFilteredProductData);
  supplierList$ = this.storeSupplier.select(selectSupplierFilteredSupplierData);
  supplierDropList = new BehaviorSubject<Supplier[]>([]);
  supplierDropList$ = this.supplierDropList.asObservable();
  rolesList:String[] = [];

  constructor(
    private fb:FormBuilder,
    private router:Router,
    private store:Store<ResponseAppState<FetchResponse<Transaction>>>,
    private storeCustomer:Store<ResponseAppState<FetchResponse<Customer>>>,
    private storeProduct:Store<ResponseAppState<FetchResponse<Product>>>,
    private storeEmployee:Store<ResponseAppState<FetchResponse<Employee>>>,
    private storeSupplier:Store<ResponseAppState<FetchResponse<Supplier>>>
  ) { }

  // getters for form state - drop downs
  get employee(){ return this.form.get("employee")};
  get supplier(){ return this.form.get("supplier")};
  get product(){ return this.form.get("product")};
  get customer(){ return this.form.get("customer")};
  get transaction_quantity(){ return this.form.get("transaction_quantity")};    
  get transactionType(){ return this.form.get("transactionType")};
  
  
  // lifecycle hooks
  ngOnInit(): void {
    this.onGetEmployee("employees/list");
    this.onGetProduct("products/list");
    this.onGetSupplier("suppliers/list");
    this.onGetCustomer("customers/list");
    this.store.dispatch(EDIT_TRANSACTION_CLEAR());
    Object.values(TransactionTypes).map(val=>this.rolesList.push(val.toString()));
 
    if(this.type === "edit"){
      this.data$.forEach(item=>{
        this.form.controls['transaction_id'].setValue(item![0].transaction_id);
        this.form.controls['employee'].setValue(item![0].employee);
        this.form.controls['product'].setValue(item![0].product);
        this.form.controls['transactionType'].setValue(item![0].transactionType);
        this.form.controls['supplier'].setValue(item![0].supplier);
        this.form.controls['customer'].setValue(item![0].customer);
        this.form.controls['transaction_quantity'].setValue(item![0].transaction_quantity);
      });
    }
  }

  // methods
  submitForm(){
    this.submitted = true;
    if(this.customer!.value === null && this.supplier!.value === null){
      throw new Error("Customer or supplier not selected");
    } else {
      if(this.type === "save" && this.form.valid){
        this.onSaveTransaction(this.form.value);
      }
      if(this.type === "edit" && this.form.valid){
        this.onUpdateTransaction(this.form.value,this.transactions_id)
      }
    }

  }

  // get methods
  onGetEmployee(url:string){
    if(localStorage.getItem('employees')){
      let localState:ResponseAppState<FetchResponse<Employee>> = JSON.parse(localStorage.getItem('employees')!);
      this.storeEmployee.dispatch(GET_EMPLOYEES_SUCCESS({res:localState}));
    } else {
      this.storeEmployee.dispatch(GET_EMPLOYEES({url})); 
    }
  }
  onGetProduct(url:string){
    if(localStorage.getItem("products")){
      let localState:ResponseAppState<FetchResponse<Product>> = JSON.parse(localStorage.getItem("products")!);
      this.storeProduct.dispatch(GET_PRODUCTS_SUCCESS({res:localState}));
    } else {
      this.storeProduct.dispatch(GET_PRODUCTS({url}))
    }
  }
  onGetSupplier(url:string){
    if(localStorage.getItem("suppliers")){
      let localState:ResponseAppState<FetchResponse<Supplier>> = JSON.parse(localStorage.getItem("suppliers")!);
      this.storeProduct.dispatch(GET_SUPPLIERS_SUCCESS({res:localState}));
    } else {
      this.storeProduct.dispatch(GET_SUPPLIERS({url}))
    }
  }
  onGetCustomer(url:string){
    if(localStorage.getItem("customers")){
      let localState:ResponseAppState<FetchResponse<Customer>> = JSON.parse(localStorage.getItem("customers")!);
      this.storeProduct.dispatch(GET_CUSTOMERS_SUCCESS({res:localState}));
    } else {
      this.storeProduct.dispatch(GET_CUSTOMERS({url}))
    }
  }

 

  // save
  onSaveTransaction(transaction:Transaction){
    this.store.dispatch(ADD_TRANSACTION({transaction}));
    this.closeForm.emit();
    this.refreshForm.emit();
  }

  // update
  onUpdateTransaction(transaction:Transaction,id:string){
    this.store.dispatch(UPDATE_TRANSACTION({transaction,id}));
    this.closeForm.emit();
    this.refreshForm.emit();
  }

    
  // state change to form from select element 
  changeType(){
    this.store.dispatch(EDIT_TRANSACTION_TYPE({transactionType:this.transactionType!.value}));
    if(this.transactionType!.value === TransactionTypes.BUY){
      this.store.dispatch(EDIT_TRANSACTION_CUSTOMER({customer:null}));
      this.customer!.setValue(null);
    }
    if(this.transactionType!.value === TransactionTypes.SELL){
      this.store.dispatch(EDIT_TRANSACTION_SUPPLIER({supplier:null}));
      this.supplier!.setValue(null);
    }
  }

  changeProduct(){
    this.storeSupplier
      .select(selectSupplierDropDown({id:this.product?.value.product_id}))
      .subscribe(observer=>{
        this.supplierDropList.next(observer!);
      })
      .unsubscribe();
  }


}
