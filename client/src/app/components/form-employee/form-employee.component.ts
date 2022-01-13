import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Roles } from 'src/app/enums/roles';
import { Router } from '@angular/router';
import { FetchService } from 'src/app/services/fetch.service';
import { Branch, BranchResponse, Employee, EmployeesResponse, FetchResponse, responseContent } from 'src/types/general';
import { Requeststatus } from 'src/app/enums/requeststatus';
import { Appstate } from 'src/app/interfaces/appstate';
import { BehaviorSubject, catchError, map, Observable, of, startWith } from 'rxjs';

@Component({
  selector: 'app-form-employee',
  templateUrl: './form-employee.component.html',
  styleUrls: ['./form-employee.component.css']
})
export class FormEmployeeComponent implements OnInit {

  @Input() type = "";
  @Input() appState:Appstate<FetchResponse<Employee>> = {dataState:Requeststatus.LOADED,appData:{}};
  
  @Output() formRefresh = new EventEmitter<FetchResponse<Employee>>();
  @Output() closeForm = new EventEmitter<void>();
  @Output() closeTableForm = new EventEmitter<void>();
  @Output() tableFormRefresh = new EventEmitter<FetchResponse<Employee>>();

  firstName: string = "";
  lastName: string = "";
  selectedBranch: string = "";
  selectedRole: string = "";
  roles: Roles[] = [];
  branchs: Branch[] = [];
  employee_id = this.router.url.split("/")[this.router.url.split("/").length - 1];

  public appStateForm$!: Observable<Appstate<FetchResponse<Employee>>>;
  saveSubject = new BehaviorSubject<FetchResponse<Employee>>(responseContent);
  isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingSubject.asObservable();
  readonly FetchStatus = Requeststatus;


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
      this.firstName = this.appState.appData!.data![0].firstName;
      this.lastName = this.appState.appData!.data![0].lastName;
      this.selectedRole = this.appState.appData!.data![0].role;
      this.selectedBranch = this.appState.appData!.data![0].branch.branch_id;
    }
    Object.values(Roles).map(v=> this.roles.push(v));
  }

  checkResponse(response:FetchResponse<Employee>){
    this.formRefresh.emit(response);
  }

  checkTableReponse(response:FetchResponse<Employee>){
    this.tableFormRefresh.emit(response);
  }

  checkFormStatus(){
    this.closeForm.emit();
  }

  checkTableFormStatus(){
    this.closeTableForm.emit();
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
      this.saveEmployee(body);
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

  getBranches(){
    this.fetchService.getBranchList().subscribe((response:BranchResponse)=>{
      if(response.statusCode === 200){
        this.branchs = response.data!.flat(1);
      }
    })
  }

  saveEmployee(employee:Employee){
    this.isLoadingSubject.next(true);    
    this.appStateForm$ = this.fetchService.saveEmployee$(employee)
      .pipe(
        map(res=>{
            this.saveSubject.next(res);
            this.isLoadingSubject.next(false);
            this.checkResponse(res);
            this.checkFormStatus();
            return {
              dataState:Requeststatus.LOADED,
              appData:this.saveSubject.value
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

  updateEmployee(employee:Employee){
    this.isLoadingSubject.next(true);
    this.appStateForm$ = this.fetchService.updateEmployee$(employee,this.employee_id)
      .pipe(
        map(res =>{
          this.saveSubject.next(res);this.isLoadingSubject.next(false);
          this.checkTableReponse(res);
          this.checkTableFormStatus();
          return {
            dataState:Requeststatus.LOADED,
            appData:this.saveSubject.value
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

}
