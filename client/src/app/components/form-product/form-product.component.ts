import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, of, startWith } from 'rxjs';
import { Requeststatus } from 'src/app/enums/requeststatus';
import { Appstate } from 'src/app/interfaces/appstate';
import { FetchService } from 'src/app/services/fetch.service';
import { FetchResponse, Product, responseContent } from 'src/types/general';

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.css']
})
export class FormProductComponent implements OnInit {
  @Input() type = "";
  @Input() data:Appstate<FetchResponse<Product>> = {dataState:Requeststatus.LOADED,appData:{}};

  @Output() closeForm = new EventEmitter();
  @Output() refreshForm = new EventEmitter<FetchResponse<Product>>();

  formState:Product = {
    product_id:"",
    pname:""
  }
  product_id = this.router.url.split("/")[this.router.url.split("/").length - 1];

  appStateForm$!: Observable<Appstate<FetchResponse<Product>>>;
  saveSubject = new BehaviorSubject<FetchResponse<Product>>(responseContent);
  isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingSubject.asObservable();
  readonly DataState = Requeststatus;

  constructor(
    private router: Router,
    private fetchService: FetchService
  ) { }

  ngOnInit(): void {
    if(this.type === "edit"){
      this.formState.pname = this.data.appData!.data![0].pname;
    }
  }

  submitForm(){
    if(this.type === "save"){
      this.formState = {
        ...this.formState,
        pname:this.formState.pname.toUpperCase()
      }
      this.saveProduct(this.formState);
    }
    if(this.type === "edit"){
      this.formState = {
        ...this.formState,
        product_id:this.product_id,
        pname:this.formState.pname.toUpperCase()
      }
      this.updateProduct(this.formState,this.product_id);
    }
  }

  saveProduct(product:Product){
    this.isLoadingSubject.next(true);
    this.appStateForm$ = this.fetchService.saveProduct$(product)
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

  updateProduct(product:Product,id:string){
    this.isLoadingSubject.next(true);
    this.appStateForm$ = this.fetchService.updateProduct$(product,id)
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
