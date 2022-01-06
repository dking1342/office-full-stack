import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FetchService } from 'src/app/services/fetch.service';
import { Customer, CustomerResponse } from 'src/types/general';

@Component({
  selector: 'app-form-customer',
  templateUrl: './form-customer.component.html',
  styleUrls: ['./form-customer.component.css']
})
export class FormCustomerComponent implements OnInit {
  @Input() type = "";
  customer_name:string = "";
  c_id = this.router.url.split("/")[this.router.url.split("/").length - 1];

  constructor(
    private router: Router,
    private fetchService: FetchService
  ) { }

  ngOnInit(): void {
    if(this.type === "edit"){
      this.getCustomer(this.c_id);
    }
  }

  submitForm(){
    let body:Customer;
    if(this.type === "save"){
      body = {
        "customer_id":"",
        "cname":this.customer_name
      }
      this.saveCustomer(body);
    }
    if(this.type === "edit"){
      body = {
        "customer_id":this.c_id,
        "cname":this.customer_name
      }
      this.updateCustomer(body);
    }
  }

  getCustomer(id:string){
    this.fetchService.getCustomer(id).subscribe((response:CustomerResponse)=>{
      if(response.statusCode === 200){
        this.customer_name = response.data![0].cname;
      }
    })
  }

  saveCustomer(customer:Customer){
    this.fetchService.saveCustomer(customer).subscribe((response:CustomerResponse)=>{
      if(response.statusCode === 200){
        window.location.reload();
      }
    })
  }

  updateCustomer(customer:Customer){
    this.fetchService.updateCustomer(customer,this.c_id).subscribe((response:CustomerResponse)=>{
      if(response.statusCode === 200){
        window.location.reload();
      }
    })
  }

}
