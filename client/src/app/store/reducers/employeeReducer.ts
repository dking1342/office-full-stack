import { createReducer, on } from '@ngrx/store';
import { Requeststatus } from 'src/app/enums/requeststatus';
import { Employee, FetchResponse, ResponseAppState } from "src/types/general";
import * as EmployeeActions from "../actions/employeeActions";

export const initialState: ResponseAppState<FetchResponse<Employee>> = {
    dataState:Requeststatus.LOADED,
    appData: {
        timestamp:new Date(),
        HttpStatus:"",
        status:"",
        statusCode:0,
        message:"",
        developerMessage:"",
        data:[],
        boolData:false
    },
    error:"",
    filteredData:[]
}


export const employeeReducer = createReducer(
    initialState,
    on(EmployeeActions.GET_EMPLOYEES,(state)=> state),
    on(EmployeeActions.GET_EMPLOYEES_LOADING,(state)=>{
        state = {
            ...state,
            dataState:Requeststatus.LOADING
        };
        localStorage.setItem('employees',JSON.stringify(state));
        let localState = JSON.parse(localStorage.getItem('employees')!);
        return localState;
    }),
    on(EmployeeActions.GET_EMPLOYEES_ERROR,(state,{error})=>{
        state = {
            ...state,
            error:String(error),
        };
        localStorage.setItem('employees',JSON.stringify(state));
        let localState = JSON.parse(localStorage.getItem('employees')!);
        return localState;
    }),
    on(EmployeeActions.GET_EMPLOYEES_SUCCESS, (state,{res}) => {
        state = {
            ...res,
            filteredData:res.appData?.data
        };
        localStorage.setItem('employees',JSON.stringify(state));
        let localState = JSON.parse(localStorage.getItem('employees')!);
        return localState;
    }),
    on(EmployeeActions.GET_EMPLOYEES_SAVED,(state,{res})=>{
        state = {
            ...res
        }
        localStorage.setItem('employees',JSON.stringify(state));
        let localState = JSON.parse(localStorage.getItem('employees')!);
        return localState;
    })

)