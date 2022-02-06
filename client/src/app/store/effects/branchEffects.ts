import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, of, startWith, map, mergeMap } from "rxjs";
import { Requeststatus } from "src/app/enums/requeststatus";
import { FetchService } from "src/app/services/fetch.service";
import { Branch, FetchResponse, ResponseAppState } from "src/types/general";
import { GET_BRANCHES_ERROR, GET_BRANCHES_LOADING, GET_BRANCHES_SUCCESS, GET_BRANCHES, ADD_BRANCH, ADD_BRANCH_SUCCESS, ADD_BRANCH_LOADING, ADD_BRANCH_ERROR, UPDATE_BRANCH, UPDATE_BRANCH_SUCCESS, UPDATE_BRANCH_LOADING, UPDATE_BRANCH_ERROR } from "../actions/branchActions";


@Injectable()
export class BranchEffects {
    
    constructor(
        private actions$:Actions,
        private fetchServices: FetchService
    ){}

    getBranches$ = createEffect(()=> this.actions$.pipe(
        ofType(GET_BRANCHES),
        mergeMap(({url})=>
            this.fetchServices.getBranches$(url).pipe(
                map((res:FetchResponse<Branch>) => {
                    let response:ResponseAppState<FetchResponse<Branch>> = {
                        dataState:Requeststatus.LOADED,
                        appData:{
                            ...res,
                            data:res.data!.flat(1)
                        },
                        error:"",
                        filteredBranchData:res.data!.flat(1)
                    }
                    return GET_BRANCHES_SUCCESS({res:response});
                }),
                startWith( GET_BRANCHES_LOADING()),
                catchError((error:string)=> of(GET_BRANCHES_ERROR({error})))
            )
        )
    ));

    addBranch$ = createEffect(()=> this.actions$.pipe(
        ofType(ADD_BRANCH),
        mergeMap(({branch})=>
            this.fetchServices.saveBranch$(branch).pipe(
                map((res:FetchResponse<Branch>) => {
                    let response:ResponseAppState<FetchResponse<Branch>> = {
                        dataState:Requeststatus.LOADED,
                        appData:{
                            ...res,
                            data:res.data!.flat(1)
                        },
                        error:"",
                        filteredBranchData:res.data!.flat(1)
                    }
                    return ADD_BRANCH_SUCCESS({res:response});
                }),
                startWith( ADD_BRANCH_LOADING()),
                catchError((error:string) => of(ADD_BRANCH_ERROR({error})))
            )
        )
    ));

    updateBranch$ = createEffect(()=> this.actions$.pipe(
        ofType(UPDATE_BRANCH),
        mergeMap(({branch,id})=>
            this.fetchServices.updateBranch$(branch,id).pipe(
                map((res:FetchResponse<Branch>) => {
                    let response:ResponseAppState<FetchResponse<Branch>> = {
                        dataState:Requeststatus.LOADED,
                        appData:{
                            ...res,
                            data:res.data!.flat(1)
                        },
                        error:"",
                        filteredBranchData:res.data!.flat(1)
                    }
                    return UPDATE_BRANCH_SUCCESS({res:response});
                }),
                startWith( UPDATE_BRANCH_LOADING()),
                catchError((error:string)=> of(UPDATE_BRANCH_ERROR({error})))
            )
        )
    ));
}