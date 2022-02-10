import { state } from '@angular/animations';
import { createReducer, on } from '@ngrx/store';
import { Requeststatus } from 'src/app/enums/requeststatus';
import { FetchResponse, ResponseAppState, Transaction } from 'src/types/general';
import { ADD_TRANSACTION, ADD_TRANSACTION_ERROR, ADD_TRANSACTION_LOADING, ADD_TRANSACTION_SUCCESS, EDIT_TRANSACTION_CLEAR, EDIT_TRANSACTION_CUSTOMER, EDIT_TRANSACTION_EMPLOYEE, EDIT_TRANSACTION_PRODUCT, EDIT_TRANSACTION_QUANTITY, EDIT_TRANSACTION_SUPPLIER, EDIT_TRANSACTION_TYPE, GET_TRANSACTION, GET_TRANSACTIONS, GET_TRANSACTIONS_ERROR, GET_TRANSACTIONS_LOADING, GET_TRANSACTIONS_SUCCESS, UPDATE_TRANSACTION, UPDATE_TRANSACTION_ERROR, UPDATE_TRANSACTION_LOADING, UPDATE_TRANSACTION_SUCCESS } from '../actions/transactionActions';

export const initialState:ResponseAppState<FetchResponse<Transaction>> = {
    dataState:Requeststatus.LOADED,
    appData:{
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
    filteredTransactionData:[],
    transaction:{
        transaction_id:"",
        employee:{id:"",firstName:"",lastName:"",role:"",branch:{branch_id:"",location:"",branchStatus:""}},
        product:{product_id:"",pname:""},
        transactionType:"",
        supplier:{supplier_id:"",sname:"",products:[]},
        customer:{customer_id:"",cname:""},
        transaction_quantity:1
    }
};

type fnType = (state:ResponseAppState<FetchResponse<Transaction>>) => ResponseAppState<FetchResponse<Transaction>>;
const saveToLocalStorage:fnType = (state) => {
    localStorage.setItem('transactions',JSON.stringify(state));
    let localState = JSON.parse(localStorage.getItem('transactions')!);
    return localState; 
};

export const transactionReducer = createReducer(
    initialState,
    on(GET_TRANSACTIONS,state=>state),
    on(GET_TRANSACTIONS_LOADING,state=>{
        state = {
            ...state,
            dataState:Requeststatus.LOADING
        }
        return state;
    }),
    on(GET_TRANSACTIONS_ERROR,(state,{error})=>{
        state = {
            ...state,
            dataState:Requeststatus.ERROR,
            error
        };
        return state;
    }),
    on(GET_TRANSACTIONS_SUCCESS,(state,{res})=>{
        state = {
            ...res,
            filteredTransactionData:res.appData?.data
        };
        return saveToLocalStorage(state);
    }),
    on(GET_TRANSACTION,(state,{res})=>{
        state = {
            ...res
        };
        return saveToLocalStorage(state);
    }),
    on(ADD_TRANSACTION,state=>state),
    on(ADD_TRANSACTION_LOADING,state=>{
        state = {
            ...state,
            dataState:Requeststatus.LOADING
        }
        return state;
    }),
    on(ADD_TRANSACTION_ERROR,(state,{error})=>{
        state = {
            ...state,
            dataState:Requeststatus.ERROR,
            error
        }
        return state;
    }),
    on(ADD_TRANSACTION_SUCCESS,(state,{res})=>{
        state = {
            ...state,
            appData:{
                ...res.appData,
                data:[...state.appData?.data!,...res.appData?.data!]
            },
            error:res.error,
            filteredTransactionData:[...state.filteredTransactionData!,...res.filteredTransactionData!]
        }
        return saveToLocalStorage(state);
    }),
    on(UPDATE_TRANSACTION,state=>state),
    on(UPDATE_TRANSACTION_LOADING,state=>{
        state = {
            ...state,
            dataState:Requeststatus.LOADING
        }
        return state;
    }),
    on(UPDATE_TRANSACTION_ERROR,(state,{error})=>{
        state = {
            ...state,
            dataState:Requeststatus.ERROR,
            error
        }
        return state;
    }),
    on(UPDATE_TRANSACTION_SUCCESS,(state,{res})=>{
        state = {
            ...state,
            appData:{
                ...state.appData,
                data:state.appData?.data?.map(item=>{
                    if(item.transaction_id === res.appData?.data![0].transaction_id){
                        return res.appData.data![0]
                    } else {
                        return item;
                    }
                })
            },
            error:"",
            filteredTransactionData:state.filteredTransactionData!.map(item=>{
                if(item.transaction_id === res.filteredTransactionData![0].transaction_id){
                    return res.filteredTransactionData![0]
                } else {
                    return item;
                }
            })
        }
        return saveToLocalStorage(state);
    }),
    on(EDIT_TRANSACTION_EMPLOYEE,(state,{employee})=>{
        state = {
            ...state,
            transaction:{
                ...state.transaction!,
                employee
            }
        }
        return state;
    }),
    on(EDIT_TRANSACTION_PRODUCT,(state,{product})=>{
        state = {
            ...state,
            transaction:{
                ...state.transaction!,
                product
            }
        }
        return state;
    }),
    on(EDIT_TRANSACTION_TYPE,(state,{transactionType})=>{
        state = {
            ...state,
            transaction:{
                ...state.transaction!,
                transactionType
            }
        }
        return state;
    }),
    on(EDIT_TRANSACTION_QUANTITY,(state,{quantity})=>{
        state = {
            ...state,
            transaction:{
                ...state.transaction!,
                transaction_quantity:quantity
            }
        }
        return state;
    }),
    on(EDIT_TRANSACTION_SUPPLIER,(state,{supplier})=>{
        state = {
            ...state,
            transaction:{
                ...state.transaction!,
                supplier
            }
        }
        return state;
    }),
    on(EDIT_TRANSACTION_CUSTOMER,(state,{customer})=>{
        state = {
            ...state,
            transaction:{
                ...state.transaction!,
                customer
            }
        }
        return state;
    }),
    on(EDIT_TRANSACTION_CLEAR,state=>{
        state = {
            ...state,
            transaction:{
                transaction_id:"",
                employee:{id:"",firstName:"",lastName:"",role:"",branch:{branch_id:"",location:"",branchStatus:""}},
                product:{product_id:"",pname:""},
                transactionType:"",
                supplier:{supplier_id:"",sname:"",products:[]},
                customer:{customer_id:"",cname:""},
                transaction_quantity:0  
            }
        }
        return state;
    })
)