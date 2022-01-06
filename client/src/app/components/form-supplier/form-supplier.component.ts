import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FetchService } from 'src/app/services/fetch.service';
import { Product, Supplier, SupplierResponse } from 'src/types/general';

@Component({
  selector: 'app-form-supplier',
  templateUrl: './form-supplier.component.html',
  styleUrls: ['./form-supplier.component.css']
})
export class FormSupplierComponent implements OnInit {

  @Input() type:string = "";
  supplier_name:string = "";
  supplier: Supplier[] = [];
  products: Product[] = [];
  s_id = this.router.url.split("/")[this.router.url.split("/").length - 1];
  constructor(
    private router:Router,
    private fetchService:FetchService
  ) { }

  ngOnInit(): void {
    if(this.type === "edit"){
      this.getSupplier(this.s_id);
    }
  }

  submitForm(){
    let body:Supplier;
    if(this.type === "save"){
      body = {
        "supplier_id":"",
        "sname":this.supplier_name,
        "products":[]
      }
      this.saveSupplier(body);
    }
    if(this.type === "edit"){
      body = {
        "supplier_id":this.s_id,
        "sname":this.supplier_name,
        "products":this.products
      }
      this.updateSupplier(body);
    }
  }

  getSupplier(id:string){
    this.fetchService.getSupplier(id).subscribe((response:SupplierResponse)=>{
      if(response.statusCode === 200){
        this.supplier_name = response.data![0].sname;
        this.products = response.data![0].products;
      }
    })
  }

  saveSupplier(supplier:Supplier){
    this.fetchService.saveSupplier(supplier).subscribe((response:SupplierResponse)=>{
      if(response.statusCode === 200){
        window.location.reload();
      }
    })
  }
  updateSupplier(supplier:Supplier){
    this.fetchService.updateSupplier(supplier,this.s_id).subscribe((response:SupplierResponse)=>{
      if(response.statusCode === 200){
        window.location.reload();
      }
    })
  }

}
