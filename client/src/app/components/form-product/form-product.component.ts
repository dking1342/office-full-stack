import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FetchService } from 'src/app/services/fetch.service';
import { Product, ProductResponse } from 'src/types/general';

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.css']
})
export class FormProductComponent implements OnInit {
  @Input() type = "";
  product_name: string = "";
  product:Product[] = [];
  p_id = this.router.url.split("/")[this.router.url.split("/").length - 1];

  constructor(
    private router: Router,
    private fetchService: FetchService
  ) { }

  ngOnInit(): void {
    if(this.type === "edit"){
      this.getProduct();
    }
  }

  submitForm(){
    let body:Product;
    if(this.type === "save"){
      body = {
        "product_id":"",
        "pname":this.product_name.toUpperCase()
      }
      this.saveProduct(body);
    }
    if(this.type === "edit"){
      body = {
        "product_id":this.p_id,
        "pname":this.product_name.toUpperCase()
      }
      this.updateProduct(body);
    }
  }
  getProduct(){
    this.fetchService.getProduct(this.p_id).subscribe((response:ProductResponse)=>{
      if(response.statusCode === 200){
        this.product_name = response.data![0].pname;
      }
    })
  }

  saveProduct(product:Product){
    this.fetchService.saveProduct(product).subscribe((response:ProductResponse)=>{
      if(response.statusCode === 200){
        window.location.reload();
      }
    })
  }
  updateProduct(product:Product){
    this.fetchService.updateProduct(product,this.p_id).subscribe((response:ProductResponse)=>{
      if(response.statusCode === 200){
        window.location.reload();
      }
    })
  }

}
