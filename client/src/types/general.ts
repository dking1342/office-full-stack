export interface EmployeesResponse {
    timestamp?: Date,
    HttpStatus?: string,
    status?: string,
    statusCode?: number,
    message?: string,
    developerMessage?: string,
    employeeData?: Employee[],
    employeeBoolData?: boolean,
    branchData?: Branch[],
    branchBoolData?: boolean,
}

export interface BranchResponse {
    timestamp?: Date,
    HttpStatus?: string,
    status?: string,
    statusCode?: number,
    message?: string,
    developerMessage?: string,
    branchData?: Branch[],
    branchBoolData?: boolean
}

export interface CustomerResponse {
    timestamp?: Date,
    HttpStatus?: string,
    status?: string,
    statusCode?: number,
    message?: string,
    developerMessage?: string,
    data?: Customer[],
    boolData?: boolean
}

export interface ProductResponse {
    timestamp?: Date,
    HttpStatus?: string,
    status?: string,
    statusCode?: number,
    message?: string,
    developerMessage?: string,
    data?: Product[],
    boolData?: boolean
}

export interface SupplierResponse {
    timestamp?: Date,
    HttpStatus?: string,
    status?: string,
    statusCode?: number,
    message?: string,
    developerMessage?: string,
    data?: Supplier[],
    boolData?: boolean
}

export interface SupplierProductResponse {
    timestamp?: Date,
    HttpStatus?: string,
    status?: string,
    statusCode?: number,
    message?: string,
    developerMessage?: string,
    supplierData?: Product[],
    boolData?: boolean
}

export interface InventoryResponse {
    timestamp?: Date,
    HttpStatus?: string,
    status?: string,
    statusCode?: number,
    message?: string,
    developerMessage?: string,
    data?: Inventory[],
    boolData?: boolean  
}

export interface TransactionResponse {
    timestamp?: Date,
    HttpStatus?: string,
    status?: string,
    statusCode?: number,
    message?: string,
    developerMessage?: string,
    data?: Transaction[],
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
    employee_id:string,
    customer_id:string | null,
    supplier_id:string | null,
    product_id:string,
    transactionType:string,
    transaction_quantity:number
}

export interface TransactionArray {
    transaction_id:string,
    employee:Employee[],
    customer:Customer[] | null,
    supplier:Supplier[] | null,
    product:Product[],
    transactionType:string,
    transaction_quantity:number
}