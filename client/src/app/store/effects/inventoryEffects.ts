import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, startWith } from "rxjs";
import { Requeststatus } from "src/app/enums/requeststatus";
import { FetchService } from "src/app/services/fetch.service";
import { FetchResponse, Inventory, ResponseAppState } from "src/types/general";
import { GET_INVENTORY, GET_INVENTORY_ERROR, GET_INVENTORY_LOADING, GET_INVENTORY_SUCCESS } from "../actions/inventoryActions";

@Injectable()
export class InventoryEffects {

    constructor(
        private actions$:Actions,
        private fetchService:FetchService
    ){}

    getInventory$ = createEffect(()=>this.actions$.pipe(
        ofType(GET_INVENTORY),
        mergeMap(()=>
            this.fetchService.getInventory$.pipe(
                map((res:FetchResponse<Inventory>)=>{
                    let response:ResponseAppState<FetchResponse<Inventory>> = {
                        dataState:Requeststatus.LOADED,
                        appData:{
                            ...res,
                            data:res.data!.flat(1)
                        },
                        error:"",
                        filteredInventoryData:res.data!.flat(1)
                    }
                    return GET_INVENTORY_SUCCESS({res:response});
                }),
                startWith(GET_INVENTORY_LOADING()),
                catchError((error:string)=>of(GET_INVENTORY_ERROR({error})))
            )
        )
    ))

}