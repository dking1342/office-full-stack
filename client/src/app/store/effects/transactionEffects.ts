import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, startWith } from "rxjs";
import { Requeststatus } from "src/app/enums/requeststatus";
import { FetchService } from "src/app/services/fetch.service";
import { FetchResponse, ResponseAppState, Transaction } from "src/types/general";
import { ADD_TRANSACTION, ADD_TRANSACTION_ERROR, ADD_TRANSACTION_LOADING, ADD_TRANSACTION_SUCCESS, GET_TRANSACTIONS, GET_TRANSACTIONS_ERROR, GET_TRANSACTIONS_LOADING, GET_TRANSACTIONS_SUCCESS, UPDATE_TRANSACTION, UPDATE_TRANSACTION_ERROR, UPDATE_TRANSACTION_LOADING, UPDATE_TRANSACTION_SUCCESS } from "../actions/transactionActions";

@Injectable()
export class TransactionEffects {

    constructor(
        private actions$:Actions,
        private fetchService:FetchService,
    ){}

    getTransactions$ = createEffect(()=>this.actions$.pipe(
        ofType(GET_TRANSACTIONS),
        mergeMap(({url})=>
            this.fetchService.getTransactions$(url).pipe(
                map((res:FetchResponse<Transaction>)=>{
                    let response:ResponseAppState<FetchResponse<Transaction>> = {
                        dataState:Requeststatus.LOADED,
                        appData:{
                            ...res,
                            data:res.data!.flat(1)
                        },
                        error:"",
                        filteredTransactionData:res.data!.flat(1)
                    }
                    return GET_TRANSACTIONS_SUCCESS({res:response});
                }),
                startWith(GET_TRANSACTIONS_LOADING()),
                catchError((error:string)=>of(GET_TRANSACTIONS_ERROR({error})))
            )
        )
    ));

    addTransaction$ = createEffect(()=>this.actions$.pipe(
        ofType(ADD_TRANSACTION),
        mergeMap(({transaction})=>
            this.fetchService.saveTransaction$(transaction).pipe(
                map((res:FetchResponse<Transaction>)=>{
                    let response:ResponseAppState<FetchResponse<Transaction>> = {
                        dataState:Requeststatus.LOADED,
                        appData:{
                            ...res,
                            data:res.data!.flat(1)
                        },
                        error:"",
                        filteredTransactionData:res.data!.flat(1)
                    }
                    return ADD_TRANSACTION_SUCCESS({res:response});
                }),
                startWith(ADD_TRANSACTION_LOADING()),
                catchError((error:string)=>of(ADD_TRANSACTION_ERROR({error})))
            )
        )
    ));

    updateTransaction$ = createEffect(()=>this.actions$.pipe(
        ofType(UPDATE_TRANSACTION),
        mergeMap(({transaction,id})=>
            this.fetchService.updateTransaction$(transaction,id).pipe(
                map((res:FetchResponse<Transaction>)=>{
                    let response:ResponseAppState<FetchResponse<Transaction>> = {
                        dataState:Requeststatus.LOADED,
                        appData:{
                            ...res,
                            data:res.data!.flat(1)
                        },
                        error:"",
                        filteredTransactionData:res.data!.flat(1)
                    }
                    return UPDATE_TRANSACTION_SUCCESS({res:response});
                }),
                startWith(UPDATE_TRANSACTION_LOADING()),
                catchError((error:string)=>of(UPDATE_TRANSACTION_ERROR({error})))
            )
        )
    ));
}