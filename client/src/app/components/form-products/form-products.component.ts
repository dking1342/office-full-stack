import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FetchResponse, Customer, ResponseAppState, Product } from 'src/types/general';
import { Store } from '@ngrx/store';
import { selectProductDataState, selectProductError, selectProductFilteredProductData, selectProductFormData } from 'src/app/store/selectors/productSelectors';
import { Requeststatus } from 'src/app/enums/requeststatus';
import { ADD_PRODUCT, UPDATE_PRODUCT } from 'src/app/store/actions/productActions';

@Component({
  selector: 'app-form-products',
  templateUrl: './form-products.component.html',
  styleUrls: ['./form-products.component.css','../../app.component.css']
})
export class FormProductsComponent implements OnInit {
  @Input() type = "";

  @Output() closeForm = new EventEmitter();
  @Output() refreshForm = new EventEmitter<FetchResponse<Customer>>();

  // reactive form state
  form = this.fb.group({
    product_id:[""],
    pname:["",Validators.required]
  });

  // validation state
  submitted:boolean = false;
  isFormField:boolean = true;  

  // view specific id
  p_id = this.router.url.split("/")[this.router.url.split("/").length - 1];
  
  // observables
  data$ = this.store.select(selectProductFilteredProductData);
  loadState$ = this.store.select(selectProductDataState);
  error$ = this.store.select(selectProductError);
  readonly DataState = Requeststatus;
  
  constructor(
    private router:Router,
    private fb:FormBuilder,
    private store:Store<ResponseAppState<FetchResponse<Product>>>
  ) { }

  // getters for form state
  get pname(){ return this.form.get("pname")};


  // lifecycle hooks
  ngOnInit(): void {
    if(this.type === "edit"){
      this.store.select(selectProductFormData({id:this.p_id}))
        .forEach(item=>{
          item?.forEach(val=>{
            this.form = this.fb.group({
              product_id:[val.product_id],
              pname:[val.pname]
            })
          })
        })
    }
  }

  // methods
  submitForm(){
    this.submitted = true;
    if(this.type === "save" && this.form.valid){
      this.onSave(this.form.value);
    }
    if(this.type === "edit" && this.form.valid){
      this.onUpdate(this.form.value,this.p_id);
    }
  }

  // save
  onSave(product:Product){
    this.store.dispatch(ADD_PRODUCT({product}));
    this.closeForm.emit();
    this.refreshForm.emit();
  }

  // update
  onUpdate(product:Product,id:string){
    this.store.dispatch(UPDATE_PRODUCT({product,id}));
    this.closeForm.emit();
    this.refreshForm.emit();
  }

}
