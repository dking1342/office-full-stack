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
import { ButtonComponent } from './components/ui/button/button.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ViewHeaderComponent } from './components/ui/view-header/view-header.component';
import { ViewMessageBoxComponent } from './components/ui/view-message-box/view-message-box.component';
import { MatTableModule } from '@angular/material/table';
import {CdkTableModule} from '@angular/cdk/table';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import { FilterBranchesPipe } from './pipes/filter-branches.pipe';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSortModule} from '@angular/material/sort';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import { LandingPageComponent } from './components/landing-page/landing-page.component';

@NgModule({
  declarations: [
    AppComponent,
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
    ButtonComponent,
    ViewHeaderComponent,
    ViewMessageBoxComponent,
    FilterBranchesPipe,
    LandingPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatTableModule,
    CdkTableModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCheckboxModule,
    MatSortModule,
    MatToolbarModule,
    MatSidenavModule,
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
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
