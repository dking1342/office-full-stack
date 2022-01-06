import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FetchService } from 'src/app/services/fetch.service';
import { Customer, CustomerResponse } from 'src/types/general';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  customers:Customer[] = [];
  showAddForm: boolean = false;
  formType:string = "save";

  constructor(private router: Router,private fetchService:FetchService) { }

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers(){
    this.fetchService.getCustomerList().subscribe((response:CustomerResponse)=>{
      if(response.statusCode === 200){
        this.customers = response.data!.flat(1);
      }
    })
  }

  getInfo(id:string){
    this.router.navigate(['customer',id])
  }

  showForm(){
    this.showAddForm = !this.showAddForm;
  }
}
