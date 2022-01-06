import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BranchComponent } from './components/branch/branch.component';
import { BranchesComponent } from './components/branches/branches.component';
import { CustomerComponent } from './components/customer/customer.component';
import { CustomersComponent } from './components/customers/customers.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { InventorysComponent } from './components/inventorys/inventorys.component';
import { ProductComponent } from './components/product/product.component';
import { ProductsComponent } from './components/products/products.component';
import { SupplierProductsComponent } from './components/supplier-products/supplier-products.component';
import { SupplierComponent } from './components/supplier/supplier.component';
import { SuppliersComponent } from './components/suppliers/suppliers.component';
import { TransactionComponent } from './components/transaction/transaction.component';
import { TransactionsComponent } from './components/transactions/transactions.component';

const routes: Routes = [
  {
    path:"employees",
    component:EmployeesComponent
  },
  {
    path:"employee/:id",
    component:EmployeeComponent
  },
  {
    path:"branches",
    component:BranchesComponent
  },
  {
    path:"branch/:id",
    component:BranchComponent
  },
  {
    path:"customers",
    component:CustomersComponent
  },
  {
    path:"customer/:id",
    component:CustomerComponent
  },
  {
    path:"products",
    component:ProductsComponent
  },
  {
    path:"product/:id",
    component:ProductComponent
  },
  {
    path:"suppliers",
    component:SuppliersComponent
  },
  {
    path:"supplier/:id",
    component:SupplierComponent
  },
  {
    path:"supplier/product/:id",
    component:SupplierProductsComponent
  },
  {
    path:"inventory",
    component:InventorysComponent
  },
  {
    path:"transactions",
    component:TransactionsComponent
  },
  {
    path:"transaction/:id",
    component:TransactionComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
