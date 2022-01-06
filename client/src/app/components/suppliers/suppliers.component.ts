import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FetchService } from 'src/app/services/fetch.service';
import { Supplier, SupplierResponse } from 'src/types/general';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css']
})
export class SuppliersComponent implements OnInit {

  suppliers:Supplier[] = [];
  showAddForm: boolean = false;
  formType:string = "save";

  constructor(
    private router:Router,
    private fetchService:FetchService
  ) { }

  ngOnInit(): void {
    this.getSuppliers();
  }

  getSuppliers(){
    this.fetchService.getSupplierList().subscribe((response:SupplierResponse)=>{
      if(response.statusCode === 200){
        this.suppliers = response.data!.flat(1);
      }
    })
  }

  getInfo(id:string){
    this.router.navigate(['supplier',id]);
  }

  getProductInfo(id:string){
    this.router.navigate(['supplier','product',id]);
  }

  showForm(){
    this.showAddForm = !this.showAddForm;
  }
}
