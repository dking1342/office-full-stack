import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FetchService } from 'src/app/services/fetch.service';
import { Product, ProductResponse, SupplierProductResponse, SupplierResponse } from 'src/types/general';

@Component({
  selector: 'app-supplier-products',
  templateUrl: './supplier-products.component.html',
  styleUrls: ['./supplier-products.component.css']
})
export class SupplierProductsComponent implements OnInit {

  supplier_name:string = "";
  products:Product[] = [];
  showAddForm: boolean = false;
  formType:string = "save";
  s_id = this.router.url.split("/")[this.router.url.split("/").length - 1];

  constructor(
    private router:Router,
    private fetchService:FetchService
  ) { }

  ngOnInit(): void {
    this.getSupplier(this.s_id);
  }

  getSupplier(id:string){
    this.fetchService.getSupplier(id).subscribe((response:SupplierResponse)=>{
      if(response.statusCode === 200){
        this.supplier_name = response.data![0].sname;
        this.products = response.data![0].products;
      }
    })
  }

  deleteProduct(product:Product){
    let isDeleted = confirm("Are you sure you want to delete this product?");
    if(isDeleted){
      this.fetchService.deleteSupplierProduct(product,this.s_id).subscribe((response:SupplierProductResponse)=>{
        if(response.statusCode === 200){
          window.location.reload();
        }
      })
    }
  }

  showForm(){
    this.showAddForm = !this.showAddForm;
  }
}
