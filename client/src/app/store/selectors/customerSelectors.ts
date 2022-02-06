import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Customer, FetchResponse, ResponseAppState } from 'src/types/general';

export const selectFeatureCustomer = createFeatureSelector<ResponseAppState<FetchResponse<Customer>>>("customers");

export const selectCustomerData = createSelector(selectFeatureCustomer,(state:ResponseAppState<FetchResponse<Customer>>)=> state.appData?.data);
export const selectCustomerDataState = createSelector(selectFeatureCustomer,(state:ResponseAppState<FetchResponse<Customer>>)=> state.dataState);
export const selectCustomerError = createSelector(selectFeatureCustomer,(state:ResponseAppState<FetchResponse<Customer>>)=> state.error);
export const selectCustomerFilteredCustomerData = createSelector(selectFeatureCustomer,(state:ResponseAppState<FetchResponse<Customer>>)=>state.filteredCustomerData);
export const selectCustomerFormData = (props:{id:string}) => createSelector(selectFeatureCustomer,(state:ResponseAppState<FetchResponse<Customer>>)=>state.appData?.data?.filter(val=>val.customer_id === props.id));
