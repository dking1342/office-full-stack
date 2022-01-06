import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FetchService } from 'src/app/services/fetch.service';
import { Branch, BranchResponse } from 'src/types/general';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css']
})
export class BranchComponent implements OnInit {

  showEditForm = false;
  branch:Branch[] = [];
  formType:string = "edit";
  b_id = this.router.url.split("/")[this.router.url.split("/").length - 1];

  constructor(
    private router: Router,
    private fetchService: FetchService
  ) { }

  ngOnInit(): void {
    this.getBranch(this.b_id);
  }

  getBranch(id:string){
    this.fetchService.getBranch(id).subscribe((response:BranchResponse)=>{
      if(response.statusCode === 200){
        this.branch = response.branchData!;
      }
    })
  }

  editBranch(){
    this.showEditForm = !this.showEditForm;
  }

}
