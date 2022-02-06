import { Requeststatus } from "src/app/enums/requeststatus";

export let responseContent = {
    timestamp:new Date(),
    HttpStatus:"",
    status:"",
    statusCode:0,
    message:"",
    developerMessage:"",
    data:[],
    boolData:false
}

export interface FetchResponse<T> {
    timestamp?: Date,
    HttpStatus?: string,
    status?: string,
    statusCode?: number,
    message?: string,
    developerMessage?: string,
    data?: T[],
    boolData?: boolean
}

export interface Employee {
    id: string,
    firstName: string,
    lastName: string,
    role: string,
    branch: Branch
}

export interface Branch {
    branch_id: string,
    location: string, 
    branchStatus: string
}

export interface Customer {
    customer_id:string,
    cname:string
}

export interface Product {
    product_id:string,
    pname:string
}

export interface Supplier {
    supplier_id:string,
    sname:string,
    products:Product[]
}

export interface Inventory {
    inventory_id:string,
    product:Product,
    quantity:number
}

export interface Transaction {
    transaction_id:string,
    employee:Employee,
    supplier: Supplier | null,
    product:Product,
    customer:Customer | null,
    transactionType:string,
    transaction_quantity:number
}

export interface ProductCheckBox {
    product_id:string,
    pname:string,
    isChecked:boolean
}

export interface BranchRadio {
    branch_id:string,
    location:string,
    branchStatus:string,
    isChecked:boolean
}

export interface submitValueType {
    name:string,
    value:string | null | number,
    boolean:boolean
}

export interface ResponseAppState<T> {
    dataState: Requeststatus;
    appData?:T;
    error?:string;
    filteredEmployeeData?:Employee[];
    filteredBranchData?:Branch[];
    filteredCustomerData?:Customer[];
    filteredProductData?:Product[];
    filteredSupplierData?:Supplier[];
    filteredInventoryData?:Inventory[];
    filteredTransactionData?:Transaction[];
    transaction?:Transaction
}

