import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, of, startWith } from 'rxjs';
import { Requeststatus } from 'src/app/enums/requeststatus';
import { FetchService } from 'src/app/services/fetch.service';
import { FetchResponse, Product, ResponseAppState, responseContent } from 'src/types/general';

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.css']
})
export class FormProductComponent implements OnInit {
  @Input() type = "";
  @Input() data:ResponseAppState<FetchResponse<Product>> = {dataState:Requeststatus.LOADED,appData:{}};

  @Output() closeForm = new EventEmitter();
  @Output() refreshForm = new EventEmitter<FetchResponse<Product>>();

  // reactive form state
  form = this.fb.group({
    product_id:[""],
    pname:["",Validators.required]
  });

  // validation state
  submitted:boolean = false;
  isFormField:boolean = true;  

  // view specific id
  product_id = this.router.url.split("/")[this.router.url.split("/").length - 1];

  appStateForm$!: Observable<ResponseAppState<FetchResponse<Product>>>;
  saveSubject = new BehaviorSubject<FetchResponse<Product>>(responseContent);
  isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingSubject.asObservable();
  readonly DataState = Requeststatus;

  constructor(
    private router: Router,
    private fetchService: FetchService,
    private fb: FormBuilder
  ) { }

  // getters for form state
  get pname(){ return this.form.get("pname")};

  ngOnInit(): void {
    if(this.type === "edit"){
      this.form.setValue({
        product_id:this.data.appData!.data![0].product_id,
        pname:this.data.appData!.data![0].pname
      })
    }
  }

  submitForm(){
    this.submitted = true;
    if(this.type === "save" && this.form.valid){
      this.saveProduct(this.form.value);

    }
    if(this.type === "edit" && this.form.valid){
      this.updateProduct(this.form.value,this.product_id);
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
