import { Component, OnInit } from '@angular/core';
import { productModel } from '../product/productModel';
import { ProductService } from '../product/service/product.service';
import { LargestSupplierModel } from '../Shared/models/LargestSupplierModel';
import { SupplierService } from '../Supplier/service/supplier.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  ProductList: productModel[] = [];
  LargestSupplierModel : LargestSupplierModel = {};
  first = 0;
  rows = 10;

  constructor(private productService: ProductService,private supplierService: SupplierService) 
  { 
  }

  ngOnInit(): void {
      this.LoadProducts();
      this.LargestSupplierToStore();
  }

  LoadProducts() {
      // Get Products from ProductService
      this.productService.getProductNeedReOrders().subscribe(res => {
          if (res) {
              this.ProductList = res;
          }
      }, error => {
      });
  }
  LargestSupplierToStore() {
    // Get Products from ProductService
    this.supplierService.getLargestSupplierToStore().subscribe(res => {
        if (res) {
            this.LargestSupplierModel = res;
        }
    }, error => {
    });
}

  //****************PrimeNG DataTable Pagination method Start*********************** */
  next() {
      this.first = this.first + this.rows;
  }
  prev() {
      this.first = this.first - this.rows;
  }
  reset() {
      this.first = 0;
  }
  isLastPage(): boolean {
      return this.ProductList ? this.first === (this.ProductList.length - this.rows) : true;
  }
  isFirstPage(): boolean {
      return this.ProductList ? this.first === 0 : true;
  }
  //****************PrimeNG DataTable Pagination Method End*********************** */

}
