import { createAction, props } from "@ngrx/store";
import { FetchResponse, Product, ResponseAppState } from "src/types/general";

export const GET_PRODUCTS = createAction(
    "[Products] Get products",
    props<{url:string}>()
);
export const GET_PRODUCTS_LOADING = createAction(
    "[Products] Get products loading"
);
export const GET_PRODUCTS_ERROR = createAction(
    "[Products] Get products error",
    props<{error:string}>()
);
export const GET_PRODUCTS_SUCCESS = createAction(
    "[Products/API] Get products success",
    props<{res:ResponseAppState<FetchResponse<Product>>}>()
);
export const GET_PRODUCT = createAction(
    "[Product/API] Get product",
    props<{res:ResponseAppState<FetchResponse<Product>>}>()
);

export const ADD_PRODUCT = createAction(
    "[Product] Add product",
    props<{product:Product}>()
);
export const ADD_PRODUCT_LOADING = createAction(
    "[Product] Add product loading"
);
export const ADD_PRODUCT_ERROR = createAction(
    "[Product] Add product error",
    props<{error:string}>()
);
export const ADD_PRODUCT_SUCCESS = createAction(
    "[Product/API] Add product success",
    props<{res:ResponseAppState<FetchResponse<Product>>}>()
);

export const UPDATE_PRODUCT = createAction(
    "[Product] Update product",
    props<{product:Product,id:string}>()
);
export const UPDATE_PRODUCT_LOADING = createAction(
    "[Product] Update product loading"
);
export const UPDATE_PRODUCT_ERROR = createAction(
    "[Product] Update product error",
    props<{error:string}>()
);
export const UPDATE_PRODUCT_SUCCESS = createAction(
    "[Product/API] Update product success",
    props<{res:ResponseAppState<FetchResponse<Product>>}>()
);