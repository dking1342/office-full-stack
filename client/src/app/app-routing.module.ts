import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BranchComponent } from './components/branch/branch.component';
import { CustomerComponent } from './components/customer/customer.component';
import { EmpsComponent } from './components/emps/emps.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { ProductComponent } from './components/product/product.component';
import { SupplierComponent } from './components/supplier/supplier.component';
import { TransactionComponent } from './components/transaction/transaction.component';


const routes: Routes = [
  {
    path:"employees",
    component:EmpsComponent
  },
  {
    path:"employees/:id",
    component:EmpsComponent
  },
  {
    path:"branches",
    component:BranchComponent
  },
  {
    path:"branches/:id",
    component:BranchComponent
  },
  {
    path:"customers",
    component:CustomerComponent
  },
  {
    path:"customers/:id",
    component:CustomerComponent
  },
  {
    path:"products",
    component:ProductComponent
  },
  {
    path:"products/:id",
    component:ProductComponent
  },
  {
    path:"suppliers",
    component:SupplierComponent
  },
  {
    path:"suppliers/:id",
    component:SupplierComponent
  },
  {
    path:"inventory",
    component:InventoryComponent
  },
  {
    path:"transactions",
    component:TransactionComponent
  },
  {
    path:"transactions/:id",
    component:TransactionComponent
  },
  {
    path:"",
    component:LandingPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
