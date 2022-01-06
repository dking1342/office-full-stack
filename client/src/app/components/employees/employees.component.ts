import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FetchService } from 'src/app/services/fetch.service';
import { EmployeesResponse, Employee } from 'src/types/general';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  
  employees:Employee[] = [];
  showAddForm: boolean = false;
  formType:string = "save";
  constructor(private fetchService: FetchService,private router: Router) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  getInfo(id:string){
    this.router.navigate(['employee',id])
  }

  getEmployees(){
    this.fetchService.getEmployeeList().subscribe((response:EmployeesResponse)=>{
      if(response.statusCode === 200){
        this.employees = response.employeeData!.flat(1);
      }
    })
  }

  showForm(){
    this.showAddForm = !this.showAddForm;
  }

}
