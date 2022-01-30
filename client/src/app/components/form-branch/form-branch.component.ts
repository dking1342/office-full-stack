import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, of, startWith } from 'rxjs';
import { Requeststatus } from 'src/app/enums/requeststatus';
import { Status } from 'src/app/enums/status';
import { FetchService } from 'src/app/services/fetch.service';
import { Branch, FetchResponse, ResponseAppState, responseContent } from 'src/types/general';

@Component({
  selector: 'app-form-branch',
  templateUrl: './form-branch.component.html',
  styleUrls: ['./form-branch.component.css']
})
export class FormBranchComponent implements OnInit {
  @Input() type = "";
  @Input() data:ResponseAppState<FetchResponse<Branch>> = {dataState:Requeststatus.LOADED,appData:{}};

  @Output() closeForm = new EventEmitter();
  @Output() refreshForm = new EventEmitter<FetchResponse<Branch>>();

  // reactive form state
  form = this.fb.group({
    branch_id:[""],
    location:["",Validators.required],
    branchStatus:["",Validators.required]
  });

  // reactive select state
  selectForm = this.fb.group({
    status:[null,Validators.required]
  })

  locationStatus: Status[] = [];

  // validation state
  submitted:boolean = false;
  isFormField:boolean = true;
  
  // view specific id
  b_id = this.router.url.split("/")[this.router.url.split("/").length - 1];

  // observables
  appStateForm$!: Observable<ResponseAppState<FetchResponse<Branch>>>;
  saveSubject = new BehaviorSubject<FetchResponse<Branch>>(responseContent);
  isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingSubject.asObservable();
  readonly DataState = Requeststatus;

  constructor(
    private router: Router,
    private fetchService:FetchService,
    private fb: FormBuilder,
  ) { }

  // getters for select state
  get status(){ return this.selectForm.get("status")};

  // getters for form state
  get location(){ return this.form.get("location")};
  get branchStatus(){ return this.form.get("branchStatus")};

  ngOnInit(): void {
    Object.values(Status).map(v=> this.locationStatus.push(v));

    if(this.type === "edit"){
      this.form = this.fb.group({
        branch_id:this.data.appData!.data![0].branch_id,
        location:this.data.appData!.data![0].location,
        branchStatus:this.data.appData!.data![0].branchStatus
      });
    }
  }

  submitForm(){
    this.submitted = true;
    if(this.type === "save" && this.form.valid){
      this.saveBranch(this.form.value);
    }
    if(this.type === "edit" && this.form.valid){
      this.updateBranch(this.form.value,this.b_id);
    }
  }

  saveBranch(branch:Branch){
    this.isLoadingSubject.next(true);
    this.appStateForm$ = this.fetchService.saveBranch$(branch)
      .pipe(
        map(res=>{
          this.saveSubject.next(res);
          this.isLoadingSubject.next(false);
          this.closeForm.emit();
          this.refreshForm.emit(res);
          return {
            dataState:Requeststatus.LOADED,
            appData:this.saveSubject.value
          }
        }),
        startWith({
          dataState:Requeststatus.LOADING
        }),
        catchError((error:string)=>{
          this.isLoadingSubject.next(false);
          return of({
            dataState:Requeststatus.ERROR,
            error
          })
        })
      )
  }

  updateBranch(branch:Branch,id:string){
    this.isLoadingSubject.next(true);
    this.appStateForm$ = this.fetchService.updateBranch$(branch,id)
      .pipe(
        map(res=>{
          this.saveSubject.next(res);
          this.isLoadingSubject.next(false);
          this.closeForm.emit();
          this.refreshForm.emit(res);
          return {
            dataState:Requeststatus.LOADED,
            appData:this.saveSubject.value
          }
        }),
        startWith({
          dataState:Requeststatus.LOADING
        }),
        catchError((error:string)=>{
          this.isLoadingSubject.next(false);
          return of({
            dataState:Requeststatus.ERROR,
            error
          })
        })
      )
  }

  changeStatus(){
    this.branchStatus?.setValue(this.status?.value);
  }




}
