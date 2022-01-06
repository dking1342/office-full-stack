import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FetchService } from 'src/app/services/fetch.service';
import { Supplier, SupplierResponse } from 'src/types/general';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit {

  showEditForm = false;
  supplier:Supplier[] = [];
  formType:string = "edit";
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
        this.supplier = response.data!;
      }
    })
  }

  deleteSupplier(id:string){
    let isDeleted = confirm("Are you sure you want to delete this supplier?");
    if(isDeleted){
      this.fetchService.deleteSupplier(id).subscribe((response:SupplierResponse)=>{
        if(response.statusCode === 200){
          this.router.navigate(['suppliers']);
        }
      })
    }
  }
  editSupplier(){
    this.showEditForm = !this.showEditForm;
  }

}
