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
    filteredEmployeeData:[]
}


export const employeeReducer = createReducer(
    initialState,
    on(EmployeeActions.GET_EMPLOYEES,(state)=> state),
    on(EmployeeActions.GET_EMPLOYEES_LOADING,(state)=>{
        state = {
            ...state,
            dataState:Requeststatus.LOADING
        };
        return state;
    }),
    on(EmployeeActions.GET_EMPLOYEES_ERROR,(state,{error})=>{
        state = {
            ...state,
            dataState:Requeststatus.ERROR,
            error:String(error),
        };
        return state;
    }),
    on(EmployeeActions.GET_EMPLOYEES_SUCCESS, (state,{res}) => {
        state = {
            ...res,
            filteredEmployeeData:res.appData?.data
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
    }),
    on(EmployeeActions.ADD_EMPLOYEE,(state)=> state),
    on(EmployeeActions.ADD_EMPLOYEE_LOADING,(state)=>{
        state = {
            ...state,
            dataState:Requeststatus.LOADING
        };
        return state;
    }),
    on(EmployeeActions.ADD_EMPLOYEE_ERROR,(state,{error})=>{
        state = {
            ...state,
            dataState:Requeststatus.ERROR,
            error
        };
        return state;
    }),
    on(EmployeeActions.ADD_EMPLOYEE_SUCCESS,(state,{res})=>{
        state = {
            ...state,
            appData:{
                ...state.appData,
                data:[...state.appData?.data!,...res.appData?.data!]
            },
            filteredEmployeeData:[...state.filteredEmployeeData!,...res.appData?.data!]
        };
        localStorage.setItem('employees',JSON.stringify(state));
        let localState = JSON.parse(localStorage.getItem('employees')!);
        return localState;
    }),
    on(EmployeeActions.DELETE_EMPLOYEE,(state)=>state),
    on(EmployeeActions.DELETE_EMPLOYEE_LOADING,(state)=>{
        state = {
            ...state,
            dataState:Requeststatus.LOADING
        }
        return state;
    }),
    on(EmployeeActions.DELETE_EMPLOYEE_ERROR,(state,{error})=>{
        state = {
            ...state,
            dataState:Requeststatus.ERROR,
            error
        }
        return state;
    }),
    on(EmployeeActions.DELETE_EMPLOYEE_SUCCESS,(state,{id})=>{
        state = {
            ...state,
            appData:{
                ...state.appData,
                data:state.appData?.data!.filter(val=> val.id !== id)
            },
            filteredEmployeeData:state.filteredEmployeeData?.filter(val=> val.id !== id)
        }
        localStorage.setItem('employees',JSON.stringify(state));
        let localState = JSON.parse(localStorage.getItem('employees')!);
        return localState;
    }),
    on(EmployeeActions.UPDATE_EMPLOYEE,(state)=>state),
    on(EmployeeActions.UPDATE_EMPLOYEE_LOADING,(state)=>{
        state = {
            ...state,
            dataState:Requeststatus.LOADING
        }
        return state;
    }),
    on(EmployeeActions.UPDATE_EMPLOYEE_ERROR,(state,{error})=>{
        state = {
            ...state,
            dataState:Requeststatus.ERROR,
            error
        }
        return state;
    }),
    on(EmployeeActions.UPDATE_EMPLOYEE_SUCCESS,(state,{res})=>{
        state = {
            ...state,
            appData:{
                ...state.appData,
                data:state.appData?.data!.map(val=>{
                    if(val.id === res.appData?.data![0].id){
                        return res.appData.data![0];
                    } else {
                        return val;
                    }
                })
            },
            filteredEmployeeData:state.filteredEmployeeData?.map(val=>{
                if(val.id === res.appData?.data![0].id){
                    return res.appData.data![0];
                } else {
                    return val;
                }
            })
        };
        localStorage.setItem('employees',JSON.stringify(state));
        let localState = JSON.parse(localStorage.getItem('employees')!);
        return localState;
    })

)