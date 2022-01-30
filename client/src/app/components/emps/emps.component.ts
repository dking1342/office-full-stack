import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Requeststatus } from 'src/app/enums/requeststatus';
import { DELETE_EMPLOYEE, GET_EMPLOYEES, GET_EMPLOYEES_SAVED, GET_EMPLOYEES_SUCCESS } from 'src/app/store/actions/employeeActions';
import { selectEmployeeDataState, selectEmployeeError, selectEmployeeFilteredData } from 'src/app/store/selectors/employeeSelector';
import { Employee, FetchResponse, ResponseAppState } from 'src/types/general';

@Component({
  selector: 'app-emps',
  templateUrl: './emps.component.html',
  styleUrls: ['./emps.component.css']
})
export class EmpsComponent implements OnInit {

  // observables
  state$ = this.store.select(state=>state);
  data$ = this.store.select(selectEmployeeFilteredData);
  loadState$ = this.store.select(selectEmployeeDataState);
  error$ = this.store.select(selectEmployeeError);
  readonly DataState = Requeststatus;

  // state for view
  showAddForm: boolean = false;
  showEditForm: boolean = false;
  formType:string = "";
  isAll:boolean = false;
  title:string = "";
  url:string = this.router.url.toString().slice(1,);
  employee_id = this.router.url.split("/")[this.router.url.split("/").length - 1];

  constructor(
    private router:Router,
    private store: Store<ResponseAppState<Employee>>,
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
    this.onGetEmployees(urlPath,urlLength);
  }

  onGetEmployees(url:string,urlLength:number){
    // if localstorage is null
    if(localStorage.getItem('employees')){
      // localstorage state
      let localState:ResponseAppState<FetchResponse<Employee>> = JSON.parse(localStorage.getItem('employees')!);

      if(urlLength === 1){
        // if localstorage and all 
        this.store.dispatch(GET_EMPLOYEES_SUCCESS({res:localState}))
      }
      if(urlLength > 1){
        // if localstorage and single
        let matchingEmployee = localState.filteredData!.filter(val=> val.id === this.employee_id);

        if(matchingEmployee?.length){
          let responseData = {
            ...localState,
            filteredData:matchingEmployee
          };
          this.store.dispatch(GET_EMPLOYEES_SAVED({res:responseData}));
        } else {
          alert("No matches found");
          this.router.navigate(["employees"]);
        }
      }
    } else {
      this.store.dispatch(GET_EMPLOYEES({url})); 
    }
  }

  onDelete(id:string){
    if(confirm("Are you sure you want to delete this employee?")){
      this.store.dispatch(DELETE_EMPLOYEE({id}));
      this.router.navigate(['employees']);
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
  refreshEmployeeView(){
    this.getData(this.url.split("/").length);
  }

}
