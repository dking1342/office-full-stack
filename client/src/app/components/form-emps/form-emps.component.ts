import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Roles } from 'src/app/enums/roles';
import { Employee, FetchResponse } from 'src/types/general';

@Component({
  selector: 'app-form-emps',
  templateUrl: './form-emps.component.html',
  styleUrls: ['./form-emps.component.css']
})
export class FormEmpsComponent implements OnInit {
  @Input() type = "";

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
    branchDropDown:[null,Validators.required]
  });

  // validation state
  submitted:boolean = false;
  isFormField:boolean = true;

  // view specific id
  employee_id = this.router.url.split("/")[this.router.url.split("/").length - 1];


  constructor(
    private fb: FormBuilder,
    private router: Router
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
      console.log("save")
    }
    if(this.type === "edit"){
      console.log("edit")
    }
    Object.values(Roles).map(v=> this.roles.push(v));
  }

  // methods
  submitForm(){
    console.log("submit form")
  }

  // get branches
  // save employee
  // update employee


  // change branch
  changeBranch(){
    this.branch_id?.setValue(this.branchDropDown?.value.branch_id);
    this.location?.setValue(this.branchDropDown?.value.location);
    this.branchStatus?.setValue(this.branchDropDown?.value.branchStatus);
  }

}
