import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Requeststatus } from 'src/app/enums/requeststatus';
import { GET_PRODUCTS, GET_PRODUCTS_SUCCESS } from 'src/app/store/actions/productActions';
import { DELETE_SUPPLIER, GET_SUPPLIER, GET_SUPPLIERS, GET_SUPPLIERS_SUCCESS } from 'src/app/store/actions/supplierActions';
import { selectProductFilteredProductData } from 'src/app/store/selectors/productSelectors';
import { selectSupplierDataState, selectSupplierError, selectSupplierFilteredSupplierData } from 'src/app/store/selectors/supplierSelectors';
import { FetchResponse, Product, ResponseAppState, Supplier } from 'src/types/general';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit {

  // observables
  data$ = this.store.select(selectSupplierFilteredSupplierData);
  loadState$ = this.store.select(selectSupplierDataState);
  error$ = this.store.select(selectSupplierError);
  productList$ = this.store.select(selectProductFilteredProductData);
  readonly DataState = Requeststatus;

  // state for view
  showAddForm: boolean = false;
  showEditForm: boolean = false;
  formType:string = "";
  isAll:boolean = false;
  title:string = "";
  url:string = this.router.url.toString().slice(1,);
  s_id = this.router.url.split("/")[this.router.url.split("/").length - 1];
  
  constructor(
    private store:Store<ResponseAppState<FetchResponse<Supplier>>>,
    private router:Router
  ) { }

  // lifecycle hooks
  ngOnInit(): void {
    this.onGetProducts();
    this.getData(this.url.split("/").length);
  }

  // methods
  getData(urlLength:number){
    let urlPath = urlLength === 1 ? `${this.url}/list` : `${this.url.split("/")[0]}/get/${this.url.split("/")[1]}`
    urlLength === 1 ? this.formType = "save" : this.formType = "edit";
    urlLength === 1 ? this.isAll = true : this.isAll = false;
    this.title = this.url.split("/")[0].toString().slice(0,1).toUpperCase() + this.url.split("/")[0].toString().slice(1,);
    this.onGetSupplier(urlPath,urlLength);
  } 
  
  onGetSupplier(url:string,urlLength:number){
    // if localstorage is null
    if(localStorage.getItem('suppliers')){
      // localstorage state
      let localState:ResponseAppState<FetchResponse<Supplier>> = JSON.parse(localStorage.getItem('suppliers')!);
      
      if(urlLength === 1){
        // if localstorage and all 
        this.store.dispatch(GET_SUPPLIERS_SUCCESS({res:localState}))
      }
      if(urlLength > 1){
        // if localstorage and single
        let matchingSupplier = localState.filteredSupplierData!.filter(val=> val.supplier_id === this.s_id);

        if(matchingSupplier?.length){
          let response:ResponseAppState<FetchResponse<Supplier>> = {
            ...localState,
            filteredSupplierData:matchingSupplier
          };
          this.store.dispatch(GET_SUPPLIER({res:response}));
        } else {
          alert("No matches found");
          this.router.navigate(["suppliers"]);
        }
      }
    } else {
      this.store.dispatch(GET_SUPPLIERS({url})); 
    }
  }

  onGetProducts(){
    // if localstorage is null
    if(localStorage.getItem('products')){
      // localstorage state
      let localState:ResponseAppState<FetchResponse<Product>> = JSON.parse(localStorage.getItem('products')!);
      this.store.dispatch(GET_PRODUCTS_SUCCESS({res:localState}));

    } else {
      this.store.dispatch(GET_PRODUCTS({url:"products/list"})); 
    }
}

  onDelete(id:string){
    if(confirm("Are you sure you want to delete this supplier?")){
      this.store.dispatch(DELETE_SUPPLIER({id}));
      this.router.navigate(["suppliers"]);
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
  refreshSupplierView(){
    this.getData(this.url.split("/").length);
  }

}
