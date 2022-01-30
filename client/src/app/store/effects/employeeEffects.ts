import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, startWith } from "rxjs";
import { Requeststatus } from "src/app/enums/requeststatus";
import { FetchService } from "src/app/services/fetch.service";
import { Employee, FetchResponse, ResponseAppState } from "src/types/general";
import { ADD_EMPLOYEE, ADD_EMPLOYEE_ERROR, ADD_EMPLOYEE_LOADING, ADD_EMPLOYEE_SUCCESS, DELETE_EMPLOYEE, DELETE_EMPLOYEE_ERROR, DELETE_EMPLOYEE_LOADING, DELETE_EMPLOYEE_SUCCESS, GET_EMPLOYEES, GET_EMPLOYEES_ERROR, GET_EMPLOYEES_LOADING, GET_EMPLOYEES_SAVED, GET_EMPLOYEES_SUCCESS, UPDATE_EMPLOYEE, UPDATE_EMPLOYEE_ERROR, UPDATE_EMPLOYEE_LOADING, UPDATE_EMPLOYEE_SUCCESS } from "../actions/employeeActions";

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

    addEmployee$ = createEffect(()=> this.actions$.pipe(
        ofType(ADD_EMPLOYEE),
        mergeMap(({employee})=>
            this.fetchService.saveEmployee$(employee)
                .pipe(
                    map((res:FetchResponse<Employee>) => {
                        let response:ResponseAppState<FetchResponse<Employee>> = {
                            dataState:Requeststatus.LOADED,
                            appData:{
                                ...res,
                                data:res.data!.flat(1)
                            },
                            error:""
                        }
                        return ADD_EMPLOYEE_SUCCESS({res:response});
                    }),
                    startWith( ADD_EMPLOYEE_LOADING()),
                    catchError((error:string)=> of(ADD_EMPLOYEE_ERROR({error})))
                )
        )
    ));

    deleteEmployee$ = createEffect(()=> this.actions$.pipe(
        ofType(DELETE_EMPLOYEE),
        mergeMap(({id})=>
            this.fetchService.deleteEmployee$(id)
                .pipe(
                    map(() => {
                        return DELETE_EMPLOYEE_SUCCESS({id});
                    }),
                    startWith( DELETE_EMPLOYEE_LOADING()),
                    catchError((error:string)=> of(DELETE_EMPLOYEE_ERROR({error})))
                )
        )
    ));

    updateEmployee$ = createEffect(()=> this.actions$.pipe(
        ofType(UPDATE_EMPLOYEE),
        mergeMap(({employee,id})=>
            this.fetchService.updateEmployee$(employee,id)
                .pipe(
                    map((res:FetchResponse<Employee>)=>{
                        let response:ResponseAppState<FetchResponse<Employee>> = {
                            dataState:Requeststatus.LOADED,
                            appData:{
                                ...res,
                                data:res.data!.flat(1)
                            },
                            error:""
                        };
                        return UPDATE_EMPLOYEE_SUCCESS({res:response})
                    }),
                    startWith( UPDATE_EMPLOYEE_LOADING()),
                    catchError((error:string)=>of(UPDATE_EMPLOYEE_ERROR({error})))
                )
        )
    ));



}