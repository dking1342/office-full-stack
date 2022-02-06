import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Requeststatus } from 'src/app/enums/requeststatus';
import { GET_PRODUCT, GET_PRODUCTS, GET_PRODUCTS_SUCCESS } from 'src/app/store/actions/productActions';
import { selectCustomerFilteredCustomerData, selectCustomerDataState, selectCustomerError } from 'src/app/store/selectors/customerSelectors';
import { selectProductDataState, selectProductError, selectProductFilteredProductData } from 'src/app/store/selectors/productSelectors';
import { ResponseAppState, FetchResponse, Product } from 'src/types/general';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  // observables
  data$ = this.store.select(selectProductFilteredProductData);
  loadState$ = this.store.select(selectProductDataState);
  error$ = this.store.select(selectProductError);
  readonly DataState = Requeststatus;

  // state for view
  showAddForm: boolean = false;
  showEditForm: boolean = false;
  formType:string = "";
  isAll:boolean = false;
  title:string = "";
  url:string = this.router.url.toString().slice(1,);
  p_id = this.router.url.split("/")[this.router.url.split("/").length - 1];
  
  constructor(
    private store:Store<ResponseAppState<FetchResponse<Product>>>,
    private router:Router,
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
    this.onGetProduct(urlPath,urlLength);
  }

  // get
  onGetProduct(url:string,urlLength:number){
    // if localstorage is null
    if(localStorage.getItem('products')){
      // localstorage state
      let localState:ResponseAppState<FetchResponse<Product>> = JSON.parse(localStorage.getItem('products')!);

      if(urlLength === 1){
        // if localstorage and all 
        this.store.dispatch(GET_PRODUCTS_SUCCESS({res:localState}))
      }
      if(urlLength > 1){
        // if localstorage and single
        let matchingProducts = localState.filteredProductData!.filter(val=> val.product_id === this.p_id);

        if(matchingProducts?.length){
          let response:ResponseAppState<FetchResponse<Product>> = {
            ...localState,
            filteredProductData:matchingProducts
          };
          this.store.dispatch(GET_PRODUCT({res:response}));
        } else {
          alert("No matches found");
          this.router.navigate(["products"]);
        }
      }
    } else {
      this.store.dispatch(GET_PRODUCTS({url})); 
    }    
  }

  // delete

  getInfo(id:string){
    this.router.navigate([this.url,id]);
  }
  closeAddForm(){
    this.showAddForm = !this.showAddForm;
  }
  closeEditForm(){
    this.showEditForm = !this.showEditForm;
  }
  refreshProductView(){
    this.getData(this.url.split("/").length);
  }

}
