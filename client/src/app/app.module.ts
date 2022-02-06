import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BranchComponent } from './components/branch/branch.component';
import { CustomerComponent } from './components/customer/customer.component';
import { EmpsComponent } from './components/emps/emps.component';
import { FormBranchesComponent } from './components/form-branches/form-branches.component';
import { FormCustomersComponent } from './components/form-customers/form-customers.component';
import { FormEmpsComponent } from './components/form-emps/form-emps.component';
import { ValidationMessageComponent } from './components/validation-message/validation-message.component';
import { BranchEffects } from './store/effects/branchEffects';
import { CustomerEffects } from './store/effects/customerEffects';
import { EmployeeEffects } from './store/effects/employeeEffects';
import { ProductEffects } from './store/effects/productEffects';
import { branchReducer } from './store/reducers/branchReducers';
import { customerReducer } from './store/reducers/customerReducers';
import { employeeReducer } from './store/reducers/employeeReducer';
import { productReducer } from './store/reducers/productReducers';
import { ProductComponent } from './components/product/product.component';
import { FormProductsComponent } from './components/form-products/form-products.component';
import { SupplierComponent } from './components/supplier/supplier.component';
import { FormSuppliersComponent } from './components/form-suppliers/form-suppliers.component';
import { supplierReducer } from './store/reducers/supplierReducers';
import { SupplierEffects } from './store/effects/supplierEffects';
import { InventoryComponent } from './components/inventory/inventory.component';
import { inventoryReducer } from './store/reducers/inventoryReducers';
import { InventoryEffects } from './store/effects/inventoryEffects';
import { TransactionComponent } from './components/transaction/transaction.component';
import { FormTransactionComponent } from './components/form-transaction/form-transaction.component';
import { transactionReducer } from './store/reducers/transactionReducers';
import { TransactionEffects } from './store/effects/transactionEffects';


@NgModule({
  declarations: [
    AppComponent,
    // EmployeesComponent,
    // FormEmployeeComponent,
    // BranchesComponent,
    // FormBranchComponent,
    // CustomersComponent,
    // FormCustomerComponent,
    // ProductsComponent,
    // FormProductComponent,
    // SuppliersComponent,
    // FormSupplierComponent,
    // InventorysComponent,
    // FormInventoryComponent,
    // TransactionsComponent,
    // FormTransactionsComponent,
    ValidationMessageComponent,
    EmpsComponent,
    FormEmpsComponent,
    BranchComponent,
    FormBranchesComponent,
    CustomerComponent,
    FormCustomersComponent,
    ProductComponent,
    FormProductsComponent,
    SupplierComponent,
    FormSuppliersComponent,
    InventoryComponent,
    TransactionComponent,
    FormTransactionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({
      employees:employeeReducer,
      branches:branchReducer,
      customers:customerReducer,
      products:productReducer,
      suppliers:supplierReducer,
      inventory:inventoryReducer,
      transactions:transactionReducer
    }, {}),
    EffectsModule.forRoot([
      EmployeeEffects,
      BranchEffects,
      CustomerEffects,
      ProductEffects,
      SupplierEffects,
      InventoryEffects,
      TransactionEffects
    ]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
