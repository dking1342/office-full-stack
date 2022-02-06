import { createAction, props } from "@ngrx/store";
import { Branch, FetchResponse, ResponseAppState } from "src/types/general";

export const GET_BRANCHES = createAction(
    "[Branches] Get branches",
    props<{url:string}>()
);
export const GET_BRANCHES_LOADING = createAction(
    "[Branches] Get branches loading"
);
export const GET_BRANCHES_ERROR = createAction(
    "[Branches] Get branches error",
    props<{error:string}>()
);
export const GET_BRANCHES_SUCCESS = createAction(
    "[Branches/API] Get branches success",
    props<{res:ResponseAppState<FetchResponse<Branch>>}>()
);
export const GET_BRANCH = createAction(
    "[Branch/API] Get branch",
    props<{res:ResponseAppState<FetchResponse<Branch>>}>()
);

export const ADD_BRANCH = createAction(
    "[Branch] Add branch",
    props<{branch:Branch}>()
);
export const ADD_BRANCH_LOADING = createAction(
    "[Branch] Add branch loading"
);
export const ADD_BRANCH_ERROR = createAction(
    "[Branch] Add branch error",
    props<{error:string}>()
);
export const ADD_BRANCH_SUCCESS = createAction(
    "[Branch/API] Add branch success",
    props<{res:ResponseAppState<FetchResponse<Branch>>}>()
);

export const UPDATE_BRANCH = createAction(
    "[Branch] Update branch",
    props<{branch:Branch,id:string}>()
);
export const UPDATE_BRANCH_LOADING = createAction(
    "[Branch] Update branch loading"
);
export const UPDATE_BRANCH_ERROR = createAction(
    "[Branch] Update branch error",
    props<{error:string}>()
);
export const UPDATE_BRANCH_SUCCESS = createAction(
    "[Branch/API] Update branch success",
    props<{res:ResponseAppState<FetchResponse<Branch>>}>()
);