import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FetchResponse, ResponseAppState, Transaction } from 'src/types/general';

export const selectFeatureTransaction = createFeatureSelector<ResponseAppState<FetchResponse<Transaction>>>("transactions");

export const selectTransactionData = createSelector(selectFeatureTransaction,(state:ResponseAppState<FetchResponse<Transaction>>)=>state.appData?.data);
export const selectTransactionDataState = createSelector(selectFeatureTransaction,(state:ResponseAppState<FetchResponse<Transaction>>)=>state.dataState);
export const selectTransactionError = createSelector(selectFeatureTransaction,(state:ResponseAppState<FetchResponse<Transaction>>)=>state.error);
export const selectTransactionFilterData = createSelector(selectFeatureTransaction,(state:ResponseAppState<FetchResponse<Transaction>>)=>state.filteredTransactionData);
export const selectTransactionFormData = (props:{id:string}) => createSelector(selectFeatureTransaction,(state:ResponseAppState<FetchResponse<Transaction>>)=>state.filteredTransactionData?.filter(item=> item.transaction_id === props.id));
export const selectTransactionFormOutput = createSelector(selectFeatureTransaction,(state:ResponseAppState<FetchResponse<Transaction>>)=>state.transaction);
