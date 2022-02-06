import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Requeststatus } from 'src/app/enums/requeststatus';
import { GET_BRANCH, GET_BRANCHES, GET_BRANCHES_SUCCESS } from 'src/app/store/actions/branchActions';
import { selectBranchDataState, selectBranchError, selectBranchFilteredBranchData } from 'src/app/store/selectors/branchSelectors';
import { Branch, FetchResponse, ResponseAppState } from 'src/types/general';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css']
})
export class BranchComponent implements OnInit {

  // observables
  data$ = this.store.select(selectBranchFilteredBranchData);
  loadState$ = this.store.select(selectBranchDataState);
  error$ = this.store.select(selectBranchError);
  readonly DataState = Requeststatus;

  // state for view
  showAddForm: boolean = false;
  showEditForm: boolean = false;
  formType:string = "";
  isAll:boolean = false;
  title:string = "";
  url:string = this.router.url.toString().slice(1,);
  branch_id = this.router.url.split("/")[this.router.url.split("/").length - 1];


  constructor(
    private store:Store,
    private router:Router
  ) { }

  // lifecycle hooks
  ngOnInit(): void {
    this.getData(this.url.split("/").length);
  }

  // methods
  getData(urlLength:number){
    let urlPath = urlLength === 1 ? `${this.url}/list` : `${this.url.split("/")[0]}/get/${this.url.split("/")[1]}`
    urlLength === 1 ? this.formType = "save" : this.formType = "edit";
    urlLength === 1 ? this.isAll = true : this.isAll = false;
    this.title = this.url.split("/")[0].toString().slice(0,1).toUpperCase() + this.url.split("/")[0].toString().slice(1,);
    this.onGetBranches(urlPath,urlLength);
  }

  onGetBranches(url:string,urlLength:number){
    if(localStorage.getItem("branches")){
      let localState:ResponseAppState<FetchResponse<Branch>> = JSON.parse(localStorage.getItem("branches")!);

      if(urlLength === 1){
        this.store.dispatch(GET_BRANCHES_SUCCESS({res:localState}));
      }
      if(urlLength > 1){
        let matchingBranch = localState.filteredBranchData?.filter(val=>val.branch_id === this.branch_id);

        if(matchingBranch?.length){
          let response = {
            ...localState,
            filteredBranchData:matchingBranch
          }
          this.store.dispatch(GET_BRANCH({res:response}));
        } else {
          alert("No matches found");
          this.router.navigate(["branches"]);
        }
      }
    } else {
      this.store.dispatch(GET_BRANCHES({url}));
    }
  }

  getInfo(id:string){
    this.router.navigate([this.url,id]);
  }

  closeAddForm(){
    this.showAddForm = !this.showAddForm;
  }
  closeEditForm(){
    this.showEditForm = !this.showEditForm;
  }
  refreshBranchView(){
    this.getData(this.url.split("/").length);
  }

}
