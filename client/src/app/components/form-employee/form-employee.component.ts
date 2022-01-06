import { Component, OnInit, Input } from '@angular/core';
import { Roles } from 'src/app/enums/roles';
import { Router } from '@angular/router';
import { FetchService } from 'src/app/services/fetch.service';
import { Branch, BranchResponse, Employee, EmployeesResponse } from 'src/types/general';

@Component({
  selector: 'app-form-employee',
  templateUrl: './form-employee.component.html',
  styleUrls: ['./form-employee.component.css']
})
export class FormEmployeeComponent implements OnInit {
  @Input() type = "";
  firstName: string = "";
  lastName: string = "";
  selectedBranch: string = "";
  selectedRole: string = "";
  roles: Roles[] = [];
  branchs: Branch[] = [];
  employee_id = this.router.url.split("/")[this.router.url.split("/").length - 1];

  constructor(
    private fetchService: FetchService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    if(this.type === "save"){
      this.getBranches();
    }
    if(this.type === "edit"){
      this.getBranches();
      this.getEmployee();
    }
    this.roles.push(Roles.ADMIN);
    this.roles.push(Roles.MANAGER);
    this.roles.push(Roles.SALES);
  }

  getBranches(){
    this.fetchService.getBranchList().subscribe((response:BranchResponse)=>{
      if(response.statusCode === 200){
        this.branchs = response.branchData!.flat(1);
        
      }
    })
  }

  requestEmployee(employee:Employee){
    this.fetchService.saveEmployee(employee).subscribe((response:EmployeesResponse)=>{
      if(response.statusCode === 200){
        window.location.reload();
      }
    })
  }

  updateEmployee(employee:Employee){
    this.fetchService.updateEmployee(employee,this.employee_id).subscribe((response:EmployeesResponse)=>{
      if(response.statusCode === 200){
        window.location.reload();
      }
    })
  }

  getEmployee(){
    this.fetchService.getEmployee(this.employee_id).subscribe((response:EmployeesResponse)=>{
      if(response.statusCode === 200){
        this.firstName = response.employeeData![0].firstName;
        this.lastName = response.employeeData![0].lastName;
        this.selectedRole = response.employeeData![0].role;
        this.selectedBranch = response.employeeData![0].branch.branch_id;
      }
    })
  }

  submitForm(){
    const branchBody = this.branchs.filter(x=> x.branch_id === this.selectedBranch);
    let body:Employee;
    if(this.type === "save"){
      body = {
        "id":"",
        "firstName":this.firstName,
        "lastName":this.lastName,
        "role":this.selectedRole,
        "branch":branchBody[0]
      }
      this.requestEmployee(body);
    }
    if(this.type === "edit"){
      body = {
        "id":this.employee_id,
        "firstName":this.firstName,
        "lastName":this.lastName,
        "role":this.selectedRole,
        "branch":branchBody[0]
      }
      this.updateEmployee(body);
    }
  }

}
