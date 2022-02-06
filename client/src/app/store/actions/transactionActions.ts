import { createAction, props } from "@ngrx/store";
import { Customer, Employee, FetchResponse, Product, ResponseAppState, Supplier, Transaction } from "src/types/general";

export const GET_TRANSACTIONS = createAction(
    "[Transactions] Get transactions",
    props<{url:string}>()
);
export const GET_TRANSACTIONS_LOADING = createAction(
    "[Transactions] Get transactions loading"
);
export const GET_TRANSACTIONS_ERROR = createAction(
    "[Transactions] Get transactions error",
    props<{error:string}>()
);
export const GET_TRANSACTIONS_SUCCESS = createAction(
    "[Transactions/API] Get transactions success",
    props<{res:ResponseAppState<FetchResponse<Transaction>>}>()
);
export const GET_TRANSACTION = createAction(
    "[Transaction/API] Get transaction",
    props<{res:ResponseAppState<FetchResponse<Transaction>>}>()
);

export const ADD_TRANSACTION = createAction(
    "[Transaction] Add transaction",
    props<{transaction:Transaction}>()
);
export const ADD_TRANSACTION_LOADING = createAction(
    "[Transaction] Add transaction loading"
);
export const ADD_TRANSACTION_ERROR = createAction(
    "[Transaction] Add transaction error",
    props<{error:string}>()
);
export const ADD_TRANSACTION_SUCCESS = createAction(
    "[Transaction/API] Add transaction success",
    props<{res:ResponseAppState<FetchResponse<Transaction>>}>()
);

export const UPDATE_TRANSACTION = createAction(
    "[Transaction] Update transaction",
    props<{transaction:Transaction,id:string}>()
);
export const UPDATE_TRANSACTION_LOADING = createAction(
    "[Transaction] Update transaction loading"
);
export const UPDATE_TRANSACTION_ERROR = createAction(
    "[Transaction] Update transaction error",
    props<{error:string}>()
);
export const UPDATE_TRANSACTION_SUCCESS = createAction(
    "[Transaction/API] Update transaction success",
    props<{res:ResponseAppState<FetchResponse<Transaction>>}>()
);

export const EDIT_TRANSACTION_EMPLOYEE = createAction(
    "[Transaction/Edit] Edit transaction employee",
    props<{employee:Employee}>()
);
export const EDIT_TRANSACTION_PRODUCT = createAction(
    "[Transaction/Edit] Edit transaction product",
    props<{product:Product}>()
);
export const EDIT_TRANSACTION_TYPE = createAction(
    "[Transaction/Edit] Edit transaction type",
    props<{transactionType:string}>()
);
export const EDIT_TRANSACTION_QUANTITY = createAction(
    "[Transaction/Edit] Edit transaction quantity",
    props<{quantity:number}>()
);
export const EDIT_TRANSACTION_SUPPLIER = createAction(
    "[Transaction/Edit] Edit transaction supplier",
    props<{supplier:Supplier | null}>()
);
export const EDIT_TRANSACTION_CUSTOMER = createAction(
    "[Transaction/Edit] Edit transaction customer",
    props<{customer:Customer | null}>()
);
export const EDIT_TRANSACTION_CLEAR = createAction(
    "[Transaction/Edit] Edit transaction clear"
);
