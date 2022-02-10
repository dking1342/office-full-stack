import { createReducer, on } from '@ngrx/store';
import { Requeststatus } from "src/app/enums/requeststatus";
import { Branch, FetchResponse, ResponseAppState } from "src/types/general";
import { ADD_BRANCH, ADD_BRANCH_ERROR, ADD_BRANCH_LOADING, ADD_BRANCH_SUCCESS, GET_BRANCH, GET_BRANCHES, GET_BRANCHES_ERROR, GET_BRANCHES_LOADING, GET_BRANCHES_SUCCESS, UPDATE_BRANCH, UPDATE_BRANCH_ERROR, UPDATE_BRANCH_LOADING, UPDATE_BRANCH_SUCCESS } from '../actions/branchActions';

export const initialState:ResponseAppState<FetchResponse<Branch>> = {
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
    filteredBranchData:[]
}

type fnType = (state:ResponseAppState<FetchResponse<Branch>>) => ResponseAppState<FetchResponse<Branch>>;

const saveToLocalStorage:fnType = (state) => {
    localStorage.setItem('branches',JSON.stringify(state));
    let localState = JSON.parse(localStorage.getItem('branches')!);
    return localState;
};

export const branchReducer = createReducer(
    initialState,
    on(GET_BRANCHES,state => state),
    on(GET_BRANCHES_LOADING,state => {
        state = {
            ...state,
            dataState:Requeststatus.LOADING
        }
        return state;
    }),
    on(GET_BRANCHES_ERROR,(state,{error})=>{
        state = {
            ...state,
            dataState:Requeststatus.ERROR,
            error
        }
        return state;
    }),
    on(GET_BRANCHES_SUCCESS,(state,{res})=>{
        state = {
            ...res,
            filteredBranchData:res.appData?.data
        }
        return saveToLocalStorage(state);
    }),
    on(GET_BRANCH,(state,{res})=>{
        state = {
            ...res
        }
        return saveToLocalStorage(state);
    }),
    on(ADD_BRANCH,(state)=>state),
    on(ADD_BRANCH_LOADING,(state)=>{
        state = {
            ...state,
            dataState:Requeststatus.LOADING
        }
        return state;
    }),
    on(ADD_BRANCH_ERROR,(state,{error})=>{
        state = {
            ...state,
            dataState:Requeststatus.ERROR,
            error
        }
        return state;
    }),
    on(ADD_BRANCH_SUCCESS,(state,{res})=>{
        state = {
            ...state,
            appData:{
                ...res,
                data:[...state.appData?.data!,...res.appData?.data!]
            },
            filteredBranchData:[...state.filteredBranchData!,...res.filteredBranchData!]
        };
        return saveToLocalStorage(state);
    }),
    on(UPDATE_BRANCH,(state)=>state),
    on(UPDATE_BRANCH_LOADING,(state)=>{
        state = {
            ...state,
            dataState:Requeststatus.LOADING
        }
        return state;
    }),
    on(UPDATE_BRANCH_ERROR,(state,{error})=>{
        state = {
            ...state,
            dataState:Requeststatus.ERROR,
            error
        }
        return state;
    }),
    on(UPDATE_BRANCH_SUCCESS,(state,{res})=>{
        state = {
            ...state,
            appData:{
                ...state.appData,
                data:state.appData?.data!.map(item=>{
                    if(item.branch_id === res.appData?.data![0].branch_id){
                        return res.appData.data![0]
                    } else {
                        return item
                    }
                })
            },
            error:"",
            filteredBranchData:state.filteredBranchData?.map(item=>{
                if(item.branch_id === res.filteredBranchData![0].branch_id){
                    return res.filteredBranchData![0]
                } else {
                    return item;
                }
            })           
        }
        return saveToLocalStorage(state);
    })
)