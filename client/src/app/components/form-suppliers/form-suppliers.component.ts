import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { Requeststatus } from 'src/app/enums/requeststatus';
import { GET_PRODUCTS, GET_PRODUCTS_SUCCESS } from 'src/app/store/actions/productActions';
import { ADD_SUPPLIER, UPDATE_SUPPLIER } from 'src/app/store/actions/supplierActions';
import { selectProductData } from 'src/app/store/selectors/productSelectors';
import { selectSupplierDataState, selectSupplierError, selectSupplierFilteredSupplierData, selectSupplierProductsData } from 'src/app/store/selectors/supplierSelectors';
import { FetchResponse, Product, ProductCheckBox, ResponseAppState, Supplier } from 'src/types/general';

@Component({
  selector: 'app-form-suppliers',
  templateUrl: './form-suppliers.component.html',
  styleUrls: ['./form-suppliers.component.css','../../app.component.css']
})
export class FormSuppliersComponent implements OnInit {
  @Input() type = "";

  @Output() refreshForm = new EventEmitter<void>();
  @Output() closeForm = new EventEmitter<void>();

  // reactive form state
  form=this.fb.group({
    supplier_id:[""],
    sname:["",Validators.required],
    products:this.fb.array([])
  });
  productCheckBoxGroup:FormGroup = this.fb.group({});
  
  // validation state
  submitted:boolean = false;
  isFormField:boolean = true;
  
  // view specific id
  s_id = this.router.url.split("/")[this.router.url.split("/").length - 1];

  // observables
  data$ = this.store.select(selectSupplierFilteredSupplierData);
  loadState$ = this.store.select(selectSupplierDataState);
  error$ = this.store.select(selectSupplierError);
  readonly DataState = Requeststatus;

  // checkbox list
  productList$ = this.storeProduct.select(selectProductData);
  supplierProducts$ = this.store.select(selectSupplierProductsData);
  productLength = new BehaviorSubject<number>(Object.values(this.productCheckBoxGroup.value).length);
  productLength$ = this.productLength.asObservable();

  constructor(
    private fb:FormBuilder,
    private router:Router,
    private store:Store<ResponseAppState<FetchResponse<Supplier>>>,
    private storeProduct:Store<ResponseAppState<FetchResponse<Product>>>
  ) { }

  // getters for form state
  get sname(){ return this.form.get("sname")};
  get products(){ return this.form.get("products")};
  get productGroup(){ return this.productCheckBoxGroup };

  // lifecycle hooks
  ngOnInit(): void {
    this.onGetProducts();
    if(this.type === "edit"){
      this.data$.forEach(item=>{
        item?.forEach(val=>{
          this.form = this.fb.group({
            supplier_id:[val.supplier_id],
            sname:[val.sname],
            products:this.fb.array(val.products)
          })
        })
      })
    }
  }

  // methods
  submitForm(){
    this.submitted = true;
    if(this.type === "save" && this.form.valid){
      this.onSaveSupplier(this.form.value);
    }
    if(this.type === "edit" && this.form.valid){
      this.onUpdateSupplier(this.form.value,this.s_id);
    }
  }

  // get products
  onGetProducts(){
      // if localstorage is null
      if(localStorage.getItem('products')){
        // localstorage state
        let localState:ResponseAppState<FetchResponse<Product>> = JSON.parse(localStorage.getItem('products')!);
        this.store.dispatch(GET_PRODUCTS_SUCCESS({res:localState}));
      } else {
        this.store.dispatch(GET_PRODUCTS({url:"products/list"})); 
      }

      if(this.type === "save"){
        this.productList$.forEach(sitem=> sitem!.forEach(sitemval=>
            this.productCheckBoxGroup.addControl(String(sitemval['product_id']),new FormControl(false))
        ))
        this.productLength.next(Object.values(this.productCheckBoxGroup.value).length);
      }
      if(this.type === "edit"){
        this.productList$.forEach((suppliers)=>suppliers!.forEach(product=>{
            let isChecked = false;

            // check data 
            this.data$.forEach(entry=>entry?.forEach(({products})=>products.forEach(userProduct=>{
                  (userProduct.product_id === product.product_id) ? isChecked = true : null;
                })
            ))
            this.productCheckBoxGroup.addControl(String(product.product_id),new FormControl(isChecked));
          })
        )
        this.productLength.next(Object.values(this.productCheckBoxGroup.value).length);
      }
  }

  // save supplier
  onSaveSupplier(supplier:Supplier){
    this.store.dispatch(ADD_SUPPLIER({supplier}));
    this.closeForm.emit();
    this.refreshForm.emit();
  }
  
  // update supplier
  onUpdateSupplier(supplier:Supplier,id:string){
    let products = supplier.products;
    products = products.map(item=>{
      return {
        product_id:item.product_id,
        pname:item.pname,
      }
    });
    supplier = {
      ...supplier,
      products
    }
    this.store.dispatch(UPDATE_SUPPLIER({supplier,id}));
    this.closeForm.emit();
    this.refreshForm.emit();
  }

  // modify product list
  checkedBox(product:Product){
    let isChecked:boolean = false;
    Object.entries(this.productCheckBoxGroup.value).forEach(([key,value])=>{
      if(key === product.product_id){
        isChecked = Boolean(value);
      }
    });

    const products:FormArray = this.form.get("products") as FormArray;
    
    if(isChecked){
      products.push(new FormControl(product));      
    }
    if(!isChecked){
      products.controls.forEach((item:any,i:number)=>{
        if(item.value.product_id == product.product_id){
          products.removeAt(i);
          return;
        }
      });
    }
  }  


}
