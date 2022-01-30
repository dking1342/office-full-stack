import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, catchError, map, Observable, of, startWith, Subject } from 'rxjs';
import { Requeststatus } from 'src/app/enums/requeststatus';
import { FetchService } from 'src/app/services/fetch.service';
import { GET_EMPLOYEES } from 'src/app/store/actions/employeeActions';
import { Employee, FetchResponse, ResponseAppState, responseContent } from 'src/types/general';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  
  appState$!: Observable<ResponseAppState<FetchResponse<Employee>>>;
  isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingSubject.asObservable();
  dataSubject = new BehaviorSubject<FetchResponse<Employee>>(responseContent);
  readonly DataState = Requeststatus;

  showAddForm: boolean = false;
  showEditForm: boolean = false;
  formType:string = "";
  isAll:boolean = false;
  title:string = "";
  isSortAsc:boolean = true;
  url:string = this.router.url.toString().slice(1,);

  constructor(
    private fetchService: FetchService,
    private router: Router,
    private store: Store<ResponseAppState<Employee>>
  ) { }
  state$ = this.store.select(state=>state);
  employeeState = new Subject<ResponseAppState<FetchResponse<Employee>>>();
  employeeState$ = this.employeeState.asObservable();
  
  
  onGetEmployees(){
    this.store.dispatch(GET_EMPLOYEES({url:"employees/list"})); 

    this.state$.forEach(observer =>{
      let data = Object.values(observer).map(item=>item)[0];
      this.employeeState.next(data);      
    })
  }

  ngOnInit(): void {
    this.getData(this.url.split("/").length); 
  }

  getData(urlLength:number){
    let urlPath = urlLength === 1 ? `${this.url}/list` : `${this.url.split("/")[0]}/get/${this.url.split("/")[1]}`
    urlLength === 1 ? this.formType = "save" : this.formType = "edit";
    urlLength === 1 ? this.isAll = true : this.isAll = false;
    this.title = this.url.split("/")[0].toString().slice(0,1).toUpperCase() + this.url.split("/")[0].toString().slice(1,);
    this.getList(urlPath);
  }

  getList(path:string){
    this.isLoadingSubject.next(true);
    this.appState$ = this.fetchService.getEmployees$(path)
      .pipe(
        map(res => {
          this.isLoadingSubject.next(false);
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

  deleteEmployee(id:string){
    let isDelete = confirm("Are you sure you want to delete this employee?");
    if(isDelete){
      this.isLoadingSubject.next(true);
      this.appState$ = this.fetchService.deleteEmployee$(id)
        .pipe(
          map(res=>{
            this.isLoadingSubject.next(false);
            this.router.navigate(['employees']);
            return {
              dataState:Requeststatus.LOADED,
              appData:{
                ...res
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
  refreshEmployeeView(response:FetchResponse<Employee>){
    if(response.statusCode === 200){
      this.getData(this.url.split("/").length);
    }
  }

}
