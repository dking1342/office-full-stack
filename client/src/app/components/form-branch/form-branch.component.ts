import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Status } from 'src/app/enums/status';
import { FetchService } from 'src/app/services/fetch.service';
import { Branch, BranchResponse } from 'src/types/general';

@Component({
  selector: 'app-form-branch',
  templateUrl: './form-branch.component.html',
  styleUrls: ['./form-branch.component.css']
})
export class FormBranchComponent implements OnInit {
  @Input() type = "";
  location: string = "";
  selectedStatus: string = "";
  statuses: Status[] = [Status.OPEN,Status.CLOSED];
  b_id = this.router.url.split("/")[this.router.url.split("/").length - 1];

  constructor(
    private router: Router,
    private fetchService:FetchService
  ) { }

  ngOnInit(): void {
    if(this.type === "edit"){
      this.getBranch();
    }

  }

  submitForm(){
    let body: Branch;
    if(this.type === "save"){
      body = {
        branch_id:"",
        location:this.location.toUpperCase(),
        branchStatus: this.selectedStatus
      }
      this.saveBranch(body);
    }
    if(this.type === "edit"){
      body = {
        branch_id: this.b_id,
        location:this.location.toUpperCase(),
        branchStatus:this.selectedStatus
      }
      this.updateBranch(body);
    }
  }

  getBranch(){
    this.fetchService.getBranch(this.b_id).subscribe((response:BranchResponse)=>{
      if(response.statusCode === 200){
        this.location = response.branchData![0].location;
        this.selectedStatus = response.branchData![0].branchStatus;
      }
    })
  }

  saveBranch(branch:Branch){
    this.fetchService.saveBranch(branch).subscribe((response:BranchResponse)=>{
      if(response.statusCode === 200){
        window.location.reload();
      }
    })
  }

  updateBranch(branch:Branch){
    this.fetchService.updateBranch(branch,this.b_id).subscribe((response:BranchResponse)=>{
      if(response.statusCode === 200){
        window.location.reload();
      }
    })
  }




}
