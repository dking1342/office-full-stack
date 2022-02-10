import { Requeststatus } from "src/app/enums/requeststatus";
import { ResponseAppState, FetchResponse, Product } from "src/types/general";
import { createReducer, on } from '@ngrx/store';
import { GET_PRODUCTS, GET_PRODUCTS_LOADING, GET_PRODUCTS_ERROR, GET_PRODUCTS_SUCCESS, GET_PRODUCT, ADD_PRODUCT, ADD_PRODUCT_ERROR, ADD_PRODUCT_LOADING, ADD_PRODUCT_SUCCESS, UPDATE_PRODUCT, UPDATE_PRODUCT_ERROR, UPDATE_PRODUCT_LOADING, UPDATE_PRODUCT_SUCCESS } from "../actions/productActions";

export const initialState:ResponseAppState<FetchResponse<Product>> = {
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
    filteredProductData:[]
};

type fnType = (state:ResponseAppState<FetchResponse<Product>>) => ResponseAppState<FetchResponse<Product>>;
const saveToLocalStorage:fnType = (state) => {
    localStorage.setItem('products',JSON.stringify(state));
    let localState = JSON.parse(localStorage.getItem('products')!);
    return localState; 
};

export const productReducer = createReducer(
    initialState,
    on(GET_PRODUCTS, (state)=>state),
    on(GET_PRODUCTS_LOADING,(state)=>{
        state = {
            ...state,
            dataState:Requeststatus.LOADING
        };
        return state;
    }),
    on(GET_PRODUCTS_ERROR,(state,{error})=>{
        state = {
            ...state,
            dataState:Requeststatus.ERROR,
            error
        };
        return state;
    }),
    on(GET_PRODUCTS_SUCCESS,(state,{res})=>{
        state = {
            ...res,
            filteredProductData:res.appData?.data
        };
        return saveToLocalStorage(state);
    }),
    on(GET_PRODUCT,(state,{res})=>{
        state = {
            ...res
        };
        return saveToLocalStorage(state);
    }),
    on(ADD_PRODUCT,(state)=>state),
    on(ADD_PRODUCT_LOADING,(state)=> {
        state = {
            ...state,
            dataState:Requeststatus.LOADING
        }
        return state;
    }),
    on(ADD_PRODUCT_ERROR,(state,{error})=>{
        state = {
            ...state,
            dataState:Requeststatus.ERROR,
            error
        }
        return state;
    }),
    on(ADD_PRODUCT_SUCCESS,(state,{res})=>{
        state = {
            ...state,
            appData:{
                ...state.appData,
                data:[...state.appData?.data!, ...res.appData?.data!]
            },
            filteredProductData:[...state.filteredProductData!,...res.filteredProductData!]
        }
        return saveToLocalStorage(state);
    }), 
    on(UPDATE_PRODUCT,state=>state),
    on(UPDATE_PRODUCT_LOADING,state=>{
        state = {
            ...state,
            dataState:Requeststatus.LOADING
        }
        return state;
    }),
    on(UPDATE_PRODUCT_ERROR,(state,{error})=>{
        state = {
            ...state,
            dataState:Requeststatus.ERROR,
            error
        }
        return state;
    }),
    on(UPDATE_PRODUCT_SUCCESS,(state,{res})=>{
        state = {
            ...state,
            appData:{
                ...state.appData,
                data:state.appData?.data!.map(item=>{
                    if(item.product_id === res.appData?.data![0].product_id){
                        return res.appData.data![0]
                    } else {
                        return item;
                    }
                })
            },
            filteredProductData:state.filteredProductData!.map(item=>{
                if(item.product_id === res.filteredProductData![0].product_id){
                    return res.filteredProductData![0]
                } else {
                    return item;
                }
            })
        }
        return saveToLocalStorage(state);
    }),
)