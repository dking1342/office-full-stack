import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Employee, FetchResponse, ResponseAppState } from 'src/types/general';

export const selectFeatureEmployee = createFeatureSelector<ResponseAppState<FetchResponse<Employee>>>("employees");

export const selectEmployeeData = createSelector(selectFeatureEmployee,(state:ResponseAppState<FetchResponse<Employee>>) => state.appData?.data);
export const selectEmployeeDataState = createSelector(selectFeatureEmployee,(state:ResponseAppState<FetchResponse<Employee>>)=> state.dataState);
export const selectEmployeeError = createSelector(selectFeatureEmployee,(state:ResponseAppState<FetchResponse<Employee>>)=> state.error);
export const selectEmployeeFilteredEmployeeData = createSelector(selectFeatureEmployee,(state:ResponseAppState<FetchResponse<Employee>>)=> state.filteredEmployeeData);
export const selectEmployeeFormData = (props:{id:string}) => createSelector(selectFeatureEmployee,(state:ResponseAppState<FetchResponse<Employee>>) => state.appData?.data!.filter(val=>val.id === props.id));