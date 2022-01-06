import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FetchService } from 'src/app/services/fetch.service';
import { Branch, EmployeesResponse } from 'src/types/general';

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.css']
})
export class BranchesComponent implements OnInit {

  branches:Branch[] = [];
  showAddForm: boolean = false;
  formType:string = "save";
  constructor(
    private fetchService: FetchService, 
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getBranches();
  }

  getInfo(id:string){
    this.router.navigate(['branch',id])
  }

  getBranches(){
    this.fetchService.getBranchList().subscribe((response:EmployeesResponse)=>{
      if(response.statusCode === 200){
        this.branches = response.branchData!.flat(1);
      }
    });
  }

  showForm(){
    this.showAddForm = !this.showAddForm;
  }

}
