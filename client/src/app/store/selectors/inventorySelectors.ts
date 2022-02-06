import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FetchResponse, Inventory, ResponseAppState } from 'src/types/general';

export const selectFeatureInventory = createFeatureSelector<ResponseAppState<FetchResponse<Inventory>>>("inventory");

export const selectInventoryData = createSelector(selectFeatureInventory,(state:ResponseAppState<FetchResponse<Inventory>>)=>state.appData?.data);
export const selectInventoryDataState = createSelector(selectFeatureInventory,(state:ResponseAppState<FetchResponse<Inventory>>)=>state.dataState);
export const selectInventoryError = createSelector(selectFeatureInventory,(state:ResponseAppState<FetchResponse<Inventory>>)=>state.error);
export const selectInventoryFilteredData = createSelector(selectFeatureInventory,(state:ResponseAppState<FetchResponse<Inventory>>)=>state.filteredInventoryData);
export const selectInventoryFilterResults = (props:{id:string}) => createSelector(
    selectFeatureInventory,
    (state:ResponseAppState<FetchResponse<Inventory>>)=>{
        console.log(props.id);
        return state;
    });

