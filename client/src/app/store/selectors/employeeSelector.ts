import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Employee, FetchResponse, ResponseAppState } from 'src/types/general';

export const selectFeatureEmployee = createFeatureSelector<ResponseAppState<FetchResponse<Employee>>>("employees");

export const selectEmployeeData = createSelector(selectFeatureEmployee,(state:ResponseAppState<FetchResponse<Employee>>) => state.appData?.data);
export const selectEmployeeDataState = createSelector(selectFeatureEmployee,(state:ResponseAppState<FetchResponse<Employee>>)=> state.dataState);
export const selectEmployeeError = createSelector(selectFeatureEmployee,(state:ResponseAppState<FetchResponse<Employee>>)=> state.error);
export const selectEmployeeFilteredData = createSelector(selectFeatureEmployee,(state:ResponseAppState<FetchResponse<Employee>>)=> state.filteredData);