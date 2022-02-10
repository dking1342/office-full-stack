import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { Requeststatus } from 'src/app/enums/requeststatus';
import { GET_TRANSACTION, GET_TRANSACTIONS, GET_TRANSACTIONS_SUCCESS } from 'src/app/store/actions/transactionActions';
import { selectTransactionDataState, selectTransactionError, selectTransactionFilterData } from 'src/app/store/selectors/transactionSelectors';
import { FetchResponse, ResponseAppState, Transaction } from 'src/types/general';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css','../../app.component.css']
})
export class TransactionComponent implements OnInit {

  // observables
  data$ = this.store.select(selectTransactionFilterData);
  loadState$ = this.store.select(selectTransactionDataState);
  error$ = this.store.select(selectTransactionError);
  readonly DataState = Requeststatus;

  // state 
  showAddForm: boolean = false;
  showEditForm:boolean=false;
  formType:string = "";
  isAll:boolean=false;
  title:string="";
  url:string = this.router.url.toString().slice(1,);
  t_id = this.url.split("/")[this.url.split("/").length - 1];

  // material ui form state
  displayedColumns: string[] = ['employee','supplier','product','customer','type','quantity','info']; 
  dataSource$ = this.data$.pipe(
    map(item=>{
      let ds = new MatTableDataSource<Transaction>();
      ds.data.push(...item!);
      return ds;
    })
  );   

  constructor(
    private router:Router,
    private store:Store<ResponseAppState<FetchResponse<Transaction>>>,
  ) { }

  // lifecycle hooks
  ngOnInit(): void {
    this.getData(this.url.split("/").length);
  }

  // methods
  getData(urlLength:number){
    let urlPath = urlLength === 1 ? `${this.url}/list` : `${this.url.split("/")[0]}/get/${this.url.split("/")[1]}`;
    urlLength === 1 ? this.formType = "save" : this.formType = "edit";
    urlLength === 1 ? this.isAll = true : this.isAll = false;
    this.title = this.url.split("/")[0].toString().slice(0,1).toUpperCase() + this.url.split("/")[0].toString().slice(1,);
    this.onGetTransactions(urlPath,urlLength);
  }

  onGetTransactions(url:string,urlLength:number){
    // if localstorage is null
    if(localStorage.getItem('transactions')){
      // localstorage state
      let localState:ResponseAppState<FetchResponse<Transaction>> = JSON.parse(localStorage.getItem('transactions')!);

      if(urlLength === 1){
        // if localstorage and all 
        this.store.dispatch(GET_TRANSACTIONS_SUCCESS({res:localState}))
      }
      if(urlLength > 1){
        // if localstorage and single
        let matchingTransactions = localState.filteredTransactionData!.filter(val=> val.transaction_id === this.t_id);

        if(matchingTransactions?.length){
          let response:ResponseAppState<FetchResponse<Transaction>> = {
            ...localState,
            filteredTransactionData:matchingTransactions
          };
          this.store.dispatch(GET_TRANSACTION({res:response}));
        } else {
          alert("No matches found");
          this.router.navigate(["transactions"]);
        }
      }
    } else {
      this.store.dispatch(GET_TRANSACTIONS({url})); 
    }
  }



  getInfo(id:string){
    this.router.navigate([this.url,id])
  }
  closeAddForm(){
    this.showAddForm = !this.showAddForm;
  }
  closeEditForm(){
    this.showEditForm = !this.showEditForm;
  }
  refreshTransactionView(){
    this.getData(this.url.split("/").length);
  }

}
