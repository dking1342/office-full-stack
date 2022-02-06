import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ResponseAppState, FetchResponse, Branch } from "src/types/general";


export const selectFeatureBranch = createFeatureSelector<ResponseAppState<FetchResponse<Branch>>>("branches");

export const selectBranchData = createSelector(selectFeatureBranch,(state:ResponseAppState<FetchResponse<Branch>>) => state.appData?.data);
export const selectBranchDataState = createSelector(selectFeatureBranch,(state:ResponseAppState<FetchResponse<Branch>>) => state.dataState);
export const selectBranchError = createSelector(selectFeatureBranch,(state:ResponseAppState<FetchResponse<Branch>>) => state.error);
export const selectBranchFilteredBranchData = createSelector(selectFeatureBranch,(state:ResponseAppState<FetchResponse<Branch>>) => state.filteredBranchData);
export const selectBranchFormData = (props:{id:string}) => createSelector(selectFeatureBranch,(state:ResponseAppState<FetchResponse<Branch>>) => state.appData?.data?.filter(val=> val.branch_id === props.id));