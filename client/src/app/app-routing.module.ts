import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BranchesComponent } from './components/branches/branches.component';
import { CustomersComponent } from './components/customers/customers.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { InventorysComponent } from './components/inventorys/inventorys.component';
import { ProductsComponent } from './components/products/products.component';
import { SupplierProductsComponent } from './components/supplier-products/supplier-products.component';
import { SuppliersComponent } from './components/suppliers/suppliers.component';
import { TransactionComponent } from './components/transaction/transaction.component';
import { TransactionsComponent } from './components/transactions/transactions.component';

const routes: Routes = [
  {
    path:"employees",
    component:EmployeesComponent
  },
  {
    path:"employees/:id",
    component:EmployeesComponent
  },
  {
    path:"branches",
    component:BranchesComponent
  },
  {
    path:"branches/:id",
    component:BranchesComponent
  },
  {
    path:"customers",
    component:CustomersComponent
  },
  {
    path:"customers/:id",
    component:CustomersComponent
  },
  {
    path:"products",
    component:ProductsComponent
  },
  {
    path:"products/:id",
    component:ProductsComponent
  },
  {
    path:"suppliers",
    component:SuppliersComponent
  },
  {
    path:"suppliers/:id",
    component:SuppliersComponent
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
