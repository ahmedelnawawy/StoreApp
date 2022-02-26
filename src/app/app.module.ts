import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AddProductComponent } from './product/product-list/add-product/add-product.component';
import { ProductListComponent } from './product/product-list/product-list.component';

import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { SliderModule } from 'primeng/slider';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from './product/service/product.service';
import { HttpClientModule } from '@angular/common/http';
import { SupplierService } from './Supplier/service/supplier.service';
import { LookUpsService } from './Shared/Service/lookUps.service';
import { SupplierListComponent } from './Supplier/supplier-list/supplier-list.component';
import { AddSupplierComponent } from './Supplier/supplier-list/add-supplier/add-supplier.component';

import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';

import { MessageService } from 'primeng/api';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductListComponent,
    AddProductComponent,
    NavBarComponent,
    SupplierListComponent,
    AddSupplierComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // BrowserAnimations Modules
    BrowserAnimationsModule,
    //  PrimeNG  Modules
    ButtonModule,
    TableModule,
    CalendarModule,
    SliderModule,
    //  Angular Form Modules
    FormsModule,
    ReactiveFormsModule,
    // import HttpClientModule after BrowserModule.
    HttpClientModule,
    // Notifications
    MessagesModule,
    MessageModule,
    ToastModule,
  ],
  providers: [ProductService,SupplierService,LookUpsService,MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
