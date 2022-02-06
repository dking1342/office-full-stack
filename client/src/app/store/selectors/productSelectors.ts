import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FetchResponse, Product, ResponseAppState } from 'src/types/general';

export const selectFeatureProduct = createFeatureSelector<ResponseAppState<FetchResponse<Product>>>("products");

export const selectProductData = createSelector(selectFeatureProduct,(state:ResponseAppState<FetchResponse<Product>>)=> state.appData?.data);
export const selectProductDataState = createSelector(selectFeatureProduct,(state:ResponseAppState<FetchResponse<Product>>)=> state.dataState);
export const selectProductError = createSelector(selectFeatureProduct,(state:ResponseAppState<FetchResponse<Product>>)=> state.error);
export const selectProductFilteredProductData = createSelector(selectFeatureProduct,(state:ResponseAppState<FetchResponse<Product>>)=>state.filteredProductData);
export const selectProductFormData = (props:{id:string}) => createSelector(selectFeatureProduct,(state:ResponseAppState<FetchResponse<Product>>)=>state.appData?.data?.filter(val=>val.product_id === props.id));
