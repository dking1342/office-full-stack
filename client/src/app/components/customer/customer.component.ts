import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Requeststatus } from 'src/app/enums/requeststatus';
import { DELETE_CUSTOMER, GET_CUSTOMER, GET_CUSTOMERS, GET_CUSTOMERS_SUCCESS } from 'src/app/store/actions/customerActions';
import { selectCustomerDataState, selectCustomerError, selectCustomerFilteredCustomerData } from 'src/app/store/selectors/customerSelectors';
import { Customer, FetchResponse, ResponseAppState } from 'src/types/general';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  // observables
  data$ = this.store.select(selectCustomerFilteredCustomerData);
  loadState$ = this.store.select(selectCustomerDataState);
  error$ = this.store.select(selectCustomerError);
  readonly DataState = Requeststatus;
  

  // state for view
  showAddForm: boolean = false;
  showEditForm: boolean = false;
  formType:string = "";
  isAll:boolean = false;
  title:string = "";
  url:string = this.router.url.toString().slice(1,);
  c_id = this.router.url.split("/")[this.router.url.split("/").length - 1];

  constructor(
    private router:Router,
    private store:Store
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
    this.onGetCustomers(urlPath,urlLength);
  }

  // get
  onGetCustomers(url:string,urlLength:number){
    // if localstorage is null
    if(localStorage.getItem('customers')){
      // localstorage state
      let localState:ResponseAppState<FetchResponse<Customer>> = JSON.parse(localStorage.getItem('customers')!);

      if(urlLength === 1){
        // if localstorage and all 
        this.store.dispatch(GET_CUSTOMERS_SUCCESS({res:localState}))
      }
      if(urlLength > 1){
        // if localstorage and single
        let matchingCustomer = localState.filteredCustomerData!.filter(val=> val.customer_id === this.c_id);

        if(matchingCustomer?.length){
          let response:ResponseAppState<FetchResponse<Customer>> = {
            ...localState,
            filteredCustomerData:matchingCustomer
          };
          this.store.dispatch(GET_CUSTOMER({res:response}));
        } else {
          alert("No matches found");
          this.router.navigate(["customers"]);
        }
      }
    } else {
      this.store.dispatch(GET_CUSTOMERS({url})); 
    }
  }

  // delete
  onDelete(id:string){
    if(confirm("Are you sure you want to delete this customer?")){
      this.store.dispatch(DELETE_CUSTOMER({id}));
      this.router.navigate(["customers"]);
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
