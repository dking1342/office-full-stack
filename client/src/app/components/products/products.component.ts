import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FetchService } from 'src/app/services/fetch.service';
import { Product, ProductResponse } from 'src/types/general';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products:Product[] = [];
  showAddForm: boolean = false;
  formType:string = "save";

  constructor(
    private router: Router,
    private fetchService: FetchService
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    this.fetchService.getProductList().subscribe((response:ProductResponse)=>{
      if(response.statusCode === 200){
        this.products = response.data!.flat(1);
      }
    })
  }

  getInfo(id:string){
    this.router.navigate(['product',id]);
  }
  showForm(){
    this.showAddForm = !this.showAddForm;
  }

}
