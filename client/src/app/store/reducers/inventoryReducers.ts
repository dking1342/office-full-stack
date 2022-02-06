import { createReducer, on } from '@ngrx/store';
import { Requeststatus } from 'src/app/enums/requeststatus';
import { FetchResponse, Inventory, ResponseAppState } from 'src/types/general';
import { FILTER_INVENTORY, GET_INVENTORY, GET_INVENTORY_ERROR, GET_INVENTORY_LOADING, GET_INVENTORY_SUCCESS, SEARCH_INVENTORY, SORT_INVENTORY, SORT_QUANTITY, UNFILTER_INVENTORY } from '../actions/inventoryActions';

export const initialState:ResponseAppState<FetchResponse<Inventory>> = {
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
    filteredInventoryData:[]
};

type fnType = (state:ResponseAppState<FetchResponse<Inventory>>) => ResponseAppState<FetchResponse<Inventory>>;
const saveToLocalStorage:fnType = (state) => {
    localStorage.setItem('inventory',JSON.stringify(state));
    let localState = JSON.parse(localStorage.getItem('inventory')!);
    return localState; 
};

export const inventoryReducer = createReducer(
    initialState,
    on(GET_INVENTORY,state=>state),
    on(GET_INVENTORY_LOADING,state=>{
        state = {
            ...state,
            dataState:Requeststatus.LOADING
        };
        return state;
    }),
    on(GET_INVENTORY_ERROR,(state,{error})=>{
        state = {
            ...state,
            error
        };
        return state;
    }),
    on(GET_INVENTORY_SUCCESS,(state,{res})=>{
        state = {
            ...res,
            filteredInventoryData:res.appData?.data
        };
        return saveToLocalStorage(state);
    }),
    on(FILTER_INVENTORY,(state,{id})=>{
        state = {
            ...state,
            filteredInventoryData:state.appData?.data?.filter(item=>item.product.product_id === id)
        }
        return state;
    }),
    on(UNFILTER_INVENTORY,(state)=>{
        state = {
            ...state,
            filteredInventoryData:state.appData?.data
        }
        return state;
    }),
    on(SORT_INVENTORY,(state,{direction})=>{
        if(direction === "none"){
            state = {
                ...state,
                filteredInventoryData:state.filteredInventoryData
            }
            return state;
        } else if(direction === "asc"){
            state = {
                ...state,
                filteredInventoryData:[...state.filteredInventoryData!].sort((a,b)=>a.product.pname.localeCompare(b.product.pname))
            }
            return state;
        } else if(direction === "des"){
            state = {
                ...state,
                filteredInventoryData:[...state.filteredInventoryData!].sort((a,b)=>b.product.pname.localeCompare(a.product.pname))
            }
            return state;
        } else {
            return state;
        }
    }),
    on(SORT_QUANTITY,(state,{direction})=>{
        if(direction === "none"){
            state = {
                ...state,
                filteredInventoryData:state.appData?.data
            }
            return state;
        } else if(direction === "asc"){
            state = {
                ...state,
                filteredInventoryData:[...state.filteredInventoryData!].sort((a,b)=>a.quantity - b.quantity)
            }
            return state;
        } else if(direction === "des"){
            state = {
                ...state,
                filteredInventoryData:[...state.filteredInventoryData!].sort((a,b)=>b.quantity - a.quantity)
            }
            return state;
        } else {
            return state;
        }
    }),
    on(SEARCH_INVENTORY,(state,{search})=>{
        let inventory = [...state.appData?.data!].filter(item=> {
            let product = item.product.pname.toLocaleLowerCase();
            let checker = search.toLocaleLowerCase();
            return product.includes(checker);
        });
        state = {
            ...state,
            filteredInventoryData:inventory
        }
        return state;
    })
)