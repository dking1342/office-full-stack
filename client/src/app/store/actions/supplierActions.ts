import { createAction, props } from "@ngrx/store";
import { FetchResponse, ResponseAppState, Supplier } from "src/types/general";

export const GET_SUPPLIERS = createAction(
    "[Suppliers] Get suppliers",
    props<{url:string}>()
);
export const GET_SUPPLIERS_LOADING = createAction(
    "[Suppliers] Get suppliers loading"
);
export const GET_SUPPLIERS_ERROR = createAction(
    "[Suppliers] Get suppliers error",
    props<{error:string}>()
);
export const GET_SUPPLIERS_SUCCESS = createAction(
    "[Suppliers/API] Get suppliers success",
    props<{res:ResponseAppState<FetchResponse<Supplier>>}>()
);
export const GET_SUPPLIER = createAction(
    "[Supplier/API] Get supplier",
    props<{res:ResponseAppState<FetchResponse<Supplier>>}>()
);

export const ADD_SUPPLIER = createAction(
    "[Supplier] Add supplier",
    props<{supplier:Supplier}>()
);
export const ADD_SUPPLIER_LOADING = createAction(
    "[Supplier] Add supplier loading"
);
export const ADD_SUPPLIER_ERROR = createAction(
    "[Supplier] Add supplier error",
    props<{error:string}>()
);
export const ADD_SUPPLIER_SUCCESS = createAction(
    "[Supplier/API] Add supplier success",
    props<{res:ResponseAppState<FetchResponse<Supplier>>}>()
);

export const UPDATE_SUPPLIER = createAction(
    "[Supplier] Update supplier",
    props<{supplier:Supplier,id:string}>()
);
export const UPDATE_SUPPLIER_LOADING = createAction(
    "[Supplier] Update supplier loading"
);
export const UPDATE_SUPPLIER_ERROR = createAction(
    "[Supplier] Update supplier error",
    props<{error:string}>()
);
export const UPDATE_SUPPLIER_SUCCESS = createAction(
    "[Supplier/API] Update supplier success",
    props<{res:ResponseAppState<FetchResponse<Supplier>>}>()
);

export const DELETE_SUPPLIER = createAction(
    "[Supplier] Delete supplier",
    props<{id:string}>()
);
export const DELETE_SUPPLIER_LOADING = createAction(
    "[Supplier] Delete supplier loading"
);
export const DELETE_SUPPLIER_ERROR = createAction(
    "[Supplier] Delete supplier error",
    props<{error:string}>()
);
export const DELETE_SUPPLIER_SUCCESS = createAction(
    "[Supplier/API] Delete supplier success",
    props<{id:string}>()
);