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
import { ValidationMessageComponent } from './components/validation-message/validation-message.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { employeeReducer } from './store/reducers/employeeReducer';
import { EmployeeEffects } from './store/effects/employeeEffects';
import { EmpsComponent } from './components/emps/emps.component';
import { FormEmpsComponent } from './components/form-emps/form-emps.component';


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
    ValidationMessageComponent,
    EmpsComponent,
    FormEmpsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({
      employees:employeeReducer,

    }, {}),
    EffectsModule.forRoot([EmployeeEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
