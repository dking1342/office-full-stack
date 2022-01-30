import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { BehaviorSubject, catchError, filter, map, of } from 'rxjs';
import { Requeststatus } from 'src/app/enums/requeststatus';
import { Roles } from 'src/app/enums/roles';
import { FetchService } from 'src/app/services/fetch.service';
import { ADD_EMPLOYEE, UPDATE_EMPLOYEE } from 'src/app/store/actions/employeeActions';
import { selectEmployeeFilteredData, selectEmployeeDataState, selectEmployeeError, selectEmployeeFormData } from 'src/app/store/selectors/employeeSelector';
import { Branch, Employee, FetchResponse, ResponseAppState } from 'src/types/general';

@Component({
  selector: 'app-form-emps',
  templateUrl: './form-emps.component.html',
  styleUrls: ['./form-emps.component.css']
})
export class FormEmpsComponent implements OnInit {
  @Input() type = "";

  @Output() refreshForm = new EventEmitter<void>();
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
    branchDropDown:[null,Validators.required]
  });

  // validation state
  submitted:boolean = false;
  isFormField:boolean = true;

  // view specific id
  employee_id = this.router.url.split("/")[this.router.url.split("/").length - 1];

  // observables
  branchList = new BehaviorSubject<Branch[]>([]);
  branchList$ = this.branchList.asObservable();
  state$ = this.store.select(state=>state);
  data$ = this.store.select(selectEmployeeFilteredData);
  loadState$ = this.store.select(selectEmployeeDataState);
  error$ = this.store.select(selectEmployeeError);
  readonly DataState = Requeststatus;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private fetchService: FetchService,
    private store: Store<ResponseAppState<FetchResponse<Employee>>>
  ) { }

  // getters for select state
  get branchDropDown(){ return this.selectForm.get("branchDropDown")};

  // getters for form state
  get firstName(){ return this.form.get("firstName")};
  get lastName(){ return this.form.get("lastName")};
  get role(){ return this.form.get("role")};
  get branch_id(){ return this.form.controls['branch'].get("branch_id") };
  get location(){ return this.form.controls['branch'].get("location") };
  get branchStatus(){ return this.form.controls['branch'].get("branchStatus") };

  // lifecycle hooks
  ngOnInit(): void {
    if(this.type === "save"){
      this.getBranches();
    }
    if(this.type === "edit"){
      this.getBranches();
      this.store
        .select(selectEmployeeFormData({id:this.employee_id}))
        .forEach(item=>{
          item?.forEach(val=>{
            this.form = this.fb.group({
              id:[val.id],
              firstName:[val.firstName],
              lastName:[val.lastName],
              role:[val.role],
              branch:this.fb.group({
                branch_id:[val.branch.branch_id],
                location:[val.branch.location],
                branchStatus:[val.branch.branchStatus]
              })
            });
          })          
        });
    }
    Object.values(Roles).map(v=> this.roles.push(v));
  }

  // methods
  submitForm(){
    this.submitted = true;
    if(this.type === "save" && this.form.valid){
      this.onAddEmployee(this.form.value);
    }
    if(this.type === "edit" && this.form.valid){
      this.onUpdateEmployee(this.form.value,this.employee_id);
    }
  }

  // get branches
  getBranches(){
    this.branchList$ = this.fetchService.getBranches$("branches/list")
      .pipe(
        map(res=>{
          return res.data!.flat(1);
        }),
        catchError(()=>{
          return of([]);
        })
      )
  }

  // save employee
  onAddEmployee(employee:Employee){
    this.store.dispatch(ADD_EMPLOYEE({employee}));
    this.closeForm.emit();
    this.refreshForm.emit();

  }

  // update employee
  onUpdateEmployee(employee:Employee,id:string){
    this.store.dispatch(UPDATE_EMPLOYEE({employee,id}));
    this.closeForm.emit();
    this.refreshForm.emit();
  }

  // change branch
  changeBranch(){
    this.branch_id?.setValue(this.branchDropDown?.value.branch_id);
    this.location?.setValue(this.branchDropDown?.value.location);
    this.branchStatus?.setValue(this.branchDropDown?.value.branchStatus);
  }

}
