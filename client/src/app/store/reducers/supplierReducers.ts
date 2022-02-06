import { createReducer, on } from '@ngrx/store';
import { Requeststatus } from "src/app/enums/requeststatus";
import { FetchResponse, ResponseAppState, Supplier } from "src/types/general";
import { ADD_SUPPLIER, ADD_SUPPLIER_ERROR, ADD_SUPPLIER_LOADING, ADD_SUPPLIER_SUCCESS, DELETE_SUPPLIER, DELETE_SUPPLIER_ERROR, DELETE_SUPPLIER_LOADING, DELETE_SUPPLIER_SUCCESS, GET_SUPPLIER, GET_SUPPLIERS, GET_SUPPLIERS_ERROR, GET_SUPPLIERS_LOADING, GET_SUPPLIERS_SUCCESS, UPDATE_SUPPLIER, UPDATE_SUPPLIER_ERROR, UPDATE_SUPPLIER_LOADING, UPDATE_SUPPLIER_SUCCESS } from '../actions/supplierActions';

const initialState:ResponseAppState<FetchResponse<Supplier>> = {
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
    filteredSupplierData:[]
};

type fnType = (state:ResponseAppState<FetchResponse<Supplier>>) => ResponseAppState<FetchResponse<Supplier>>;
const saveToLocalStorage:fnType = (state) => {
    localStorage.setItem('suppliers',JSON.stringify(state));
    let localState = JSON.parse(localStorage.getItem('suppliers')!);
    return localState; 
};

export const supplierReducer = createReducer(
    initialState,
    on(GET_SUPPLIERS,state=>state),
    on(GET_SUPPLIERS_LOADING,state=>{
        state = {
            ...state,
            dataState:Requeststatus.LOADING
        }
        return state;
    }),
    on(GET_SUPPLIERS_ERROR,(state,{error})=>{
        state = {
            ...state,
            error
        }
        return state;
    }),
    on(GET_SUPPLIERS_SUCCESS,(state,{res})=>{
        state = {
            ...res,
            filteredSupplierData:res.appData?.data
        };
        return saveToLocalStorage(state);
    }),
    on(GET_SUPPLIER,(state,{res})=>{
        state = {
            ...res
        };
        return saveToLocalStorage(state);
    }),
    on(ADD_SUPPLIER,state=>state),
    on(ADD_SUPPLIER_LOADING,state=>{
        state = {
            ...state,
            dataState:Requeststatus.LOADING
        };
        return state;
    }),
    on(ADD_SUPPLIER_ERROR,(state,{error})=>{
        state={
            ...state,
            error
        };
        return state;
    }),
    on(ADD_SUPPLIER_SUCCESS,(state,{res})=>{
        state = {
            ...state,
            appData:{
                ...state.appData,
                data:[...state.appData?.data!,...res.appData?.data!]
            },
            filteredSupplierData:[...state.filteredSupplierData!,...res.filteredSupplierData!]
        };
        return saveToLocalStorage(state);
    }),
    on(UPDATE_SUPPLIER,state=>state),
    on(UPDATE_SUPPLIER_LOADING,state=>{
        state = {
            ...state,
            dataState:Requeststatus.LOADING
        };
        return state;
    }),
    on(UPDATE_SUPPLIER_ERROR,(state,{error})=>{
        state = {
            ...state,
            error
        };
        return state;
    }),
    on(UPDATE_SUPPLIER_SUCCESS,(state,{res})=>{
        state = {
            ...state,
            appData:{
                ...state.appData,
                data:state.appData?.data!.map(item=>{
                    if(item.supplier_id === res.appData?.data![0].supplier_id){
                        return res.appData.data![0]
                    } else {
                        return item
                    }
                })
            },
            filteredSupplierData:state.filteredSupplierData!.map(item=>{
                if(item.supplier_id === res.filteredSupplierData![0].supplier_id){
                    return res.filteredSupplierData![0]
                } else {
                    return item;
                }
            })
        };
        return saveToLocalStorage(state);
    }),
    on(DELETE_SUPPLIER,state=>state),
    on(DELETE_SUPPLIER_LOADING,state=>{
        state = {
            ...state,
            dataState:Requeststatus.LOADING
        };
        return state;
    }),
    on(DELETE_SUPPLIER_ERROR,(state,{error})=>{
        state = {
            ...state,
            error
        };
        return state;
    }),
    on(DELETE_SUPPLIER_SUCCESS,(state,{id})=>{
        state = {
            ...state,
            appData:{
                ...state.appData,
                data:state.appData?.data!.filter(item=> item.supplier_id !== id)
            },
            filteredSupplierData:state.filteredSupplierData!.filter(item=>item.supplier_id !== id)
        };
        return saveToLocalStorage(state);
    })
)