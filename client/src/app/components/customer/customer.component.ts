import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FetchService } from 'src/app/services/fetch.service';
import { Customer, CustomerResponse } from 'src/types/general';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  showEditForm = false;
  customer:Customer[] = [];
  formType:string = "edit";
  c_id = this.router.url.split("/")[this.router.url.split("/").length - 1];

  constructor(
    private fetchService: FetchService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCustomer(this.c_id);
  }

  getCustomer(id:string){
    this.fetchService.getCustomer(id).subscribe((response:CustomerResponse)=>{
      if(response.statusCode === 200){
        this.customer = response.data!;
      }
    })
  }

  deleteCustomer(id:string){
    let isDeleted = confirm("Are you sure you want to delete this employee?");
    if(isDeleted){
      this.fetchService.deleteCustomer(id).subscribe((response:CustomerResponse)=>{
        if(response.statusCode === 200 && response.boolData){
          this.router.navigate(['customers']);
        } else {
          alert("Not able to delete customer. Please try again");
        }
      })
    }
  }

  editCustomer(){
    this.showEditForm = !this.showEditForm;
  }

}
