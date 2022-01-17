import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BranchesComponent } from './components/branches/branches.component';
import { CustomersComponent } from './components/customers/customers.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { FormBranchComponent } from './components/form-branch/form-branch.component';
import { FormCustomerComponent } from './components/form-customer/form-customer.component';
import { FormEmployeeComponent } from './components/form-employee/form-employee.component';
import { FormInventoryComponent } from './components/form-inventory/form-inventory.component';
import { FormProductComponent } from './components/form-product/form-product.component';
import { FormSupplierComponent } from './components/form-supplier/form-supplier.component';
import { FormTransactionsComponent } from './components/form-transactions/form-transactions.component';
import { InventorysComponent } from './components/inventorys/inventorys.component';
import { ProductsComponent } from './components/products/products.component';
import { SuppliersComponent } from './components/suppliers/suppliers.component';
import { TransactionsComponent } from './components/transactions/transactions.component';


@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    FormEmployeeComponent,
    BranchesComponent,
    FormBranchComponent,
    CustomersComponent,
    FormCustomerComponent,
    ProductsComponent,
    FormProductComponent,
    SuppliersComponent,
    FormSupplierComponent,
    InventorysComponent,
    FormInventoryComponent,
    TransactionsComponent,
    FormTransactionsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
