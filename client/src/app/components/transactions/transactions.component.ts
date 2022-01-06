import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FetchService } from 'src/app/services/fetch.service';
import { Customer, CustomerResponse, Employee, EmployeesResponse, Product, ProductResponse, Supplier, SupplierResponse, Transaction, TransactionArray, TransactionResponse } from 'src/types/general';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  transactions:TransactionArray[] = [];
  trans:any = [];
  showAddForm: boolean = false;
  formType:string = "save";
  isLoading = true;

  constructor(
    private router:Router,
    private fetchService:FetchService
  ) { }

  ngOnInit(): void {
    this.getTransactions();
  }

  getTransactions(){
    this.fetchService.getTransactionList().subscribe((response:TransactionResponse)=>{
      if(response.statusCode === 200){
        let transArray:any = response.data!.flat(1).map(item=>{
          
          let e:Employee[] = [];
          this.fetchService.getEmployee(item.employee_id).subscribe((res:EmployeesResponse)=>{
            if(res.statusCode === 200){
              e.push(res.employeeData!.flat(1)[0])
            }
          })

          let s:Supplier[] = [];
          if(item.transactionType === "BUY"){
            this.fetchService.getSupplier(item.supplier_id!).subscribe((res:SupplierResponse)=>{
              if(res.statusCode === 200){
                s?.push(res.data!.flat(1)[0])
              }
            })
          } else {
            s.push({supplier_id:"",sname:"",products:[]});
          }

          let c:Customer[] = [];
          if(item.transactionType === "SELL"){
            this.fetchService.getCustomer(item.customer_id!).subscribe((res:CustomerResponse)=>{
              if(res.statusCode === 200){
                c.push(res.data!.flat(1)[0]);
              }
            })
          } else {
            c.push({customer_id:"",cname:""});
          }

          let p:Product[] = [];
          this.fetchService.getProduct(item.product_id).subscribe((res:ProductResponse)=>{
            if(res.statusCode === 200){
              p.push(res.data!.flat(1)[0])
            }
          })

          return {
            transaction_id:item.transaction_id,
            employee:e,
            customer:c,
            supplier:s,
            product:p,
            transactionType:item.transactionType,
            transaction_quantity:item.transaction_quantity,
          }
        });
        this.trans = transArray;
      }
    })
    this.isLoading = false;
  }

  getInfo(id:string){
    this.router.navigate(['transaction',id])
  }

  showForm(){
    this.showAddForm = !this.showAddForm;
  }

}
