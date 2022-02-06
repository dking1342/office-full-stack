import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, startWith } from "rxjs";
import { Requeststatus } from "src/app/enums/requeststatus";
import { FetchService } from "src/app/services/fetch.service";
import { FetchResponse, ResponseAppState, Supplier } from "src/types/general";
import { ADD_SUPPLIER, ADD_SUPPLIER_ERROR, ADD_SUPPLIER_LOADING, ADD_SUPPLIER_SUCCESS, DELETE_SUPPLIER, DELETE_SUPPLIER_ERROR, DELETE_SUPPLIER_LOADING, DELETE_SUPPLIER_SUCCESS, GET_SUPPLIERS, GET_SUPPLIERS_ERROR, GET_SUPPLIERS_LOADING, GET_SUPPLIERS_SUCCESS, UPDATE_SUPPLIER, UPDATE_SUPPLIER_ERROR, UPDATE_SUPPLIER_LOADING, UPDATE_SUPPLIER_SUCCESS } from "../actions/supplierActions";

@Injectable()
export class SupplierEffects {

    constructor(
        private actions$:Actions,
        private fetchService:FetchService
    ){}

    getSuppliers$ = createEffect(()=>this.actions$.pipe(
        ofType(GET_SUPPLIERS),
        mergeMap(({url})=>
            this.fetchService.getSuppliers$(url).pipe(
                map((res:FetchResponse<Supplier>)=>{
                    let response:ResponseAppState<FetchResponse<Supplier>> = {
                        dataState:Requeststatus.LOADED,
                        appData:{
                            ...res,
                            data:res.data!.flat(1)
                        },
                        error:"",
                        filteredSupplierData:res.data!.flat(1)
                    }
                    return GET_SUPPLIERS_SUCCESS({res:response});
                }),
                startWith(GET_SUPPLIERS_LOADING()),
                catchError((error:string)=> of(GET_SUPPLIERS_ERROR({error})))
            )
        )
    ));

    addSupplier$ = createEffect(()=>this.actions$.pipe(
        ofType(ADD_SUPPLIER),
        mergeMap(({supplier})=>
            this.fetchService.saveSupplier$(supplier).pipe(
                map((res:FetchResponse<Supplier>)=>{
                    let response:ResponseAppState<FetchResponse<Supplier>> = {
                        dataState:Requeststatus.LOADED,
                        appData:{
                            ...res,
                            data:res.data!.flat(1)
                        },
                        error:"",
                        filteredSupplierData:res.data!.flat(1)
                    };
                    return ADD_SUPPLIER_SUCCESS({res:response});
                }),
                startWith( ADD_SUPPLIER_LOADING()),
                catchError((error:string)=>of(ADD_SUPPLIER_ERROR({error})))
            )
        )
    ));

    updateSupplier$ = createEffect(()=>this.actions$.pipe(
        ofType(UPDATE_SUPPLIER),
        mergeMap(({supplier,id})=>
            this.fetchService.updateSupplier$(supplier,id).pipe(
                map((res:FetchResponse<Supplier>)=>{
                    let response:ResponseAppState<FetchResponse<Supplier>> = {
                        dataState:Requeststatus.LOADED,
                        appData:{
                            ...res,
                            data:res.data!.flat(1)
                        },
                        error:"",
                        filteredSupplierData:res.data!.flat(1)
                    };
                    return UPDATE_SUPPLIER_SUCCESS({res:response});
                }),
                startWith(UPDATE_SUPPLIER_LOADING()),
                catchError((error:string)=>of(UPDATE_SUPPLIER_ERROR({error})))
            )
        )
    ));

    deleteSupplier$ = createEffect(()=>this.actions$.pipe(
        ofType(DELETE_SUPPLIER),
        mergeMap(({id})=>
            this.fetchService.deleteSupplier$(id).pipe(
                map(()=>{
                    return DELETE_SUPPLIER_SUCCESS({id})
                }),
                startWith(DELETE_SUPPLIER_LOADING()),
                catchError((error:string)=>of(DELETE_SUPPLIER_ERROR({error})))
            )
        )
    ));
}