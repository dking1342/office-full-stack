import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { Requeststatus } from 'src/app/enums/requeststatus';
import { GET_PRODUCTS, GET_PRODUCTS_SUCCESS } from 'src/app/store/actions/productActions';
import { ADD_SUPPLIER, GET_SUPPLIERS, UPDATE_SUPPLIER } from 'src/app/store/actions/supplierActions';
import { selectProductData, selectProductFilteredProductData } from 'src/app/store/selectors/productSelectors';
import { selectSupplierDataState, selectSupplierError, selectSupplierFilteredSupplierData, selectSupplierProductsData } from 'src/app/store/selectors/supplierSelectors';
import { ResponseAppState, FetchResponse, Supplier, Product, ProductCheckBox } from 'src/types/general';

@Component({
  selector: 'app-form-suppliers',
  templateUrl: './form-suppliers.component.html',
  styleUrls: ['./form-suppliers.component.css']
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
  productsSelectedList$ = this.store.select(selectProductData);
  supplierProducts$ = this.store.select(selectSupplierProductsData);
  productList = new BehaviorSubject<ProductCheckBox[]>([]);
  productList$ = this.productList.asObservable();
  checkBoxProducts:ProductCheckBox[] = [];

  constructor(
    private fb:FormBuilder,
    private router:Router,
    private store:Store<ResponseAppState<FetchResponse<Supplier>>>,
  ) { }

  // getters for form state
  get sname(){ return this.form.get("sname")};
  get products(){ return this.form.get("products")};

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
        this.supplierProducts$.forEach(sitem=>{
          sitem.forEach(sitemval=>{
            let entry = {
              ...sitemval,
              isChecked:false
            };
            this.checkBoxProducts.push(entry);
          });
        });
        this.productList.next(this.checkBoxProducts);
      }
      if(this.type === "edit"){
        this.productsSelectedList$.forEach(pitem=>{
          pitem?.forEach(pitemval=>{
            let isChecked = false;
            this.supplierProducts$.forEach(sitem=>{
              sitem.forEach(sitemval=>{
                if(sitemval.product_id === pitemval.product_id){
                  isChecked = true;
                }
              })
            })
            let entry = {
              ...pitemval,
              isChecked
            };
            this.checkBoxProducts.push(entry);
          });
        });
        this.productList.next(this.checkBoxProducts);
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
