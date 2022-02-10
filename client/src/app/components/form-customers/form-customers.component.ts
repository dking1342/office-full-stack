import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Requeststatus } from 'src/app/enums/requeststatus';
import { ADD_CUSTOMER, UPDATE_CUSTOMER } from 'src/app/store/actions/customerActions';
import { selectCustomerDataState, selectCustomerError, selectCustomerFilteredCustomerData, selectCustomerFormData } from 'src/app/store/selectors/customerSelectors';
import { Customer, FetchResponse, ResponseAppState } from 'src/types/general';

@Component({
  selector: 'app-form-customers',
  templateUrl: './form-customers.component.html',
  styleUrls: ['./form-customers.component.css','../../app.component.css']
})
export class FormCustomersComponent implements OnInit {
  @Input() type:string = "";

  @Output() refreshForm = new EventEmitter<void>();
  @Output() closeForm = new EventEmitter<void>();

  // reactive form state
  form = this.fb.group({
    customer_id:[""],
    cname:["",Validators.required]
  });

  // validation state
  submitted:boolean = false;
  isFormField:boolean = true;

  // view specific id 
  c_id = this.router.url.split("/")[this.router.url.split("/").length - 1];

  // observabes
  data$ = this.store.select(selectCustomerFilteredCustomerData);
  loadState$ = this.store.select(selectCustomerDataState);
  error$ = this.store.select(selectCustomerError);
  readonly DataState = Requeststatus;

  constructor(
    private fb: FormBuilder,
    private router:Router,
    private store: Store<ResponseAppState<FetchResponse<Customer>>>
  ) { }

  // getters for form state
  get cname(){ return this.form.get("cname")};

  // lifecycle hooks
  ngOnInit(): void {
    if(this.type === "edit"){
      this.store.select(selectCustomerFormData({id:this.c_id}))
        .forEach(item=>{
          item?.forEach(val=>{
            this.form = this.fb.group({
              customer_id:[val.customer_id],
              cname:[val.cname]
            })
          });
        });
    }
  }

  // methods
  submitForm(){
    this.submitted = true;
    if(this.type === "save" && this.form.valid){
      this.onSave(this.form.value);
    }
    if(this.type === "edit" && this.form.valid){
      this.onUpdate(this.form.value,this.c_id);
    }
  }

  // save
  onSave(customer:Customer){
    this.store.dispatch(ADD_CUSTOMER({customer}));
    this.closeForm.emit();
    this.refreshForm.emit();
  }

  // update
  onUpdate(customer:Customer,id:string){
    this.store.dispatch(UPDATE_CUSTOMER({customer,id}));
    this.closeForm.emit();
    this.refreshForm.emit();
  }


}
