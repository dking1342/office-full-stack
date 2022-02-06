import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, startWith } from "rxjs";
import { Requeststatus } from "src/app/enums/requeststatus";
import { FetchService } from "src/app/services/fetch.service";
import { Customer, FetchResponse, ResponseAppState } from "src/types/general";
import { ADD_CUSTOMER, ADD_CUSTOMER_ERROR, ADD_CUSTOMER_LOADING, ADD_CUSTOMER_SUCCESS, DELETE_CUSTOMER, DELETE_CUSTOMER_ERROR, DELETE_CUSTOMER_LOADING, DELETE_CUSTOMER_SUCCESS, GET_CUSTOMERS, GET_CUSTOMERS_ERROR, GET_CUSTOMERS_LOADING, GET_CUSTOMERS_SUCCESS, UPDATE_CUSTOMER, UPDATE_CUSTOMER_ERROR, UPDATE_CUSTOMER_LOADING, UPDATE_CUSTOMER_SUCCESS } from "../actions/customerActions";

@Injectable()
export class CustomerEffects {

    constructor(
        private actions$:Actions,
        private fetchService:FetchService
    ){}

    getCustomers$ = createEffect(()=> this.actions$.pipe(
        ofType(GET_CUSTOMERS),
        mergeMap(({url})=>
            this.fetchService.getCustomers$(url).pipe(
                map((res:FetchResponse<Customer>)=>{
                    let response:ResponseAppState<FetchResponse<Customer>> = {
                        dataState:Requeststatus.LOADED,
                        appData:{
                            ...res,
                            data:res.data!.flat(1)
                        },
                        error:"",
                        filteredCustomerData:res.data!.flat(1)
                    }
                    return GET_CUSTOMERS_SUCCESS({res:response});
                }),
                startWith( GET_CUSTOMERS_LOADING()),
                catchError((error:string)=> of(GET_CUSTOMERS_ERROR({error})))
            )
        )
    ));

    addCustomer$ = createEffect(()=> this.actions$.pipe(
        ofType(ADD_CUSTOMER),
        mergeMap(({customer})=>
            this.fetchService.saveCustomer$(customer).pipe(
                map((res:FetchResponse<Customer>)=>{
                    let response:ResponseAppState<FetchResponse<Customer>> = {
                        dataState:Requeststatus.LOADED,
                        appData:{
                            ...res,
                            data:res.data!.flat(1)
                        },
                        error:"",
                        filteredCustomerData:res.data!.flat(1)
                    }
                    return ADD_CUSTOMER_SUCCESS({res:response});
                }),
                startWith( ADD_CUSTOMER_LOADING()),
                catchError((error:string)=> of(ADD_CUSTOMER_ERROR({error})))
            )
        )
    ));

    updateCustomer$ = createEffect(()=> this.actions$.pipe(
        ofType(UPDATE_CUSTOMER),
        mergeMap(({customer,id})=>
            this.fetchService.updateCustomer$(customer,id).pipe(
                map((res:FetchResponse<Customer>)=>{
                    let response:ResponseAppState<FetchResponse<Customer>> = {
                        dataState:Requeststatus.LOADED,
                        appData:{
                            ...res,
                            data:res.data!.flat(1)
                        },
                        error:"",
                        filteredCustomerData:res.data!.flat(1)
                    }
                    return UPDATE_CUSTOMER_SUCCESS({res:response});
                }),
                startWith(UPDATE_CUSTOMER_LOADING()),
                catchError((error:string)=> of(UPDATE_CUSTOMER_ERROR({error})))
            )
        )
    ));

    deleteCustomer$ = createEffect(()=> this.actions$.pipe(
        ofType(DELETE_CUSTOMER),
        mergeMap(({id})=>
            this.fetchService.deleteCustomer$(id).pipe(
                map(()=>{
                    return DELETE_CUSTOMER_SUCCESS({id})
                }),
                startWith(DELETE_CUSTOMER_LOADING()),
                catchError((error:string)=>of(DELETE_CUSTOMER_ERROR({error})))
            )
        )
    ));
}