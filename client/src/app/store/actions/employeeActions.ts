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

export const ADD_EMPLOYEE = createAction(
    "[Employee] Add Employees",
    props<{ employee:Employee }>()
);
export const ADD_EMPLOYEE_LOADING = createAction(
    "[Employee] Add employee loading"
);
export const ADD_EMPLOYEE_ERROR = createAction(
    "[Employee/API] Add employee error",
    props<{error:string}>()
);
export const ADD_EMPLOYEE_SUCCESS = createAction(
    "[Employee/API] Add employee success",
    props<{res:ResponseAppState<FetchResponse<Employee>>}>()
);

export const DELETE_EMPLOYEE = createAction(
    "[Employee] Delete Employee",
    props<{id:string}>()
);
export const DELETE_EMPLOYEE_LOADING = createAction(
    "[Employee] Delete employee"
);
export const DELETE_EMPLOYEE_ERROR = createAction(
    "[Employee/API] Delete employee error",
    props<{error:string}>()
);
export const DELETE_EMPLOYEE_SUCCESS = createAction(
    "[Employee/API] Delete employee success",
    props<{id:string}>()
);

export const UPDATE_EMPLOYEE = createAction(
    "[Employee] Update Employee",
    props<{ employee:Employee,id:string }>()
);
export const UPDATE_EMPLOYEE_LOADING = createAction(
    "[Employee] Update employee loading"
);
export const UPDATE_EMPLOYEE_ERROR = createAction(
    "[Employee/API] Update employee error",
    props<{error:string}>()
);
export const UPDATE_EMPLOYEE_SUCCESS = createAction(
    "[Employee/API] Update employee success",
    props<{res:ResponseAppState<FetchResponse<Employee>>}>()
);