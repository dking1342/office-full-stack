import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, of, startWith } from 'rxjs';
import { Requeststatus } from 'src/app/enums/requeststatus';
import { Roles } from 'src/app/enums/roles';
import { FetchService } from 'src/app/services/fetch.service';
import { Branch, Employee, FetchResponse, ResponseAppState, responseContent } from 'src/types/general';

@Component({
  selector: 'app-form-employee',
  templateUrl: './form-employee.component.html',
  styleUrls: ['./form-employee.component.css']
})
export class FormEmployeeComponent implements OnInit {
  @Input() type = "";
  @Input() data:ResponseAppState<FetchResponse<Employee>> = {dataState:Requeststatus.LOADED,appData:{}};
  
  @Output() refreshForm = new EventEmitter<FetchResponse<Employee>>();
  @Output() closeForm = new EventEmitter<void>();

  // reactive form state
  form = this.fb.group({
    id:[""],
    firstName:["",Validators.required],
    lastName:["",Validators.required],
    role:["",Validators.required],
    branch:this.fb.group({
      branch_id:["",Validators.required],
      location:["",Validators.required],
      branchStatus:["",Validators.required]
    })
  });
  roles: Roles[] = [];

  // reactive form state -- select elements
  selectForm = this.fb.group({
    branchDrop:[null,Validators.required]
  })

  // validation state
  submitted:boolean = false;
  isFormField:boolean = true;

  // view specific id
  employee_id = this.router.url.split("/")[this.router.url.split("/").length - 1];

  // observables
  appStateForm$!: Observable<ResponseAppState<FetchResponse<Employee>>>;
  saveSubject = new BehaviorSubject<FetchResponse<Employee>>(responseContent);
  isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingSubject.asObservable();
  readonly DataState = Requeststatus;

  appStateBranch$!: Observable<ResponseAppState<FetchResponse<Branch>>>;
  branchList = new BehaviorSubject<Branch[]>([]);
  branchList$ = this.branchList.asObservable();

  constructor(
    private fetchService: FetchService,
    private router: Router,
    private fb:FormBuilder,
  ) { }

  // getters for select form state
  get branchDrop(){ return this.selectForm.get("branchDrop")};

  // getters for form state
  get firstName(){ return this.form.get("firstName")};
  get lastName(){ return this.form.get("lastName")};
  get role(){ return this.form.get("role")};
  get branch_id(){ return this.form.controls['branch'].get("branch_id") };
  get location(){ return this.form.controls['branch'].get("location") };
  get branchStatus(){ return this.form.controls['branch'].get("branchStatus") };

  ngOnInit(): void {
    if(this.type === "save"){
      this.getBranches();
    }
    if(this.type === "edit"){
      this.getBranches();
      this.form = this.fb.group({
        id:[this.data.appData!.data![0].id],
        firstName:[this.data.appData!.data![0].firstName],
        lastName:[this.data.appData!.data![0].lastName],
        role:[this.data.appData!.data![0].role],
        branch:this.fb.group({
          branch_id:[this.data.appData!.data![0].branch.branch_id],
          location:[this.data.appData!.data![0].branch.location],
          branchStatus:[this.data.appData!.data![0].branch.branchStatus]
        })
      });
    }
    Object.values(Roles).map(v=> this.roles.push(v));
  }

  submitForm(){
    this.submitted = true;
    if(this.type === "save" && this.form.valid){
      this.saveEmployee(this.form.value);
    }
    if(this.type === "edit" && this.form.valid){
      this.updateEmployee(this.form.value,this.employee_id);
    }
  }

  getBranches(){
    this.isLoadingSubject.next(true);
    this.branchList$ = this.fetchService.getBranches$("branches/list")
      .pipe(
        map(res=>{
          this.isLoadingSubject.next(false); 
          return res.data!.flat(1);
        }),
        catchError(()=>{
          this.isLoadingSubject.next(false);
          return of([]);
        })
      )
  }

  saveEmployee(employee:Employee){
    this.isLoadingSubject.next(true);    
    this.appStateForm$ = this.fetchService.saveEmployee$(employee)
      .pipe(
        map(res=>{
            this.isLoadingSubject.next(false);
            this.closeForm.emit();
            this.refreshForm.emit(res);
            return {
              dataState:Requeststatus.LOADED,
              appData:{
                ...res,
                data:res.data!.flat(1)
              }
            }
          }),
          startWith({
            dataState:Requeststatus.LOADING,
            appData:this.saveSubject.value
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

  updateEmployee(employee:Employee,id:string){
    this.isLoadingSubject.next(true);
    this.appStateForm$ = this.fetchService.updateEmployee$(employee,id)
      .pipe(
        map(res =>{
          this.isLoadingSubject.next(false);
          this.closeForm.emit();
          this.refreshForm.emit(res);
          return {
            dataState:Requeststatus.LOADED,
            appData:{
              ...res,
              data:res.data!.flat(1)
            }
          }          
        }),
        startWith({
          dataState:Requeststatus.LOADING,
          appData:this.saveSubject.value
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

  changeBranch(){
    this.branch_id?.setValue(this.branchDrop?.value.branch_id);
    this.location?.setValue(this.branchDrop?.value.location);
    this.branchStatus?.setValue(this.branchDrop?.value.branchStatus);
  }

}
