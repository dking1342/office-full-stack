import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { Requeststatus } from 'src/app/enums/requeststatus';
import { FILTER_INVENTORY, GET_INVENTORY, SEARCH_INVENTORY, SORT_INVENTORY, SORT_QUANTITY, UNFILTER_INVENTORY } from 'src/app/store/actions/inventoryActions';
import { selectInventoryData, selectInventoryDataState, selectInventoryError, selectInventoryFilteredData } from 'src/app/store/selectors/inventorySelectors';
import { FetchResponse, Inventory, ResponseAppState } from 'src/types/general';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  // observables
  productList$ = this.store.select(selectInventoryData);
  data$ = this.store.select(selectInventoryFilteredData);
  loadState$ = this.store.select(selectInventoryDataState);
  error$ = this.store.select(selectInventoryError);
  readonly DataState = Requeststatus;

  // material ui state
  displayedColumns: string[] = ['product', 'quantity'];
  dataSource$ = this.data$.pipe(
    map(item=>{
      let ds = new MatTableDataSource<Inventory>();
      ds.data.push(...item!);
      return ds;
    })
  ); 

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
  }

  onFilterInventory(e:MatSelectChange){
    this.search?.setValue("");
    if(e.value === "all"){
      this.store.dispatch(UNFILTER_INVENTORY());
    } else {
      this.store.dispatch(FILTER_INVENTORY({id:e.value}));
    }
  }

  sortData(sort:Sort){
    if(sort.active === "product"){
      this.sortInventoryColumn(sort.direction);
    }
    if(sort.active === "quantity"){
      this.sortQuantityColumn(sort.direction);
    }
  }

  sortInventoryColumn(direction:string){
    direction = direction ? direction : "none";
    this.store.dispatch(SORT_INVENTORY({direction}));
  }
  
  sortQuantityColumn(direction:string){
    direction = direction ? direction : "none";
    this.store.dispatch(SORT_QUANTITY({direction}));
  }

}
