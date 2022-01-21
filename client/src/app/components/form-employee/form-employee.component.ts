import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, combineLatest, combineLatestAll, filter, map, mapTo, Observable, of, startWith, tap } from 'rxjs';
import { Requeststatus } from 'src/app/enums/requeststatus';
import { Roles } from 'src/app/enums/roles';
import { Appstate } from 'src/app/interfaces/appstate';
import { FetchService } from 'src/app/services/fetch.service';
import { Branch, BranchRadio, Employee, FetchResponse, responseContent } from 'src/types/general';

@Component({
  selector: 'app-form-employee',
  templateUrl: './form-employee.component.html',
  styleUrls: ['./form-employee.component.css']
})
export class FormEmployeeComponent implements OnInit {
  @Input() type = "";
  @Input() data:Appstate<FetchResponse<Employee>> = {dataState:Requeststatus.LOADED,appData:{}};
  
  @Output() refreshForm = new EventEmitter<FetchResponse<Employee>>();
  @Output() closeForm = new EventEmitter<void>();

  // reactive form state
  form = this.fb.group({
    id:[""],
    firstName:["",Validators.required],
    lastName:["",Validators.required],
    role:["",Validators.required],
    branch:[null,Validators.required]
  });
  roles: Roles[] = [];

  // validation state
  submitted:boolean = false;
  isFormField:boolean = true;

  // view specific id
  employee_id = this.router.url.split("/")[this.router.url.split("/").length - 1];

  // observables
  appStateForm$!: Observable<Appstate<FetchResponse<Employee>>>;
  saveSubject = new BehaviorSubject<FetchResponse<Employee>>(responseContent);
  isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingSubject.asObservable();
  readonly DataState = Requeststatus;

  appStateBranch$!: Observable<Appstate<FetchResponse<Branch>>>;
  branchList = new BehaviorSubject<BranchRadio[]>([]);
  branchList$ = this.branchList.asObservable();
  radioBranchArray:BranchRadio[] = [];

  constructor(
    private fetchService: FetchService,
    private router: Router,
    private fb:FormBuilder,
  ) { }

  // getters for form state
  get firstName(){ return this.form.get("firstName")};
  get lastName(){ return this.form.get("lastName")};
  get role(){ return this.form.get("role")};
  get branch(){ return this.form.get("branch")};

  ngOnInit(): void {
    if(this.type === "save"){
      this.getBranches();
    }
    if(this.type === "edit"){
      this.getBranches();
      this.form.setValue({
        id:this.employee_id,
        firstName:this.data.appData!.data![0].firstName,
        lastName:this.data.appData!.data![0].lastName,
        role:this.data.appData!.data![0].role,
        branch:this.data.appData!.data![0].branch
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

          if(this.type === "save"){
            this.radioBranchArray = res.data!.flat(1).map(item=>{
              return {
                ...item,
                isChecked:false
              }
            });
          }

          if(this.type === "edit"){
            this.radioBranchArray = res.data!.flat(1).map(item=>{
              if(item.branch_id === this.data.appData!.data![0].branch.branch_id){
                return {
                  ...item,
                  isChecked:true
                }
              } else {
                return {
                  ...item,
                  isChecked:false
                }
              }
            })
          }
          this.branchList.next(this.radioBranchArray);
          return this.radioBranchArray;
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

  changeRadio(branch:Branch){
    this.form.patchValue({
      branch:{
        branch_id:branch.branch_id,
        location:branch.location,
        branchStatus:branch.branchStatus
      }
    })
  }

}
