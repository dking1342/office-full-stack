import { createAction, props } from "@ngrx/store";
import { FetchResponse, Inventory, ResponseAppState } from "src/types/general";

export const GET_INVENTORY = createAction(
    "[Inventory] Get inventory"
);
export const GET_INVENTORY_LOADING = createAction(
    "[Inventory] Get inventory loading"
);
export const GET_INVENTORY_ERROR = createAction(
    "[Inventory] Get inventory error",
    props<{error:string}>()
);
export const GET_INVENTORY_SUCCESS = createAction(
    "[Inventory/API] Get inventory success",
    props<{res:ResponseAppState<FetchResponse<Inventory>>}>()
);

export const FILTER_INVENTORY = createAction(
    "[Inventory] Filter inventory",
    props<{id:string}>()
);
export const SEARCH_INVENTORY = createAction(
    "[Inventory] Search inventory",
    props<{search:string}>()
);
export const UNFILTER_INVENTORY = createAction(
    "[Inventory] Unfilter inventory"
);
export const SORT_INVENTORY = createAction(
    "[Inventory] Sort inventory",
    props<{direction:string}>()
);
export const SORT_QUANTITY = createAction(
    "[Inventory] Sort quantity",
    props<{direction:string}>()
);