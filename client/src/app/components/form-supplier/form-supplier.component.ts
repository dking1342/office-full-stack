import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, of, startWith } from 'rxjs';
import { Requeststatus } from 'src/app/enums/requeststatus';
import { Appstate } from 'src/app/interfaces/appstate';
import { FetchService } from 'src/app/services/fetch.service';
import { FetchResponse, Product, ProductCheckBox, responseContent, Supplier } from 'src/types/general';

@Component({
  selector: 'app-form-supplier',
  templateUrl: './form-supplier.component.html',
  styleUrls: ['./form-supplier.component.css']
})
export class FormSupplierComponent implements OnInit {
  @Input() type:string = "";
  @Input() data:Appstate<FetchResponse<Supplier>> = {dataState:Requeststatus.LOADED,appData:{}};
  
  @Output() closeForm = new EventEmitter<void>();
  @Output() refreshForm = new EventEmitter<FetchResponse<Supplier>>();

  formState:Supplier = {
    supplier_id:"",
    sname:"",
    products:[]
  }
  checkBoxProducts: ProductCheckBox[] = [];
  supplier_id = this.router.url.split("/")[this.router.url.split("/").length - 1];

  appStateForm$!: Observable<Appstate<FetchResponse<Supplier>>>;
  saveSubject = new BehaviorSubject<FetchResponse<Supplier>>(responseContent);
  isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingSubject.asObservable();
  readonly DataState = Requeststatus;
  appStateProduct$!: Observable<Appstate<FetchResponse<Product>>>;
  productList = new BehaviorSubject<ProductCheckBox[]>([]);
  productList$ = this.productList.asObservable();

  constructor(
    private router:Router,
    private fetchService:FetchService,
  ) { }

  ngOnInit(): void {
    if(this.type === "save"){
      this.getProducts();
    }
    if(this.type === "edit"){
      this.getProducts();
      this.formState = {
        ...this.formState,
        supplier_id:this.data.appData!.data![0].supplier_id,
        sname:this.data.appData!.data![0].sname,
        products:this.data.appData!.data![0].products
      }
    }
  }

  submitForm(){
    if(this.type === "save"){
      this.saveSupplier(this.formState);
    }
    if(this.type === "edit"){
      this.updateSupplier(this.formState,this.supplier_id);
    }
  }

  getProducts(){
    this.isLoadingSubject.next(true);
    this.appStateProduct$ = this.fetchService.getProducts$("products/list")
      .pipe(
        map(res=>{
          this.isLoadingSubject.next(false);
          if(Object.values(this.data.appData!).length){
            res.data?.flat(1).forEach(item=>{
              let isChecked = false;
              this.data.appData?.data![0].products.forEach(citem=>{
                if(item.product_id === citem.product_id){
                  isChecked = true;
                } 
              })
              this.checkBoxProducts.push({
                product_id:item.product_id,
                pname:item.pname,
                isChecked
              })
            })
            this.productList.next(this.checkBoxProducts);
          } else {
            res.data?.flat(1).forEach(item=>{
              this.checkBoxProducts.push({
                product_id:item.product_id,
                pname:item.pname,
                isChecked:false
              })
            })
            this.productList.next(this.checkBoxProducts);
          }
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
    if(e.target.checked){
      this.formState.products = [...this.formState.products, product];
    }
    if(!e.target.checked){
      this.formState.products = this.formState.products.filter(item=>item.product_id !== product.product_id);
    }
  }

}
