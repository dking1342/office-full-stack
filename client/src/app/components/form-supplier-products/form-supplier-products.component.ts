import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FetchService } from 'src/app/services/fetch.service';
import { Product, ProductResponse, SupplierProductResponse } from 'src/types/general';

@Component({
  selector: 'app-form-supplier-products',
  templateUrl: './form-supplier-products.component.html',
  styleUrls: ['./form-supplier-products.component.css']
})
export class FormSupplierProductsComponent implements OnInit {
  @Input() type = "";
  selectedProduct: Product = {product_id:"",pname:""};
  dropdownList:Product[] =[];
  hasAllProducts = false;
  isLoading = true;
  supplier_id = this.router.url.split("/")[this.router.url.split("/").length - 1];

  constructor(
    private router: Router,
    private fetchService: FetchService
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  submitForm(){
    if(this.type === "save"){
      this.saveProduct(this.selectedProduct);
    }
  }

  getData(){
    this.fetchService.getProductList().subscribe((response:ProductResponse)=>{
      if(response.statusCode === 200){
        this.fetchService.getSupplierProducts(this.supplier_id).subscribe((res:SupplierProductResponse)=>{
          if(res.statusCode === 200){
            let supplierList = res.supplierData!.flat(1);
            let productList = response.data!.flat(1);

            if(supplierList.length === 0){
              this.dropdownList = productList;
              this.isLoading = false;
            } else if(supplierList.length === productList.length){
              this.hasAllProducts = true;
              this.isLoading = false;
            } else {
              this.dropdownList = productList
                .map(item=>{
                  let isMatch = false;
                  supplierList.forEach(pItem => {
                    if(item.product_id === pItem.product_id){
                      isMatch = true;
                      return;
                    }
                  });
                  return isMatch ? {product_id:"",pname:""} : item;
                })
                .filter(item => item.product_id !== "");
              this.isLoading = false;
            }
          }
        })
      } 
    })
  }

  getSupplierProducts(id:string){
    this.fetchService.getSupplierProducts(id).subscribe((response:SupplierProductResponse)=>{
      if(response.statusCode === 200){
        return response.supplierData;
      } else {
        return "An error has occured";
      }
    })
  }

  saveProduct(product:Product){
    this.fetchService.saveSupplierProduct(product,this.supplier_id).subscribe((response:SupplierProductResponse)=>{
      if(response.statusCode === 200){
        window.location.reload();
      }
    })
  }



}
