import { Requeststatus } from "../enums/requeststatus";

export interface Appstate<T> {
    dataState: Requeststatus;
    appData?:T;
    error?:string;
}
