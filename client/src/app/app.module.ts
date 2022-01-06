import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { FormEmployeeComponent } from './components/form-employee/form-employee.component';
import { BranchesComponent } from './components/branches/branches.component';
import { BranchComponent } from './components/branch/branch.component';
import { FormBranchComponent } from './components/form-branch/form-branch.component';
import { CustomersComponent } from './components/customers/customers.component';
import { CustomerComponent } from './components/customer/customer.component';
import { FormCustomerComponent } from './components/form-customer/form-customer.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductComponent } from './components/product/product.component';
import { FormProductComponent } from './components/form-product/form-product.component';
import { SuppliersComponent } from './components/suppliers/suppliers.component';
import { SupplierComponent } from './components/supplier/supplier.component';
import { FormSupplierComponent } from './components/form-supplier/form-supplier.component';
import { SupplierProductsComponent } from './components/supplier-products/supplier-products.component';
import { FormSupplierProductsComponent } from './components/form-supplier-products/form-supplier-products.component';
import { InventorysComponent } from './components/inventorys/inventorys.component';
import { FormInventoryComponent } from './components/form-inventory/form-inventory.component';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { FormTransactionsComponent } from './components/form-transactions/form-transactions.component';
import { TransactionComponent } from './components/transaction/transaction.component';
import { ErrorHandlerComponent } from './components/error-handler/error-handler.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    EmployeeComponent,
    FormEmployeeComponent,
    BranchesComponent,
    BranchComponent,
    FormBranchComponent,
    CustomersComponent,
    CustomerComponent,
    FormCustomerComponent,
    ProductsComponent,
    ProductComponent,
    FormProductComponent,
    SuppliersComponent,
    SupplierComponent,
    FormSupplierComponent,
    SupplierProductsComponent,
    FormSupplierProductsComponent,
    InventorysComponent,
    FormInventoryComponent,
    TransactionsComponent,
    FormTransactionsComponent,
    TransactionComponent,
    ErrorHandlerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
