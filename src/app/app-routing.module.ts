import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddProductComponent } from './product/product-list/add-product/add-product.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { AddSupplierComponent } from './Supplier/supplier-list/add-supplier/add-supplier.component';
import { SupplierListComponent } from './Supplier/supplier-list/supplier-list.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'product', component: ProductListComponent },
  { path: 'add-product', component: AddProductComponent},
  { path: 'update-product/:id', component: AddProductComponent },
  { path: 'supplier', component: SupplierListComponent },
  { path: 'add-supplier', component: AddSupplierComponent},
  { path: 'update-supplier/:id', component: AddSupplierComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
