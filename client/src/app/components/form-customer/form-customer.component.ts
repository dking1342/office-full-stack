import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, of, startWith } from 'rxjs';
import { Requeststatus } from 'src/app/enums/requeststatus';
import { Appstate } from 'src/app/interfaces/appstate';
import { FetchService } from 'src/app/services/fetch.service';
import { Customer, FetchResponse, responseContent } from 'src/types/general';

@Component({
  selector: 'app-form-customer',
  templateUrl: './form-customer.component.html',
  styleUrls: ['./form-customer.component.css']
})
export class FormCustomerComponent implements OnInit {
  @Input() type = "";
  @Input() data:Appstate<FetchResponse<Customer>> = {dataState:Requeststatus.LOADED,appData:{}};

  @Output() closeForm = new EventEmitter();
  @Output() refreshForm = new EventEmitter<FetchResponse<Customer>>();

  formState:Customer = {
    customer_id:"",
    cname:""
  }
  c_id = this.router.url.split("/")[this.router.url.split("/").length - 1];

  appStateForm$!: Observable<Appstate<FetchResponse<Customer>>>;
  saveSubject = new BehaviorSubject<FetchResponse<Customer>>(responseContent);
  isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingSubject.asObservable();
  readonly DataState = Requeststatus;

  constructor(
    private router: Router,
    private fetchService: FetchService
  ) { }

  ngOnInit(): void {
    if(this.type === "edit"){
      this.formState.cname = this.data.appData!.data![0].cname;
    }
  }

  submitForm(){
    if(this.type === "save"){
      console.log(this.formState);
      this.saveCustomer(this.formState);
    }
    if(this.type === "edit"){
      this.formState = {
        ...this.formState,
        customer_id:this.c_id
      }
      this.updateCustomer(this.formState,this.c_id);
    }
  }

  saveCustomer(customer:Customer){
    this.isLoadingSubject.next(true);
    this.appStateForm$ = this.fetchService.saveCustomer$(customer)
      .pipe(
        map(res=>{
          this.saveSubject.next(res);
          this.isLoadingSubject.next(false);
          this.closeForm.emit();
          this.refreshForm.emit(res);
          return {
            dataState:Requeststatus.LOADED,
            appData:this.saveSubject.value
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

  updateCustomer(customer:Customer,id:string){
    this.isLoadingSubject.next(true);
    this.appStateForm$ = this.fetchService.updateCustomer$(customer,id)
      .pipe(
        map(res=>{
          this.saveSubject.next(res);
          this.isLoadingSubject.next(false);
          this.closeForm.emit();
          this.refreshForm.emit(res);
          return {
            dataState:Requeststatus.LOADED,
            appData:this.saveSubject.value
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
