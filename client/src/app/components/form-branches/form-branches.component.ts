import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Requeststatus } from 'src/app/enums/requeststatus';
import { Status } from 'src/app/enums/status';
import { ADD_BRANCH, UPDATE_BRANCH } from 'src/app/store/actions/branchActions';
import { selectBranchDataState, selectBranchError, selectBranchFilteredBranchData, selectBranchFormData } from 'src/app/store/selectors/branchSelectors';
import { Branch } from 'src/types/general';

@Component({
  selector: 'app-form-branches',
  templateUrl: './form-branches.component.html',
  styleUrls: ['./form-branches.component.css']
})
export class FormBranchesComponent implements OnInit {
  @Input() type:string = "";

  @Output() refreshForm = new EventEmitter<void>();
  @Output() closeForm = new EventEmitter<void>();

  // reactive form state
  form = this.fb.group({
    branch_id:[""],
    location:["",Validators.required],
    branchStatus:["",Validators.required]
  });
  
  // reactive select state
  selectForm = this.fb.group({
    status:[null,Validators.required]
  });

  locationStatus: Status[] = [];

  // validation state
  submitted:boolean = false;
  isFormField:boolean = true;
  
  // view specific id
  b_id = this.router.url.split("/")[this.router.url.split("/").length - 1];

  // observables
  data$ = this.store.select(selectBranchFilteredBranchData);
  loadState$ = this.store.select(selectBranchDataState);
  error$ = this.store.select(selectBranchError);
  readonly DataState = Requeststatus;
  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store
  ) { }

  // getters for select state
  get status(){ return this.selectForm.get("status")};

  // getters for form state
  get location(){ return this.form.get("location")};
  get branchStatus(){ return this.form.get("branchStatus")};  

  // lifecycle hooks
  ngOnInit(): void {
    Object.values(Status).map(v=> this.locationStatus.push(v));

    if(this.type === "edit"){
      this.store.select(selectBranchFormData({id:this.b_id}))
        .forEach(item=>{
          item?.forEach(val=>{
            this.form = this.fb.group({
              branch_id:val.branch_id,
              location:val.location,
              branchStatus:val.branchStatus
            })
          })
        });
    }
  }

  // methods
  submitForm(){
    this.submitted = true;
    if(this.type === "save" && this.form.valid){
      this.onSave(this.form.value);
    }
    if(this.type === "edit" && this.form.valid){
      this.onUpdate(this.form.value,this.b_id);
    }
  }

  // save
  onSave(branch:Branch){
    this.store.dispatch(ADD_BRANCH({branch}));
    this.closeForm.emit();
    this.refreshForm.emit();
  }

  // update
  onUpdate(branch:Branch,id:string){
    this.store.dispatch(UPDATE_BRANCH({branch,id}));
    this.closeForm.emit();
    this.refreshForm.emit();
  }

  // changestatus
  changeStatus(){
    this.branchStatus?.setValue(this.status?.value);
  }



}
