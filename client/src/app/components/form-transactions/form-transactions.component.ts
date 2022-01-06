import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TransactionTypes } from 'src/app/enums/transaction';
import { FetchService } from 'src/app/services/fetch.service';
import { Employee, Customer, Supplier, Product, Transaction, EmployeesResponse, CustomerResponse, ProductResponse, SupplierResponse, TransactionResponse } from 'src/types/general';

@Component({
  selector: 'app-form-transactions',
  templateUrl: './form-transactions.component.html',
  styleUrls: ['./form-transactions.component.css']
})
export class FormTransactionsComponent implements OnInit {
  @Input() type = "";
  @Input() data:any = [];
  @Input() supplierData:Supplier[] = [];
  selectedEmployee:string = "";
  selectedCustomer:string = "";
  selectedSupplier:string = "";
  selectedProduct:string = "";
  selectedType:string = "";
  transactionQuantity = 1;
  employees:Employee[] = [];
  customers:Customer[] = [];
  suppliers:Supplier[] = [];
  filteredSuppliers:Supplier[]=[];
  products:Product[] = [];
  types:String[] = [];
  hasSelectedEmployee = false;
  hasSelectedProduct = false;
  hasSelectedType = false;
  hasSelectedBuy = false;
  hasSelectedSell = false;
  hasSelectedCompany = false;
  hasSelected = false;
  t_id = this.router.url.split("/")[this.router.url.split("/").length - 1];
  hasError:boolean = false;
  errorMsg:string = "";

  constructor(
    private fetchService:FetchService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if(this.type === "save"){
      this.getEmployeeList();
      this.getSupplierList();
      this.getCustomerList();
      this.getProductList();
    }
    if(this.type === "edit"){
      this.getEmployeeList();
      this.getCustomerList();
      this.getProductList();

      this.hasSelectedEmployee = true;
      this.hasSelectedProduct = true;
      this.hasSelectedType = true;
      this.data[0].transactionType === "BUY" ? this.hasSelectedBuy = true : this.hasSelectedSell = true;
      this.hasSelectedCompany = true;

      this.selectedEmployee = this.data[0].employee[0].id;
      this.selectedProduct = this.data[0].product[0].product_id;
      this.selectedType = this.data[0].transactionType;
      
      // check suppliers
      this.filteredSuppliers = [];
      this.supplierData.forEach(item=>{
        item.products.forEach(prod=>{
          if(prod.product_id === this.selectedProduct){
            this.filteredSuppliers.push(item);
          } 
        })
      });
      this.selectedSupplier = this.data[0].supplier[0].supplier_id;
      this.selectedCustomer = this.data[0].customer[0].customer_id;
      this.transactionQuantity = this.data[0].transaction_quantity;
    }
    this.types.push(TransactionTypes.BUY);
    this.types.push(TransactionTypes.SELL);
  }

  submitForm(){
    let body:Transaction;
    if(this.type === "save" && this.selectedType === "BUY"){
      body = {
        transaction_id:"",
        employee_id:this.selectedEmployee,
        supplier_id:this.selectedSupplier,
        product_id:this.selectedProduct,
        customer_id:null,
        transactionType:this.selectedType,
        transaction_quantity:this.transactionQuantity
      }
      this.saveTransaction(body);
    }
    if(this.type === "save" && this.selectedType === "SELL"){
      body = {
        transaction_id:"",
        employee_id:this.selectedEmployee,
        supplier_id:null,
        product_id:this.selectedProduct,
        customer_id:this.selectedCustomer,
        transactionType:this.selectedType,
        transaction_quantity:this.transactionQuantity
      }
      this.saveTransaction(body);
    }
    if(this.type === "edit" && this.selectedType === "BUY"){
      body = {
        transaction_id:this.t_id,
        employee_id:this.selectedEmployee,
        supplier_id:this.selectedSupplier,
        product_id:this.selectedProduct,
        customer_id:null,
        transactionType:this.selectedType,
        transaction_quantity:this.transactionQuantity
      }
      console.log(body);
      console.log(this.transactionQuantity);
      this.updateTransaction(body,this.t_id);
    }
    if(this.type === "edit" && this.selectedType === "SELL"){
      body = {
        transaction_id:this.t_id,
        employee_id:this.selectedEmployee,
        supplier_id:null,
        product_id:this.selectedProduct,
        customer_id:this.selectedCustomer,
        transactionType:this.selectedType,
        transaction_quantity:this.transactionQuantity
      }
      this.updateTransaction(body,this.t_id);
    }
  }

  saveTransaction(transaction:Transaction){
    this.fetchService.saveTransaction(transaction).subscribe((response:TransactionResponse)=>{
      if(response.statusCode === 200){
        window.location.reload();
      } 
    },error =>{
      console.log(error);
      this.hasError = true;
      this.errorMsg = "An error has happened. Please try again.";
    })
  }

  updateTransaction(transaction:Transaction,id:string){
    this.fetchService.updateTransaction(transaction,id).subscribe((response:TransactionResponse)=>{
      if(response.statusCode === 200){
        window.location.reload();
      }
    })
  }

  updateEmployee(e:any){
    this.selectedEmployee ? this.hasSelectedEmployee = true : this.hasSelectedEmployee = false;
  }
  updateProduct(e:any){
    this.selectedProduct ? this.hasSelectedProduct = true : this.hasSelectedProduct = false;
    
    // check suppliers
    this.filteredSuppliers = [];
    this.suppliers.forEach(item=>{
      item.products.forEach(prod=>{
        if(prod.product_id === this.selectedProduct){
          this.filteredSuppliers.push(item);
        } 
      })
    });
    this.selectedSupplier = "";
    this.hasSelectedCompany = false;
  }
  updateType(e:any){
    if(e.target.value === "BUY"){
      this.hasSelectedBuy = true;
      this.hasSelectedSell = false;
    }
    if(e.target.value === "SELL"){
      this.hasSelectedSell = true;
      this.hasSelectedBuy = false;
    }
  }
  updateCompany(e:any){
    this.selectedSupplier || this.selectedCustomer ? this.hasSelectedCompany = true : this.hasSelectedCompany = false;
  }

  getEmployeeList(){
    this.fetchService.getEmployeeList().subscribe((response:EmployeesResponse)=>{
      if(response.statusCode === 200){
        this.employees = response.employeeData!.flat(1);
      }
    })
  }
  getCustomerList(){
    this.fetchService.getCustomerList().subscribe((response:CustomerResponse)=>{
      if(response.statusCode === 200){
        this.customers = response.data!.flat(1);
      }
    })
  }
  getProductList(){
    this.fetchService.getProductList().subscribe((response:ProductResponse)=>{
      if(response.statusCode === 200){
        this.products = response.data!.flat(1);
      }
    })
  }
  getSupplierList(){
    this.fetchService.getSupplierList().subscribe((response:SupplierResponse)=>{
      if(response.statusCode === 200){
        this.suppliers = response.data!.flat(1);
      }
    })
  }


}
