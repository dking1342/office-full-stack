import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, of, startWith } from 'rxjs';
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

  formState:Employee = {
    id:"",
    firstName:"",
    lastName:"",
    role:"",
    branch:{branch_id:"",location:"",branchStatus:""}
  }
  employee_id = this.router.url.split("/")[this.router.url.split("/").length - 1];

  roles: Roles[] = [];

  appStateForm$!: Observable<Appstate<FetchResponse<Employee>>>;
  saveSubject = new BehaviorSubject<FetchResponse<Employee>>(responseContent);
  isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingSubject.asObservable();
  readonly DataState = Requeststatus;

  appStateBranch$!: Observable<Appstate<FetchResponse<Branch>>>;
  branchList = new BehaviorSubject<BranchRadio[]>([]);
  branchList$ = this.branchList.asObservable();
  branchRadio:BranchRadio[] = [];

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
      this.formState = {
        ...this.formState,
        id:this.employee_id,
        firstName:this.data.appData!.data![0].firstName,
        lastName:this.data.appData!.data![0].lastName,
        role:this.data.appData!.data![0].role,
        branch:this.data.appData!.data![0].branch
      }
    }
    Object.values(Roles).map(v=> this.roles.push(v));
  }


  submitForm(){
    if(this.type === "save"){
      this.saveEmployee(this.formState);
    }
    if(this.type === "edit"){
      this.updateEmployee(this.formState,this.employee_id);
    }
  }

  getBranches(){
    this.isLoadingSubject.next(true);
    this.appStateBranch$ = this.fetchService.getBranches$("branches/list")
      .pipe(
        map(res=>{
          this.isLoadingSubject.next(false); 
          if(Object.values(this.data.appData!).length){
            res.data?.flat(1).forEach(item=>{
              let isChecked = false;
              if(this.data.appData?.data![0].branch.branch_id === item.branch_id){
                isChecked = true;
              }
              this.branchRadio.push({
                branch_id:item.branch_id,
                location:item.location,
                branchStatus:item.branchStatus,
                isChecked
              })
            })
            this.branchList.next(this.branchRadio);
          } else {
            res.data?.flat(1).forEach(item=>{
              this.branchRadio.push({
                branch_id:item.branch_id,
                location:item.location,
                branchStatus:item.branchStatus,
                isChecked:false
              })
            })
            this.branchList.next(this.branchRadio);
          }
          return {
            dataState:Requeststatus.LOADED,
            appData:{
              ...res,
              data:res.data!.flat(1)
            }
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

  checkRadio(branch:Branch,e:any){
    this.formState.branch = {
      ...this.formState.branch,
      branch_id:branch.branch_id,
      location:branch.location,
      branchStatus:branch.branchStatus
    };
  }

}
