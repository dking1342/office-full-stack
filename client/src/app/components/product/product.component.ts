import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FetchService } from 'src/app/services/fetch.service';
import { Product, ProductResponse } from 'src/types/general';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  showEditForm = false;
  product:Product[] = [];
  formType:string = "edit";
  p_id = this.router.url.split("/")[this.router.url.split("/").length - 1];

  constructor(
    private router: Router,
    private fetchService: FetchService
  ) { }

  ngOnInit(): void {
    this.getProduct(this.p_id);
  }

  getProduct(id:string){
    this.fetchService.getProduct(id).subscribe((response:ProductResponse)=>{
      if(response.statusCode === 200){
        this.product = response.data!;
      }
    })
  }

  deleteProduct(id:string){
    let isDeleted = confirm("Are you sure you want to delete this product?");
    if(isDeleted){
      this.fetchService.deleteProduct(id).subscribe((response:ProductResponse)=>{
        if(response.statusCode === 200 && response.boolData){
          this.router.navigate(['products']);
        } else {
          alert("Not able to delete product. Please try again");
        }
      })
    }
  }

  editProduct(){
    this.showEditForm = !this.showEditForm;
  }

}
