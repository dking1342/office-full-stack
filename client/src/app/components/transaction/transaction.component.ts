import { isNgTemplate } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FetchService } from 'src/app/services/fetch.service';
import { Employee, Customer, Supplier, Product, Transaction, EmployeesResponse, CustomerResponse, ProductResponse, SupplierResponse, TransactionResponse, TransactionArray } from 'src/types/general';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  showEditForm = false;
  transaction:any[] = [];
  suppliers:Supplier[]=[];
  formType:string = "edit";
  isLoading = true;
  t_id = this.router.url.split("/")[this.router.url.split("/").length - 1];
  hasError:boolean = false;
  errorMsg:string = "";

  constructor(
    private router: Router,
    private fetchService: FetchService
  ) { }

  ngOnInit(): void {
    this.getTransaction(this.t_id);
    this.getSupplierList();
  }

  getSupplierList(){
    this.fetchService.getSupplierList().subscribe((res:SupplierResponse)=>{
      if(res.statusCode === 200){
        this.suppliers = res.data!.flat(1);
      }
    })
  }

  getTransaction(id:string){
    this.fetchService.getTransaction(id).subscribe((response:TransactionResponse)=>{
      if(response.statusCode === 200){
        let transArray:any = response.data!.flat(1).map(item=>{

          let e:Employee[]=[];
          this.fetchService.getEmployee(item.employee_id).subscribe((res:EmployeesResponse)=>{
            if(res.statusCode === 200){
              e.push(res.employeeData!.flat(1)[0]);
            }
          })

          let s:Supplier[] = [];
          if(item.transactionType === "BUY"){
            this.fetchService.getSupplier(item.supplier_id!).subscribe((res:SupplierResponse)=>{
              if(res.statusCode === 200){
                s.push(res.data!.flat(1)[0]);
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

          let p:Product[]=[];
          this.fetchService.getProduct(item.product_id).subscribe((res:ProductResponse)=>{
            if(res.statusCode === 200){
              p.push(res.data!.flat(1)[0]);
            }
          })

          return {
            transaction_id:item.transaction_id,
            employee:e,
            customer:c,
            supplier:s,
            product:p,
            transactionType:item.transactionType,
            transaction_quantity:item.transaction_quantity
          }
        });
        this.transaction = transArray;
      }
    })
    this.isLoading = false;
  }

  editTransaction(){
    this.showEditForm = !this.showEditForm;
  }

}
