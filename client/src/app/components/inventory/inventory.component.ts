import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, filter, map, mergeMap } from 'rxjs';
import { Requeststatus } from 'src/app/enums/requeststatus';
import { FILTER_INVENTORY, GET_INVENTORY, GET_INVENTORY_SUCCESS, SEARCH_INVENTORY, SORT_INVENTORY, SORT_QUANTITY, UNFILTER_INVENTORY } from 'src/app/store/actions/inventoryActions';
import { selectInventoryData, selectInventoryDataState, selectInventoryError, selectInventoryFilteredData, selectInventoryFilterResults } from 'src/app/store/selectors/inventorySelectors';
import { selectProductFilteredProductData } from 'src/app/store/selectors/productSelectors';
import { FetchResponse, Inventory, ResponseAppState } from 'src/types/general';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  // observables
  data$ = this.store.select(selectInventoryFilteredData);
  loadState$ = this.store.select(selectInventoryDataState);
  error$ = this.store.select(selectInventoryError);
  readonly DataState = Requeststatus;

  productList$ = this.store.select(selectInventoryData);
  sortOptions = ["none","asc","des"];
  sortInventoryIndex = 0;
  sortQuantityIndex = 0;  

  // form state
  form = this.fb.group({
    search:[""],
    filter:[null]
  });

  // getters
  get search(){ return this.form.get("search")};
  get filter(){ return this.form.get("filter")};


  constructor(
    private store:Store<ResponseAppState<FetchResponse<Inventory>>>,
    private router:Router,
    private fb:FormBuilder,
  ) { }

  // lifecycle hooks
  ngOnInit(): void {
    this.onGetInventory();
  }

  // methods
  onGetInventory(){
    this.store.dispatch(GET_INVENTORY());
  }

  onSearchInventory(){
    this.store.dispatch(SEARCH_INVENTORY({search:this.search!.value}));
    this.filter?.setValue(null);
    this.sortInventoryIndex = 0;
    this.sortQuantityIndex = 0;
  }

  onFilterInventory(e:any){
    this.search?.setValue("");
    this.sortInventoryIndex = 0;
    this.sortQuantityIndex = 0;
    if(e.target.value === "all"){
      this.store.dispatch(UNFILTER_INVENTORY());
    } else {
      this.store.dispatch(FILTER_INVENTORY({id:e.target.value}));
    }
  }

  sortInventoryColumn(){
    this.sortQuantityIndex = 0;
    this.sortInventoryIndex < 2 
      ? this.sortInventoryIndex++ 
      : this.sortInventoryIndex = 0;
    this.store.dispatch(SORT_INVENTORY({direction:this.sortOptions[this.sortInventoryIndex]}));
  }

  sortQuantityColumn(){
    this.sortInventoryIndex = 0;
    this.sortQuantityIndex < 2
      ? this.sortQuantityIndex++
      : this.sortQuantityIndex = 0
    this.store.dispatch(SORT_QUANTITY({direction:this.sortOptions[this.sortQuantityIndex]}));
  }

}
