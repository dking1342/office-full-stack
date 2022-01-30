import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, startWith } from "rxjs";
import { Requeststatus } from "src/app/enums/requeststatus";
import { FetchService } from "src/app/services/fetch.service";
import { Employee, FetchResponse, ResponseAppState } from "src/types/general";
import { GET_EMPLOYEES, GET_EMPLOYEES_ERROR, GET_EMPLOYEES_LOADING, GET_EMPLOYEES_SAVED, GET_EMPLOYEES_SUCCESS } from "../actions/employeeActions";

@Injectable()
export class EmployeeEffects {

    constructor(
        private actions$:Actions,
        private fetchService:FetchService
    ) {}
    
    getEmployees$ = createEffect(()=> this.actions$.pipe(
        ofType(GET_EMPLOYEES),
        mergeMap(({url})=>
            this.fetchService.getEmployees$(url)
                .pipe(
                    map((res:FetchResponse<Employee>) => {
                        let response:ResponseAppState<FetchResponse<Employee>> = {
                            dataState:Requeststatus.LOADED,
                            appData:{
                                ...res,
                                data:res.data!.flat(1)
                            },
                            error:"",
                            filteredData:res.data!.flat(1)
                        }
                        return GET_EMPLOYEES_SUCCESS({res:response});

                    }),
                    startWith( GET_EMPLOYEES_LOADING()),
                    catchError((error:string) => of(GET_EMPLOYEES_ERROR({error})))
                )
        )
    ));





}