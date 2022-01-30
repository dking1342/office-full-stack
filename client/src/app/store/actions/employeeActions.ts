import { createAction, props } from "@ngrx/store";
import { Employee, FetchResponse, ResponseAppState } from "src/types/general";


export const GET_EMPLOYEES = createAction(
    "[Employees] Get Employees",
    props<{url:string}>()
);
export const GET_EMPLOYEES_LOADING = createAction(
    "[Employees] Get Employees loading"
);
export const GET_EMPLOYEES_ERROR = createAction(
    "[Employees/API] Get Employees error",
    props<{error:Error | string}>()
);
export const GET_EMPLOYEES_SUCCESS = createAction(
    "[Employees/API] Get Employees success",
    props<{res:ResponseAppState<FetchResponse<Employee>>}>()
);
export const GET_EMPLOYEES_SAVED = createAction(
    "[Employees/Localstorage] Get Employees",
    props<{res:ResponseAppState<FetchResponse<Employee>>}>()
);







export const ADD_EMPLOYEES = createAction(
    "[Employee] Add Employees",
    props<{ employee:Employee }>()
);
export const UPDATE_EMPLOYEES = createAction(
    "[Employee] Update Employees",
    props<{ employee:Employee,id:string }>()
);
export const DELETE_EMPLOYEES = createAction(
    "[Employee] Delete Employees",
    props<{id:string}>()
);
