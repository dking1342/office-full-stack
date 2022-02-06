import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, startWith } from "rxjs";
import { Requeststatus } from "src/app/enums/requeststatus";
import { FetchService } from "src/app/services/fetch.service";
import { FetchResponse, Product, ResponseAppState } from "src/types/general";
import { GET_PRODUCTS, GET_PRODUCTS_SUCCESS, GET_PRODUCTS_LOADING, GET_PRODUCTS_ERROR, ADD_PRODUCT_SUCCESS, ADD_PRODUCT_LOADING, ADD_PRODUCT, ADD_PRODUCT_ERROR, UPDATE_PRODUCT, UPDATE_PRODUCT_ERROR, UPDATE_PRODUCT_LOADING, UPDATE_PRODUCT_SUCCESS } from "../actions/productActions";

@Injectable()
export class ProductEffects {

    constructor(
        private actions$:Actions,
        private fetchService:FetchService
    ){}

    getProducts$ = createEffect(()=> this.actions$.pipe(
        ofType(GET_PRODUCTS),
        mergeMap(({url})=>
            this.fetchService.getProducts$(url).pipe(
                map((res:FetchResponse<Product>)=>{
                    let response:ResponseAppState<FetchResponse<Product>> = {
                        dataState:Requeststatus.LOADED,
                        appData:{
                            ...res,
                            data:res.data!.flat(1)
                        },
                        error:"",
                        filteredProductData:res.data!.flat(1)
                    }
                    return GET_PRODUCTS_SUCCESS({res:response});
                }),
                startWith( GET_PRODUCTS_LOADING()),
                catchError((error:string)=> of(GET_PRODUCTS_ERROR({error})))
            )
        )
    ));

    addProducts$ = createEffect(()=> this.actions$.pipe(
        ofType(ADD_PRODUCT),
        mergeMap(({product})=>
            this.fetchService.saveProduct$(product).pipe(
                map((res:FetchResponse<Product>)=>{
                    let response:ResponseAppState<FetchResponse<Product>> = {
                        dataState:Requeststatus.LOADED,
                        appData:{
                            ...res,
                            data:res.data!.flat(1)
                        },
                        error:"",
                        filteredProductData:res.data!.flat(1)
                    }
                    return ADD_PRODUCT_SUCCESS({res:response});
                }),
                startWith( ADD_PRODUCT_LOADING()),
                catchError((error:string)=> of(ADD_PRODUCT_ERROR({error})))
            )
        )
    ));

    updateProduct$ = createEffect(()=> this.actions$.pipe(
        ofType(UPDATE_PRODUCT),
        mergeMap(({product,id})=>
            this.fetchService.updateProduct$(product,id).pipe(
                map((res:FetchResponse<Product>)=>{
                    let response:ResponseAppState<FetchResponse<Product>> = {
                        dataState:Requeststatus.LOADED,
                        appData:{
                            ...res,
                            data:res.data!.flat(1)
                        },
                        error:"",
                        filteredProductData:res.data!.flat(1)
                    }
                    return UPDATE_PRODUCT_SUCCESS({res:response});
                }),
                startWith(UPDATE_PRODUCT_LOADING()),
                catchError((error:string)=> of(UPDATE_PRODUCT_ERROR({error})))
            )
        )
    ));
}