import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, startWith } from 'rxjs';
import { Requeststatus } from 'src/app/enums/requeststatus';
import { FetchService } from 'src/app/services/fetch.service';
import { FetchResponse, Inventory, ResponseAppState } from 'src/types/general';

@Component({
  selector: 'app-inventorys',
  templateUrl: './inventorys.component.html',
  styleUrls: ['./inventorys.component.css']
})
export class InventorysComponent implements OnInit {

  appState$!: Observable<ResponseAppState<FetchResponse<Inventory>>>;
  isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingSubject.asObservable();
  readonly DataState = Requeststatus;
  
  showFilterForm: boolean = false;
  isSortAsc:boolean = true;
  
  dataSubject = new BehaviorSubject<Inventory[]>([]);
  dataSubject$ = this.dataSubject.asObservable();
  refreshDataSubject = new BehaviorSubject<Inventory[]>([]);
  refreshDataSubject$ = this.refreshDataSubject.asObservable();

  constructor(
    private fetchService: FetchService
  ) { }

  ngOnInit(): void {
    this.getInventory();
  }

  getInventory(){
    this.isLoadingSubject.next(true);
    this.appState$ = this.fetchService.getInventory$
      .pipe(
        map(res=>{
          this.isLoadingSubject.next(false);
          this.dataSubject.next(this.alphaAscSort(res.data!));
          this.refreshDataSubject.next(this.alphaAscSort(res.data!));
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

  showFilter(){
    this.showFilterForm = !this.showFilterForm;
  }

  filterInput(e:any){
    if(e.target.value === "all"){
      this.refreshDataSubject.next(this.dataSubject.value);
    } else {
      let refreshInventory = this.dataSubject.value.filter((item)=>item.product.product_id === e.target.value);
      this.refreshDataSubject.next(refreshInventory);
    }
  }

  sortInventoryColumn(){
    if(this.isSortAsc){
      this.refreshDataSubject.next(this.alphaDesSort(this.refreshDataSubject.value));
      this.isSortAsc = !this.isSortAsc;
    } else if(!this.isSortAsc){
      this.refreshDataSubject.next(this.alphaAscSort(this.refreshDataSubject.value));
      this.isSortAsc = !this.isSortAsc;
    }
  }
  
  sortQuantityColumn(){
    if(this.isSortAsc){
      this.refreshDataSubject.next(this.quantityDesSort(this.refreshDataSubject.value));
      this.isSortAsc = !this.isSortAsc;
    } else if(!this.isSortAsc){
      this.refreshDataSubject.next(this.quantityAscSort(this.refreshDataSubject.value));
      this.isSortAsc = !this.isSortAsc;
    }
  }

  alphaAscSort(input:Inventory[]){
    return [...input]
    .flat(1)
    .sort((a,b)=> {
      return a.product.pname.localeCompare(b.product.pname);
    });
  }

  alphaDesSort(input:Inventory[]){
    return [...input]
    .flat(1)
    .sort((a,b)=> {
      return b.product.pname.localeCompare(a.product.pname);
    });
  }

  quantityAscSort(input:Inventory[]){
    return [...input]
      .flat(1)
      .sort((a,b)=>{
        return a.quantity - b.quantity
      });
  }

  quantityDesSort(input:Inventory[]){
    return [...input]
      .flat(1)
      .sort((a,b)=>{
        return b.quantity - a.quantity
      });
  }

}
