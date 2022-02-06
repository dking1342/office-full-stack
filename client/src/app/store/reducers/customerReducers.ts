import { createReducer, on } from '@ngrx/store';
import { Requeststatus } from "src/app/enums/requeststatus";
import { Customer, FetchResponse, ResponseAppState } from "src/types/general";
import { ADD_CUSTOMER, ADD_CUSTOMER_ERROR, ADD_CUSTOMER_LOADING, ADD_CUSTOMER_SUCCESS, DELETE_CUSTOMER, DELETE_CUSTOMER_ERROR, DELETE_CUSTOMER_LOADING, DELETE_CUSTOMER_SUCCESS, GET_CUSTOMER, GET_CUSTOMERS, GET_CUSTOMERS_ERROR, GET_CUSTOMERS_LOADING, GET_CUSTOMERS_SUCCESS, UPDATE_CUSTOMER, UPDATE_CUSTOMER_ERROR, UPDATE_CUSTOMER_LOADING, UPDATE_CUSTOMER_SUCCESS } from '../actions/customerActions';

export const initialState:ResponseAppState<FetchResponse<Customer>> = {
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
    filteredCustomerData:[]
};

type fnType = (state:ResponseAppState<FetchResponse<Customer>>) => ResponseAppState<FetchResponse<Customer>>;
const saveToLocalStorage:fnType = (state) => {
    localStorage.setItem('customers',JSON.stringify(state));
    let localState = JSON.parse(localStorage.getItem('customers')!);
    return localState; 
};

export const customerReducer = createReducer(
    initialState,
    on(GET_CUSTOMERS, (state)=>state),
    on(GET_CUSTOMERS_LOADING,(state)=>{
        state = {
            ...state,
            dataState:Requeststatus.LOADING
        };
        return state;
    }),
    on(GET_CUSTOMERS_ERROR,(state,{error})=>{
        state = {
            ...state,
            error
        };
        return state;
    }),
    on(GET_CUSTOMERS_SUCCESS,(state,{res})=>{
        state = {
            ...res,
            filteredCustomerData:res.appData?.data
        };
        return saveToLocalStorage(state);
    }),
    on(GET_CUSTOMER,(state,{res})=>{
        state = {
            ...res
        };
        return saveToLocalStorage(state);
    }),
    on(ADD_CUSTOMER,(state)=>state),
    on(ADD_CUSTOMER_LOADING,(state)=> {
        state = {
            ...state,
            dataState:Requeststatus.LOADING
        }
        return state;
    }),
    on(ADD_CUSTOMER_ERROR,(state,{error})=>{
        state = {
            ...state,
            error
        }
        return state;
    }),
    on(ADD_CUSTOMER_SUCCESS,(state,{res})=>{
        state = {
            ...state,
            appData:{
                ...state.appData,
                data:[...state.appData?.data!, ...res.appData?.data!]
            },
            filteredCustomerData:[...state.filteredCustomerData!,...res.filteredCustomerData!]
        }
        return saveToLocalStorage(state);
    }),
    on(UPDATE_CUSTOMER,state=>state),
    on(UPDATE_CUSTOMER_LOADING,state=>{
        state = {
            ...state,
            dataState:Requeststatus.LOADING
        }
        return state;
    }),
    on(UPDATE_CUSTOMER_ERROR,(state,{error})=>{
        state = {
            ...state,
            error
        }
        return state;
    }),
    on(UPDATE_CUSTOMER_SUCCESS,(state,{res})=>{
        state = {
            ...state,
            appData:{
                ...state.appData,
                data:state.appData?.data!.map(item=>{
                    if(item.customer_id === res.appData?.data![0].customer_id){
                        return res.appData.data![0]
                    } else {
                        return item;
                    }
                })
            },
            filteredCustomerData:state.filteredCustomerData!.map(item=>{
                if(item.customer_id === res.filteredCustomerData![0].customer_id){
                    return res.filteredCustomerData![0]
                } else {
                    return item;
                }
            })
        }
        return saveToLocalStorage(state);
    }),
    on(DELETE_CUSTOMER,state=>state),
    on(DELETE_CUSTOMER_LOADING,state=>{
        state={
            ...state,
            dataState:Requeststatus.LOADING
        }
        return state;
    }),
    on(DELETE_CUSTOMER_ERROR,(state,{error})=>{
        state = {
            ...state,
            error
        }
        return state;
    }),
    on(DELETE_CUSTOMER_SUCCESS,(state,{id})=>{
        state = {
            ...state,
            appData:{
                ...state.appData,
                data:state.appData?.data!.filter(val=> val.customer_id !== id)
            },
            error:"",
            filteredCustomerData:state.filteredCustomerData!.filter(val=>val.customer_id !== id)
        }
        return saveToLocalStorage(state);
    })
)