import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, of, startWith } from 'rxjs';
import { Requeststatus } from 'src/app/enums/requeststatus';
import { Routes } from 'src/app/enums/routes';
import { Appstate } from 'src/app/interfaces/appstate';
import { FetchService } from 'src/app/services/fetch.service';
import { Employee, FetchResponse, responseContent } from 'src/types/general';

@Component({
  selector: 'app-table-employees',
  templateUrl: './table-employees.component.html',
  styleUrls: ['./table-employees.component.css']
})
export class TableEmployeesComponent implements OnInit {

  @Input() appState:Appstate<FetchResponse<Employee>> = {dataState:Requeststatus.LOADED,appData:{}};
  @Input() isAll = false;
  @Input() type = "";

  @Output() formRefresh = new EventEmitter<FetchResponse<Employee>>();
  @Output() closeForm = new EventEmitter<void>();

  showForm:boolean = false;
  readonly DataRoutes = Routes;
  url:string = this.router.url.toString().slice(1,);
  emptyResponse:FetchResponse<Employee> = {};

  public appStateTable$!: Observable<Appstate<FetchResponse<Employee>>>;
  readonly DataState = Requeststatus;
  dataSubject = new BehaviorSubject<FetchResponse<Employee>>(responseContent);
  isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingSubject.asObservable();

  constructor(
    private router: Router,
    private fetchService: FetchService
  ) { }

  ngOnInit(): void {

  }

  getInfo(id:string){
    this.router.navigate([this.url,id])
  }

  closeTableFormAction(){
    this.showForm = !this.showForm;
  }

  tableRefreshToEmployees(res:FetchResponse<Employee>){
    this.formRefresh.emit(res);
  }

  deleteEmployee(id:string){
    let isDeleted = confirm("Are you sure you want to delete this employee?");
    if(isDeleted){
      this.isLoadingSubject.next(true);
      this.appStateTable$ = this.fetchService.deleteEmployee$(id)
        .pipe(
          map(res=>{
            this.dataSubject.next(res);
            this.isLoadingSubject.next(false);
            this.tableRefreshToEmployees(res);
            this.router.navigate(['employees']);
            return {
              dataState:Requeststatus.LOADED,
              appData:{
                ...res,
                boolData:res.boolData
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
}
