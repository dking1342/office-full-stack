import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FetchService } from 'src/app/services/fetch.service';
import { Employee, EmployeesResponse } from 'src/types/general';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  showEditForm = false;
  employee:Employee[] = [];
  formType:string = "edit";
  employee_id = this.router.url.split("/")[this.router.url.split("/").length - 1];
  
  constructor(
    private fetchService:FetchService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getEmployee(this.employee_id);

  }

  getEmployee(id:string){
    this.fetchService.getEmployee(id).subscribe((response:EmployeesResponse)=>{
      if(response.statusCode === 200){
        this.employee = response.employeeData!;
      }
    })
  }

  deleteEmployee(id:string){
    let isDeleted = confirm("Are you sure you want to delete this employee?");
    if(isDeleted){
      this.fetchService.deleteEmployee(id).subscribe((response:EmployeesResponse)=>{
        if(response.statusCode === 200 && response.employeeBoolData){
          this.router.navigate(['employees']);
        } else {
          alert("Not able to delete employee. Please try again")
        }
      })
    }
  }

  editEmployee(){
    this.showEditForm = !this.showEditForm;
  }

}
