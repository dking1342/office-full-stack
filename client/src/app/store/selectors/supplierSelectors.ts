import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Supplier, FetchResponse, ResponseAppState } from 'src/types/general';

export const selectFeatureSupplier = createFeatureSelector<ResponseAppState<FetchResponse<Supplier>>>("suppliers");

export const selectSupplierData = createSelector(selectFeatureSupplier,(state:ResponseAppState<FetchResponse<Supplier>>)=>state.appData?.data!);
export const selectSupplierDataState = createSelector(selectFeatureSupplier,(state:ResponseAppState<FetchResponse<Supplier>>)=>state.dataState);
export const selectSupplierError = createSelector(selectFeatureSupplier,(state:ResponseAppState<FetchResponse<Supplier>>)=>state.error);
export const selectSupplierFilteredSupplierData = createSelector(selectFeatureSupplier,(state:ResponseAppState<FetchResponse<Supplier>>)=>state.filteredSupplierData);
export const selectSupplierProductsData = createSelector(selectFeatureSupplier,(state:ResponseAppState<FetchResponse<Supplier>>)=>state.filteredSupplierData![0].products);
export const selectSupplierFormData = (props:{id:string}) => createSelector(selectFeatureSupplier,(state:ResponseAppState<FetchResponse<Supplier>>)=>state.appData?.data?.filter(val=>val.supplier_id === props.id));
export const selectSupplierDropDown = (props:{id:string}) => createSelector(
    selectFeatureSupplier,
    (state:ResponseAppState<FetchResponse<Supplier>>)=>{
        return state.filteredSupplierData?.map((supplier)=>{
            let result:Supplier = {supplier_id:"",sname:"",products:[]};
            supplier.products.forEach(item=>{
                if(item.product_id === props.id){
                    result = supplier;
                } 
            });
            return result;
        }).filter(item=>item.supplier_id)
    }
);