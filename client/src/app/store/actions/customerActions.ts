import { createAction, props } from "@ngrx/store";
import { Customer, FetchResponse, ResponseAppState } from "src/types/general";

export const GET_CUSTOMERS = createAction(
    "[Customers] Get customers",
    props<{url:string}>()
);
export const GET_CUSTOMERS_LOADING = createAction(
    "[Customers] Get customers loading"
);
export const GET_CUSTOMERS_ERROR = createAction(
    "[Customers] Get customers error",
    props<{error:string}>()
);
export const GET_CUSTOMERS_SUCCESS = createAction(
    "[Customers/API] Get customers success",
    props<{res:ResponseAppState<FetchResponse<Customer>>}>()
);
export const GET_CUSTOMER = createAction(
    "[Customer/API] Get customer",
    props<{res:ResponseAppState<FetchResponse<Customer>>}>()
);

export const ADD_CUSTOMER = createAction(
    "[Customer] Add customer",
    props<{customer:Customer}>()
);
export const ADD_CUSTOMER_LOADING = createAction(
    "[Customer] Add customer loading"
);
export const ADD_CUSTOMER_ERROR = createAction(
    "[Customer] Add customer error",
    props<{error:string}>()
);
export const ADD_CUSTOMER_SUCCESS = createAction(
    "[Customer/API] Add customer success",
    props<{res:ResponseAppState<FetchResponse<Customer>>}>()
);

export const UPDATE_CUSTOMER = createAction(
    "[Customer] Update customer",
    props<{customer:Customer,id:string}>()
);
export const UPDATE_CUSTOMER_LOADING = createAction(
    "[Customer] Update customer loading"
);
export const UPDATE_CUSTOMER_ERROR = createAction(
    "[Customer] Update customer error",
    props<{error:string}>()
);
export const UPDATE_CUSTOMER_SUCCESS = createAction(
    "[Customer/API] Update customer success",
    props<{res:ResponseAppState<FetchResponse<Customer>>}>()
);

export const DELETE_CUSTOMER = createAction(
    "[Customer] Delete customer",
    props<{id:string}>()
);
export const DELETE_CUSTOMER_LOADING = createAction(
    "[Customer] Delete customer loading"
);
export const DELETE_CUSTOMER_ERROR = createAction(
    "[Customer] Delete customer error",
    props<{error:string}>()
);
export const DELETE_CUSTOMER_SUCCESS = createAction(
    "[Customer/API] Delete customer success",
    props<{id:string}>()
)