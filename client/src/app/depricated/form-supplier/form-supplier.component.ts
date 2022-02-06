import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, of, startWith } from 'rxjs';
import { Requeststatus } from 'src/app/enums/requeststatus';
import { FetchService } from 'src/app/services/fetch.service';
import { FetchResponse, Product, ProductCheckBox, ResponseAppState, responseContent, Supplier } from 'src/types/general';

@Component({
  selector: 'app-form-supplier',
  templateUrl: './form-supplier.component.html',
  styleUrls: ['./form-supplier.component.css']
})
export class FormSupplierComponent implements OnInit {
  @Input() type:string = "";
  @Input() data:ResponseAppState<FetchResponse<Supplier>> = {dataState:Requeststatus.LOADED,appData:{}};
  
  @Output() closeForm = new EventEmitter<void>();
  @Output() refreshForm = new EventEmitter<FetchResponse<Supplier>>();

  // reactive form state
  form=this.fb.group({
    supplier_id:[""],
    sname:["",Validators.required],
    products:this.fb.array([])
  });

  // validation state
  submitted:boolean = false;
  isFormField:boolean = true;
  
  // view specific id
  supplier_id = this.router.url.split("/")[this.router.url.split("/").length - 1];

  // observables
  appStateForm$!: Observable<ResponseAppState<FetchResponse<Supplier>>>;
  saveSubject = new BehaviorSubject<FetchResponse<Supplier>>(responseContent);
  isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingSubject.asObservable();
  readonly DataState = Requeststatus;

  appStateProduct$!: Observable<ResponseAppState<FetchResponse<Product>>>;
  productList = new BehaviorSubject<ProductCheckBox[]>([]);
  productList$ = this.productList.asObservable();
  checkBoxProducts: ProductCheckBox[] = [];

  constructor(
    private router:Router,
    private fetchService:FetchService,
    private fb: FormBuilder,
  ) { }

  // getters for form state
  get sname(){ return this.form.get("sname")};
  get products(){ return this.form.get("products")};


  ngOnInit(): void {
    if(this.type === "save"){
      this.getProducts();
    }
    if(this.type === "edit"){
      this.getProducts();

      let productFormArray:FormArray = this.form.get("products") as FormArray;
      this.data.appData!.data![0].products.forEach(item=>{
        productFormArray.push(new FormControl(item));
      });

      this.form.patchValue({
        supplier_id:this.data.appData!.data![0].supplier_id,
        sname:this.data.appData!.data![0].sname,
      });
    }
  }

  submitForm(){
    this.submitted = true;
    if(this.type === "save" && this.form.valid){
      this.saveSupplier(this.form.value);
    }
    if(this.type === "edit" && this.form.valid){
      this.updateSupplier(this.form.value,this.supplier_id);
    }
  }

  getProducts(){
    this.isLoadingSubject.next(true);
    this.appStateProduct$ = this.fetchService.getProducts$("products/list")
      .pipe(
        map(res=>{
          this.isLoadingSubject.next(false);

          if(this.type === "save"){
            this.checkBoxProducts = res.data!.flat(1).map(item=>{
              return {
                ...item,
                isChecked:false
              }
            })
          }

          if(this.type === "edit"){
            this.checkBoxProducts = res.data!.flat(1).map(item=>{
              let isChecked = false;
              this.data.appData?.data![0].products.forEach(citem=>{
                if(item.product_id === citem.product_id){
                  isChecked = true;
                }
              })
              return {
                ...item,
                isChecked
              }
            })
          }
          this.productList.next(this.checkBoxProducts);
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

  saveSupplier(supplier:Supplier){
    this.isLoadingSubject.next(true);
    this.appStateForm$ = this.fetchService.saveSupplier$(supplier)
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

  updateSupplier(supplier:Supplier,id:string){
    this.isLoadingSubject.next(true);
    this.appStateForm$ = this.fetchService.updateSupplier$(supplier,id)
      .pipe(
        map(res=>{
          this.saveSubject.next(res);
          this.isLoadingSubject.next(false);
          this.closeForm.emit();
          this.refreshForm.emit(res);
          return{
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

  checkedBox(product:Product,e:any){
    const products:FormArray = this.form.get("products") as FormArray;
    
    if(e.target.checked){
      products.push(new FormControl(product));      
    }
    if(!e.target.checked){
      products.controls.forEach((item:any,i:number)=>{
        if(item.value.product_id == product.product_id){
          products.removeAt(i);
          return;
        }
      });
    }
  }

}
